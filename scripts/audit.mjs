/**
 * Pre-flight audit of the built site.
 *
 * Catches the things that are easy to miss by eye and expensive to ship:
 * horizontal overflow at every breakpoint, console/JS errors, broken internal
 * links and images, missing alt text, heading-order jumps, unlabelled
 * controls, and duplicate element ids.
 *
 * Run: node scripts/audit.mjs   (build first)
 */
import { createReadStream, existsSync, readdirSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const BASE = (process.env.BASE_PATH ?? '/-Portfiolo-webpage').replace(/\/$/, '');

if (!existsSync(dist)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
};

const server = createServer((req, res) => {
  let pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://l').pathname);
  if (BASE && pathname.startsWith(BASE)) pathname = pathname.slice(BASE.length) || '/';
  let file = join(dist, pathname);
  try {
    if (statSync(file).isDirectory()) file = join(file, 'index.html');
  } catch {
    if (existsSync(`${file}.html`)) file = `${file}.html`;
    else if (existsSync(join(file, 'index.html'))) file = join(file, 'index.html');
  }
  if (!existsSync(file)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
});

await new Promise((done) => server.listen(0, '127.0.0.1', done));
const origin = `http://127.0.0.1:${server.address().port}`;

/** Every HTML route in dist, as a site path. */
const routes = [];
(function walk(dir, prefix = '') {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) walk(join(dir, entry.name), `${prefix}/${entry.name}`);
    else if (entry.name === 'index.html') routes.push(`${prefix}/`);
    else if (entry.name.endsWith('.html')) routes.push(`${prefix}/${entry.name}`);
  }
})(dist);
routes.sort();

const VIEWPORTS = [
  { name: 'mobile-sm', width: 320, height: 640 },
  { name: 'mobile', width: 360, height: 780 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-lg', width: 414, height: 896 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'desktop', width: 1680, height: 1050 },
];

const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

const problems = [];
const note = (route, viewport, kind, detail) =>
  problems.push({ route, viewport, kind, detail });

for (const route of routes) {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    const consoleErrors = [];
    const failedRequests = [];

    page.on('console', (m) => {
      if (m.type() === 'error') consoleErrors.push(m.text());
    });
    page.on('pageerror', (e) => consoleErrors.push(`JS: ${e.message}`));
    page.on('requestfailed', (r) => failedRequests.push(r.url()));
    page.on('response', (r) => {
      if (r.status() >= 400 && !r.url().endsWith('favicon.ico')) {
        failedRequests.push(`${r.status()} ${r.url()}`);
      }
    });

    await page.goto(origin + BASE + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(250);

    const report = await page.evaluate(() => {
      const out = { overflow: null, wide: [], issues: [] };
      const doc = document.documentElement;

      const vw = doc.clientWidth;

      // Always measure the elements. A page with `overflow-x: hidden` keeps
      // scrollWidth equal to clientWidth while silently CLIPPING content,
      // which is worse than a scrollbar — so never trust the document alone.
      for (const el of document.querySelectorAll('body *')) {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        const style = getComputedStyle(el);
        if (style.position === 'fixed' || style.visibility === 'hidden') continue;
        // Decorative washes are allowed to bleed off-canvas deliberately.
        if (el.dataset.allowBleed !== undefined) continue;
        // Clipped-away content (honeypot, screen-reader-only text) keeps its
        // natural box but is never painted, so it cannot overflow anything.
        if (el.closest('.form-trap, .visually-hidden')) continue;
        if (rect.right > vw + 1 || rect.left < -1) {
          out.wide.push(
            `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ').filter(Boolean).slice(0, 2).join('.')} → ${Math.round(rect.left)}…${Math.round(rect.right)}px`,
          );
        }
      }
      out.wide = [...new Set(out.wide)].slice(0, 8);

      if (out.wide.length || doc.scrollWidth > vw + 1) {
        out.overflow = { scroll: doc.scrollWidth, client: vw };
      }

      // Images without alt text (alt="" is a valid decorative declaration).
      for (const img of document.querySelectorAll('img')) {
        if (img.getAttribute('alt') === null) out.issues.push(`img missing alt: ${img.src}`);
        // A lazy image below the fold is not a failure — only flag images the
        // browser actually tried and failed to load.
        const lazy = img.getAttribute('loading') === 'lazy';
        if (!lazy && (!img.complete || img.naturalWidth === 0)) {
          out.issues.push(`img failed: ${img.src}`);
        }
        if (!img.getAttribute('width') || !img.getAttribute('height')) {
          out.issues.push(`img without intrinsic size (CLS risk): ${img.src}`);
        }
      }

      // Heading order: never skip a level.
      const levels = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) =>
        Number(h.tagName[1]),
      );
      const h1s = levels.filter((l) => l === 1).length;
      if (h1s !== 1) out.issues.push(`expected exactly one h1, found ${h1s}`);
      for (let i = 1; i < levels.length; i += 1) {
        if (levels[i] - levels[i - 1] > 1) {
          out.issues.push(`heading jump h${levels[i - 1]} → h${levels[i]}`);
        }
      }

      // Controls must have an accessible name.
      for (const el of document.querySelectorAll('button, a[href], input, textarea, select')) {
        const style = getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') continue;
        // Decorative duplicates are removed from the a11y tree on purpose.
        if (el.closest('[aria-hidden="true"]')) continue;
        const name =
          el.getAttribute('aria-label') ||
          el.getAttribute('title') ||
          (el.getAttribute('aria-labelledby') &&
            document.getElementById(el.getAttribute('aria-labelledby'))?.textContent) ||
          (el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`)?.textContent) ||
          el.closest('label')?.textContent ||
          el.textContent;
        if (!name || !name.trim()) {
          out.issues.push(`unnamed control: <${el.tagName.toLowerCase()}>`);
        }
      }

      // Duplicate ids break every aria-* reference that points at them.
      const seen = new Set();
      for (const el of document.querySelectorAll('[id]')) {
        if (seen.has(el.id)) out.issues.push(`duplicate id: #${el.id}`);
        seen.add(el.id);
      }

      // Internal links must resolve.
      out.links = [...document.querySelectorAll('a[href]')]
        .map((a) => a.getAttribute('href'))
        .filter((h) => h && !/^(https?:|mailto:|tel:|#)/.test(h));

      return out;
    });

    if (report.overflow) {
      note(
        route,
        vp.name,
        'overflow',
        `${report.overflow.scroll}px > ${report.overflow.client}px${report.wide.length ? ` — ${report.wide.join(', ')}` : ''}`,
      );
    }
    for (const issue of new Set(report.issues)) note(route, vp.name, 'a11y', issue);
    for (const error of new Set(consoleErrors)) note(route, vp.name, 'console', error);
    for (const failure of new Set(failedRequests)) note(route, vp.name, 'network', failure);

    // Link checking only needs to happen once per route.
    if (vp.name === 'mobile') {
      for (const link of new Set(report.links)) {
        const target = new URL(link, origin + BASE + route).href;
        const res = await page.request.get(target).catch(() => null);
        if (!res || res.status() >= 400) {
          note(route, '—', 'link', `${link} → ${res ? res.status() : 'unreachable'}`);
        }
      }
    }

    await page.close();
  }
  process.stdout.write('.');
}

await browser.close();
server.close();

console.log('\n');
console.log(`Audited ${routes.length} routes × ${VIEWPORTS.length} viewports\n`);

if (!problems.length) {
  console.log('✓ No overflow, console errors, broken links or accessibility issues found.');
  process.exit(0);
}

const byKind = problems.reduce((acc, p) => {
  (acc[p.kind] ??= []).push(p);
  return acc;
}, {});

for (const [kind, list] of Object.entries(byKind)) {
  console.log(`\n${kind.toUpperCase()} (${list.length})`);
  const seen = new Set();
  for (const p of list) {
    const key = `${p.route}|${p.detail}`;
    if (seen.has(key)) continue;
    seen.add(key);
    console.log(`  ${p.route} [${p.viewport}] ${p.detail}`);
  }
}
process.exitCode = 1;
