/**
 * Screenshot any route at any viewport, for design review.
 *
 *   TARGETS='[{"path":"/","w":1440,"h":1000,"out":"shots/home.png"}]' \
 *     node scripts/screenshots.mjs
 *
 * Options per target: path, w, h, out, dark (boolean), full (boolean),
 * scroll (a CSS selector to scroll into view first), wait (ms).
 */
import { createReadStream, existsSync, mkdirSync, statSync } from 'node:fs';
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
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
});

await new Promise((done) => server.listen(0, '127.0.0.1', done));
const origin = `http://127.0.0.1:${server.address().port}${BASE}`;

const targets = JSON.parse(
  process.env.TARGETS ??
    '[{"path":"/","w":1440,"h":1000,"out":"shots/home.png"},{"path":"/","w":390,"h":844,"out":"shots/home-mobile.png"}]',
);

const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

for (const target of targets) {
  const page = await browser.newPage({
    viewport: { width: target.w ?? 1440, height: target.h ?? 900 },
    colorScheme: target.dark ? 'dark' : 'light',
  });
  await page.goto(origin + target.path, { waitUntil: 'networkidle' });
  if (target.scroll) {
    await page.evaluate((sel) => document.querySelector(sel)?.scrollIntoView(), target.scroll);
  }
  await page.waitForTimeout(target.wait ?? 1200);
  mkdirSync(dirname(resolve(root, target.out)), { recursive: true });
  await page.screenshot({ path: resolve(root, target.out), fullPage: Boolean(target.full) });
  console.log(`✓ ${target.out}`);
  await page.close();
}

await browser.close();
server.close();
