/**
 * Runs figma-plugin/code.js against the Plugin API mock and asserts the file
 * it builds. Catches the failures that would otherwise only show up after the
 * plugin is installed in Figma.
 *
 * Run: npm run figma:test
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { createFigmaMock } from './mock-figma.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const code = readFileSync(resolve(root, 'figma-plugin/code.js'), 'utf8');

const { figma, report } = createFigmaMock();

const logs = [];
const errors = [];
const sandbox = {
  figma,
  console: {
    log: (...a) => logs.push(a.join(' ')),
    warn: (...a) => logs.push(a.join(' ')),
    error: (...a) => errors.push(a.map((x) => (x && x.stack) || String(x)).join(' ')),
  },
  Promise, Object, Array, String, Number, Math, JSON, Date, Symbol, Error, Set, Map,
  parseInt, parseFloat, isNaN, RegExp, Boolean,
};
sandbox.globalThis = sandbox;

vm.createContext(sandbox);
try {
  vm.runInContext(code, sandbox, { filename: 'figma-plugin/code.js', timeout: 60000 });
} catch (err) {
  console.error('✗ The plugin threw while loading:\n', err);
  process.exit(1);
}

// The plugin ends in a promise chain; give it microtasks to finish.
await new Promise((r) => setTimeout(r, 200));

const r = report();

let failed = 0;
const check = (name, ok, detail) => {
  if (ok) console.log(`  ✓ ${name}`);
  else { failed += 1; console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ''}`); }
};

console.log('\nExecution');
check('plugin ran to completion', r.closed !== null, 'closePlugin was never called');
check('no uncaught errors', errors.length === 0, errors[0]);
check('did not report a build failure', !(r.closed || '').startsWith('Build failed'), r.closed);

console.log('\nVariables');
const byName = (n) => r.collections.find((c) => c.name === n);
check('Primitives collection exists', !!byName('Primitives'));
check('Color collection has Light and Dark modes',
  !!byName('Color') && byName('Color').modes.join(',') === 'Light,Dark',
  byName('Color') && byName('Color').modes.join(','));
check('Spacing collection exists', !!byName('Spacing'));
check('Radius collection exists', !!byName('Radius'));

const semantic = r.variables.filter((v) => v.name.startsWith('color/'));
check('semantic colours created', semantic.length >= 19, `${semantic.length}`);
check('every semantic colour resolves in BOTH modes',
  semantic.every((v) => Object.keys(v.valuesByMode).length === 2),
  semantic.filter((v) => Object.keys(v.valuesByMode).length !== 2).map((v) => v.name).join(', '));
check('every semantic colour aliases a primitive (no raw hex duplication)',
  semantic.every((v) => Object.values(v.valuesByMode).every((x) => x && x.type === 'VARIABLE_ALIAS')));
check('no variable left on ALL_SCOPES',
  r.variables.every((v) => !v.scopes.includes('ALL_SCOPES')),
  r.variables.filter((v) => v.scopes.includes('ALL_SCOPES')).map((v) => v.name).slice(0, 5).join(', '));
check('every semantic colour has WEB code syntax',
  semantic.every((v) => typeof v.codeSyntax.WEB === 'string' && v.codeSyntax.WEB.startsWith('var(--')));
check('primitives are hidden from pickers',
  r.variables.filter((v) => !v.name.startsWith('color/') && !v.name.startsWith('spacing/') && !v.name.startsWith('radius/'))
    .every((v) => v.scopes.length === 0));

console.log('\nText styles');
check('full type ramp created', r.textStyles === 12, `${r.textStyles}`);

console.log('\nComponents');
const sets = r.allNodes.filter((n) => n.type === 'COMPONENT_SET');
const setNames = sets.map((s) => s.name).sort();
check('five variant sets built', sets.length === 5, setNames.join(', '));
check('Button has 12 variants (4 emphases × 3 sizes)',
  (sets.find((s) => s.name === 'Button') || { children: [] }).children.length === 12);
check('Field has 4 states',
  (sets.find((s) => s.name === 'Field') || { children: [] }).children.length === 4);
check('variants were laid out, not left stacked at 0,0',
  sets.every((s) => s.children.filter((c) => c.x === 0 && c.y === 0).length <= 1),
  sets.filter((s) => s.children.filter((c) => c.x === 0 && c.y === 0).length > 1).map((s) => s.name).join(', '));
check('every component set carries a description',
  sets.every((s) => typeof s.description === 'string' && s.description.length > 20),
  sets.filter((s) => !s.description).map((s) => s.name).join(', '));

console.log('\nScreens');
const screensPage = r.pages.find((p) => p.name === '03 — Screens');
check('screens page exists', !!screensPage);
check('six screens built', screensPage && screensPage.children === 6, screensPage && String(screensPage.children));
const darkScreen = r.allNodes.find((n) => n.name === 'Home — Desktop (Dark)');
check('dark screen exists', !!darkScreen);
check('dark screen pins the Color collection to Dark',
  !!(darkScreen && darkScreen._explicitModes && Object.keys(darkScreen._explicitModes).length === 1));

console.log('\nBindings');
const withBoundFill = r.allNodes.filter((n) =>
  Array.isArray(n.fills) && n.fills.some((f) => f && f.boundVariables && f.boundVariables.color));
check('fills are bound to variables, not hardcoded', withBoundFill.length > 150, `${withBoundFill.length} bound`);
// A literal fill is legitimate inside the project artwork: those panels sit on
// a brand-colour plate, so a white card there must stay white in dark mode.
// Anywhere else, a literal fill is a missed token.
const insideArtwork = (n) => {
  for (let a = n; a; a = a.parent) if (a.name === 'Artwork') return true;
  return false;
};
const hardcoded = r.allNodes.filter((n) =>
  Array.isArray(n.fills) && n.fills.length
  && n.fills.every((f) => f && f.type === 'SOLID' && !(f.boundVariables && f.boundVariables.color))
  && !insideArtwork(n));
check('no hardcoded fill outside the project artwork', hardcoded.length === 0,
  `${hardcoded.length}: ${[...new Set(hardcoded.map((n) => n.name))].slice(0, 8).join(', ')}`);

console.log('\nText integrity');
const texts = r.allNodes.filter((n) => n.type === 'TEXT');
check('text nodes created', texts.length > 150, `${texts.length}`);
check('no text renders the literal "undefined"',
  texts.every((t) => !t.characters.includes('undefined')),
  texts.filter((t) => t.characters.includes('undefined')).map((t) => t.name).slice(0, 4).join(', '));
check('no empty text nodes', texts.every((t) => t.characters.length > 0),
  texts.filter((t) => !t.characters.length).map((t) => t.name).slice(0, 4).join(', '));

console.log('\nMock-reported issues');
if (r.issues.length) {
  for (const i of [...new Set(r.issues)].slice(0, 15)) console.log(`  · ${i}`);
} else {
  console.log('  none');
}

if (logs.length) {
  console.log('\nPlugin output');
  console.log(logs.join('\n').split('\n').map((l) => `  ${l}`).join('\n'));
}

console.log(`\n${failed === 0 ? '✓ all checks passed' : `✗ ${failed} check(s) failed`}`);
process.exitCode = failed === 0 ? 0 : 1;
