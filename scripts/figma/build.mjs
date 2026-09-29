/**
 * Builds the Figma import package.
 *
 *   figma-export/
 *     artboards/*.svg     drag into Figma — editable text + vector layers
 *     tokens.json         W3C design tokens (Tokens Studio / Variables import)
 *     README.md           import steps
 *
 * The layout runs inside headless Chromium so text is measured with the real
 * Fraunces and Inter files. Guessed character widths are how you end up with
 * overlapping labels and clipped headings in an exported artboard.
 *
 * Run: npm run figma
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const here = resolve(root, 'scripts/figma');
const outDir = resolve(root, 'figma-export');
const artDir = resolve(outDir, 'artboards');
const tmp = resolve(outDir, '.content.mjs');

rmSync(artDir, { recursive: true, force: true });
mkdirSync(artDir, { recursive: true });

// ---- 1. bundle the site's real content to plain JS -------------------------
execFileSync(
  resolve(root, 'node_modules/.bin/esbuild'),
  [
    resolve(here, '_content-entry.ts'),
    '--bundle', '--format=esm', '--platform=node',
    '--define:import.meta.env.PUBLIC_CONTACT_ENDPOINT=""',
    '--define:import.meta.env.PUBLIC_CONTACT_ACCESS_KEY=""',
    '--define:import.meta.env.BASE_URL="/"',
    `--outfile=${tmp}`,
  ],
  { stdio: ['ignore', 'ignore', 'inherit'] },
);

const content = await import(pathToFileURL(tmp).href);
const data = {
  profile: JSON.parse(JSON.stringify(content.profile)),
  navigation: JSON.parse(JSON.stringify(content.navigation)),
  allProjects: content.allProjects,
  featuredProjects: content.featuredProjects,
  industriesCovered: content.industriesCovered,
  industryFacets: content.industryFacets(),
  skillGroups: content.skillGroups,
  processStages: content.processStages,
  experience: content.experience,
  coreSkills: content.coreSkills,
};
rmSync(tmp, { force: true });

// ---- 2. run the layout in a browser that has the real fonts ---------------
// Inlined as data URIs: a page built with setContent has an opaque origin and
// cannot fetch file:// fonts, which fails as an opaque "NetworkError".
const b64 = (p) => readFileSync(resolve(root, p)).toString('base64');
const fontCss = `
@font-face{font-family:'Fraunces';src:url(data:font/woff2;base64,${b64('public/fonts/fraunces-latin-wght-normal.woff2')}) format('woff2-variations');font-weight:100 900;}
@font-face{font-family:'Inter';src:url(data:font/woff2;base64,${b64('public/fonts/inter-latin-wght-normal.woff2')}) format('woff2-variations');font-weight:100 900;}`;

const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
const page = await browser.newPage();
await page.setContent(`<!doctype html><meta charset="utf-8"><style>${fontCss}</style><body>Aa</body>`);
await page.evaluate(() => document.fonts.ready);
// Force both faces to actually load before anything is measured.
await page.evaluate(() =>
  Promise.all([
    document.fonts.load('600 72px Fraunces'),
    document.fonts.load('400 17px Inter'),
    document.fonts.load('600 14px Inter'),
  ]),
);

await page.addScriptTag({ content: readFileSync(resolve(here, 'layout.js'), 'utf8') });
await page.addScriptTag({ content: readFileSync(resolve(here, 'screens.js'), 'utf8') });

const svgs = await page.evaluate((payload) => {
  const kit = buildArtboards(payload);
  return { ...kit.boards, ...buildScreens(payload, kit) };
}, data);

// ---- 3. verify nothing overflows its artboard -----------------------------
const problems = [];
for (const [name, svg] of Object.entries(svgs)) {
  const box = await page.evaluate((markup) => {
    const host = document.createElement('div');
    host.style.cssText = 'position:absolute;left:-99999px;top:0';
    host.innerHTML = markup;
    document.body.append(host);
    const svgEl = host.querySelector('svg');
    const W = Number(svgEl.getAttribute('width'));
    const H = Number(svgEl.getAttribute('height'));
    const over = [];
    const label = (el) => {
      const own = el.getAttribute('id') || '';
      const group = el.parentElement && el.parentElement.getAttribute('id');
      const bb = el.getBBox();
      return `${group ? group + ' / ' : ''}${own} "${el.textContent.slice(0, 20)}" @y${Math.round(bb.y)}`;
    };

    // Painting order decides what is visible, so record where each node sits.
    const order = new Map();
    svgEl.querySelectorAll('*').forEach((el, i) => order.set(el, i));

    // Opaque shapes that could bury text drawn before them.
    const covers = [...svgEl.querySelectorAll('rect, circle')].filter((el) => {
      const fill = el.getAttribute('fill');
      return fill && fill !== 'none' && el.getAttribute('id') !== 'Background';
    });

    const texts = [...svgEl.querySelectorAll('text')];

    for (const el of texts) {
      const bb = el.getBBox();
      if (bb.width === 0) continue;

      // 1. Outside the artboard.
      if (bb.x + bb.width > W - 4 || bb.y + bb.height > H - 4 || bb.x < -4) {
        over.push(`OUTSIDE ${label(el)} → ${Math.round(bb.x)}…${Math.round(bb.x + bb.width)} / y${Math.round(bb.y + bb.height)}`);
        continue;
      }

      // 2. Buried under a shape painted later. This is what hides a headline
      //    behind a panel — invisible to a bounds-only check.
      const area = bb.width * bb.height;
      let covered = 0;
      for (const shape of covers) {
        if (order.get(shape) < order.get(el)) continue;   // painted underneath
        const sb = shape.getBBox();
        const ox = Math.max(0, Math.min(bb.x + bb.width, sb.x + sb.width) - Math.max(bb.x, sb.x));
        const oy = Math.max(0, Math.min(bb.y + bb.height, sb.y + sb.height) - Math.max(bb.y, sb.y));
        covered = Math.max(covered, ox * oy);
      }
      if (covered / area > 0.25) {
        over.push(`BURIED ${label(el)} → ${Math.round((covered / area) * 100)}% covered`);
      }
    }
    host.remove();
    return { W, H, over: [...new Set(over)].slice(0, 8) };
  }, svg);
  if (box.over.length) problems.push({ name, ...box });
  writeFileSync(resolve(artDir, name), svg, 'utf8');
  console.log(`✓ ${name.padEnd(26)} ${box.W}×${box.H}  ${(Buffer.byteLength(svg) / 1024).toFixed(0)} KB`);
}

await browser.close();

// ---- 4. design tokens ------------------------------------------------------
const tokens = JSON.parse(readFileSync(resolve(here, 'tokens.source.json'), 'utf8'));
writeFileSync(resolve(outDir, 'tokens.json'), `${JSON.stringify(tokens, null, 2)}\n`, 'utf8');
console.log('✓ tokens.json');

if (problems.length) {
  console.log('\n⚠ text problems:');
  for (const p of problems) console.log(`  ${p.name}: ${p.over.join(' | ')}`);
  process.exitCode = 1;
} else {
  console.log('\n✓ No text outside an artboard or buried under a shape.');
}
