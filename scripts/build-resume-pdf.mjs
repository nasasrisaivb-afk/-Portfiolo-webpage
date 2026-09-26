/**
 * Renders the resume PDF from the site's own /resume/print page, so the PDF
 * and the web resume can never drift — both read src/data/resume.ts.
 *
 * Run: npm run resume:pdf   (builds the site first if dist/ is missing)
 */
import { createServer } from 'node:http';
import { createReadStream, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const outDir = resolve(root, 'public/resume');
mkdirSync(outDir, { recursive: true });

if (!existsSync(dist)) {
  console.log('dist/ not found — building the site first…');
  execSync('npx astro build', { cwd: root, stdio: 'inherit' });
}

const BASE = (process.env.BASE_PATH ?? '/-Portfiolo-webpage').replace(/\/$/, '');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

/** Minimal static server over dist/, honouring the deployment base path. */
const server = createServer((req, res) => {
  let pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
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
const { port } = server.address();
const url = `http://127.0.0.1:${port}${BASE}/resume/print/`;

const executablePath =
  process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const browser = await chromium.launch(existsSync(executablePath) ? { executablePath } : {});
const page = await browser.newPage();

page.on('console', (m) => m.type() === 'error' && console.warn('  page error:', m.text()));

const response = await page.goto(url, { waitUntil: 'networkidle' });
if (!response?.ok()) throw new Error(`Could not load ${url} (${response?.status()})`);
await page.evaluate(() => document.fonts.ready);

const target = join(outDir, 'Nasa-Sri-Sai-VB-Resume.pdf');
await page.pdf({
  path: target,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
});

await browser.close();
server.close();

const size = readFileSync(target).length;
console.log(`✓ ${target.replace(root + '/', '')} (${(size / 1024).toFixed(0)} KB)`);
console.log('  Rebuild the site so the new PDF is copied into dist/.');
