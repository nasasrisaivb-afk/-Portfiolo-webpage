/**
 * Renders social-sharing images (1200×630 PNG) with headless Chromium.
 *
 * One default card for the site, plus one per case study. Composed from the
 * same tokens as the site so a shared link looks like the page it opens.
 *
 * Run: node scripts/build-og-images.mjs
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'public/og');
mkdirSync(out, { recursive: true });

const { caseStudies } = await import(pathToFileURL(resolve(root, 'scripts/_content.mjs')).href);

const PAPER = '#f7f5f0';
const INK = '#14140f';
const MUTED = '#56544c';
const ACCENT = '#a8401c';

const card = ({ eyebrow, title, tagline, footer, tint }) => `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  @font-face {
    font-family: 'Fraunces';
    src: url('${pathToFileURL(resolve(root, 'public/fonts/fraunces-latin-wght-normal.woff2')).href}') format('woff2-variations');
    font-weight: 100 900;
  }
  @font-face {
    font-family: 'InterV';
    src: url('${pathToFileURL(resolve(root, 'public/fonts/inter-latin-wght-normal.woff2')).href}') format('woff2-variations');
    font-weight: 100 900;
  }
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 72px 80px;
    background: ${PAPER};
    color: ${INK};
    font-family: 'InterV', sans-serif;
    position: relative; overflow: hidden;
  }
  .wash {
    position: absolute; top: -220px; right: -160px;
    width: 640px; height: 640px; border-radius: 50%;
    background: radial-gradient(circle, ${tint}2e, transparent 68%);
  }
  .eyebrow {
    font-size: 20px; font-weight: 600; letter-spacing: .14em;
    text-transform: uppercase; color: ${ACCENT};
    display: flex; align-items: center; gap: 20px;
  }
  .eyebrow::before { content:''; width: 56px; height: 2px; background: ${ACCENT}; }
  h1 {
    font-family: 'Fraunces', serif; font-weight: 600;
    font-size: ${title.length > 26 ? 76 : 96}px; line-height: 1.02;
    letter-spacing: -.03em; max-width: 19ch; margin-top: 30px;
  }
  p.tagline {
    font-size: 27px; line-height: 1.38; color: ${MUTED};
    max-width: 30ch; margin-top: 26px;
  }
  footer {
    display: flex; align-items: center; gap: 20px;
    font-size: 21px; color: ${MUTED}; position: relative;
    padding-top: 28px; border-top: 1px solid #ded9cf;
  }
  .mark {
    width: 52px; height: 52px; border-radius: 12px;
    background: ${INK}; color: ${PAPER};
    display: grid; place-items: center;
    font-family: 'Fraunces', serif; font-weight: 700; font-size: 20px;
  }
  .who { color: ${INK}; font-weight: 600; }
</style></head>
<body>
  <div class="wash"></div>
  <div>
    <div class="eyebrow">${eyebrow}</div>
    <h1>${title}</h1>
    ${tagline ? `<p class="tagline">${tagline}</p>` : ''}
  </div>
  <footer>
    <div class="mark">NS</div>
    <span class="who">Nasa Sri Sai V.B</span>
    <span>·</span>
    <span>${footer}</span>
  </footer>
</body></html>`;

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Use the Chromium already present in this environment when the version
 * Playwright expects is not downloaded. Set CHROMIUM_PATH to override.
 */
const executablePath =
  process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const browser = await chromium.launch(
  existsSync(executablePath) ? { executablePath } : {},
);
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

const jobs = [
  {
    file: 'og-default.png',
    html: card({
      eyebrow: 'UX/UI &amp; Product Designer',
      title: 'Turning complex problems into simple, useful experiences.',
      tagline: 'Research → strategy → UX → UI → design systems → shipped product.',
      footer: 'Selected work &amp; case studies',
      tint: ACCENT,
    }),
  },
  ...caseStudies.map((p) => ({
    file: `og-${p.slug}.png`,
    html: card({
      eyebrow: `${escapeHtml(p.industry)} · Case study`,
      title: escapeHtml(p.title),
      tagline: escapeHtml(p.tagline),
      footer: escapeHtml(p.projectType),
      tint: p.tint,
    }),
  })),
];

for (const job of jobs) {
  await page.setContent(job.html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const buffer = await page.screenshot({ type: 'png' });
  writeFileSync(resolve(out, job.file), buffer);
  console.log(`✓ ${job.file} (${(buffer.length / 1024).toFixed(0)} KB)`);
}

// Apple touch icon + maskable icon, rendered from the same monogram.
for (const [file, size, radius] of [
  ['apple-touch-icon.png', 180, 40],
  ['icon-512.png', 512, 0],
]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<!doctype html><html><head><meta charset="utf-8"><style>
      *{margin:0;box-sizing:border-box}
      @font-face{font-family:'Fraunces';src:url('${pathToFileURL(resolve(root, 'public/fonts/fraunces-latin-wght-normal.woff2')).href}') format('woff2-variations');font-weight:100 900;}
      body{width:${size}px;height:${size}px;display:grid;place-items:center;
        background:${INK};border-radius:${radius}px;
        font-family:'Fraunces',serif;font-weight:700;color:${PAPER};
        font-size:${size * 0.42}px;letter-spacing:-.02em;}
    </style></head><body>NS</body></html>`,
    { waitUntil: 'networkidle' },
  );
  await page.evaluate(() => document.fonts.ready);
  const buffer = await page.screenshot({ type: 'png', omitBackground: radius > 0 });
  writeFileSync(resolve(root, 'public', file), buffer);
  console.log(`✓ ${file}`);
}

await browser.close();
