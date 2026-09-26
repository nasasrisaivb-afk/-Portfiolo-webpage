/**
 * Functional tests for the interactive parts of the site.
 *
 * These are the pieces that can silently become decorative: the contact form,
 * project filtering, the mobile menu, the theme toggle and keyboard access.
 *
 * Run: node scripts/test-interactions.mjs   (build first)
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const BASE = (process.env.BASE_PATH ?? '/-Portfiolo-webpage').replace(/\/$/, '');

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
    res.end('nf');
    return;
  }
  res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
});

await new Promise((d) => server.listen(0, '127.0.0.1', d));
const origin = `http://127.0.0.1:${server.address().port}${BASE}`;

const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

let passed = 0;
const failures = [];
const check = (name, ok, detail = '') => {
  if (ok) {
    passed += 1;
    console.log(`  ✓ ${name}`);
  } else {
    failures.push(`${name}${detail ? ` — ${detail}` : ''}`);
    console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ''}`);
  }
};

// ---------------------------------------------------------------------------
console.log('\nContact form');
// ---------------------------------------------------------------------------
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${origin}/`, { waitUntil: 'networkidle' });

  // Empty submit must be blocked and reported, not silently swallowed.
  await page.click('#cf-submit');
  await page.waitForTimeout(150);
  check('empty submit surfaces an error summary', await page.isVisible('#form-summary'));
  check(
    'error summary lists every invalid field',
    (await page.locator('#form-summary-list li').count()) === 3,
  );
  check(
    'invalid fields are marked aria-invalid',
    (await page.locator('[aria-invalid="true"]').count()) === 3,
  );
  check('error summary receives focus', (await page.evaluate(() => document.activeElement?.id)) === 'form-summary');

  // A bad email must be caught by the field rule.
  await page.fill('#cf-name', 'Jane Reviewer');
  await page.fill('#cf-email', 'not-an-email');
  await page.fill('#cf-message', 'Short');
  await page.click('#cf-submit');
  await page.waitForTimeout(150);
  check(
    'malformed email is rejected',
    (await page.textContent('#cf-email-error'))?.includes('does not look complete') ?? false,
  );
  check(
    'too-short message is rejected',
    (await page.textContent('#cf-message-error'))?.includes('more detail') ?? false,
  );

  // Correcting a field clears its error while typing.
  await page.fill('#cf-email', 'jane@example.com');
  await page.waitForTimeout(100);
  check('fixing a field clears its error', (await page.textContent('#cf-email-error')) === '');

  // Valid submit. No endpoint is configured in this build, so the form hands
  // off to the mail client — assert it composed a real mailto with the content.
  // Capture the mail hand-off: the form clicks a real anchor, so intercept
  // the click rather than fighting the browser's read-only location.
  await page.evaluate(() => {
    window.__mailto = '';
    document.addEventListener(
      'click',
      (event) => {
        const link = event.target instanceof Element ? event.target.closest('a[href^="mailto:"]') : null;
        if (link) {
          window.__mailto = link.getAttribute('href');
          event.preventDefault();
        }
      },
      true,
    );
  });
  await page.fill('#cf-message', 'We are hiring a product designer and your CropVibe study is exactly the work.');
  await page.fill('#cf-company', 'Example Ltd');
  await page.click('#cf-submit');
  await page.waitForTimeout(300);

  const composed = await page.evaluate(() => window.__mailto ?? '');
  check('valid submit composes a real mailto', composed.startsWith('mailto:nasasrisaivb@gmail.com'));
  check('composed message carries the form content', decodeURIComponent(composed).includes('Example Ltd'));
  check('success state is shown', await page.isVisible('#cf-success'));
  check('form is hidden behind the success state', !(await page.isVisible('#contact-form')));

  await page.click('#cf-reset');
  await page.waitForTimeout(150);
  check('“send another” returns to the form', await page.isVisible('#contact-form'));

  await page.close();
}

// ---------------------------------------------------------------------------
console.log('\nContact form — server endpoint path');
// ---------------------------------------------------------------------------
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${origin}/`, { waitUntil: 'networkidle' });

  // Simulate a configured endpoint, then assert both the success and the
  // failure branch actually do what they claim.
  await page.evaluate(() => {
    document.getElementById('contact-form').dataset.endpoint = 'https://forms.example.test/submit';
  });
  await page.route('https://forms.example.test/submit', (route) =>
    route.fulfill({ status: 200, body: '{"ok":true}' }),
  );
  await page.fill('#cf-name', 'Jane Reviewer');
  await page.fill('#cf-email', 'jane@example.com');
  await page.fill('#cf-message', 'A message long enough to pass validation comfortably.');
  await page.click('#cf-submit');
  await page.waitForTimeout(400);
  check('2xx response shows the success state', await page.isVisible('#cf-success'));
  check(
    'success copy is the sent-confirmation, not the mailto fallback',
    (await page.textContent('#cf-success-title'))?.trim() === 'Message sent',
  );

  await page.click('#cf-reset');
  await page.unroute('https://forms.example.test/submit');
  await page.route('https://forms.example.test/submit', (route) =>
    route.fulfill({ status: 500, body: 'boom' }),
  );
  await page.fill('#cf-name', 'Jane Reviewer');
  await page.fill('#cf-email', 'jane@example.com');
  await page.fill('#cf-message', 'A message long enough to pass validation comfortably.');
  await page.click('#cf-submit');
  await page.waitForTimeout(400);
  check('5xx response shows the error state', await page.isVisible('#cf-error'));
  check('error state offers a retry', await page.isVisible('#cf-retry'));
  await page.click('#cf-retry');
  await page.waitForTimeout(150);
  check('retry returns to the form with values intact', (await page.inputValue('#cf-name')) === 'Jane Reviewer');

  await page.close();
}

// ---------------------------------------------------------------------------
console.log('\nProject filtering');
// ---------------------------------------------------------------------------
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${origin}/work/`, { waitUntil: 'networkidle' });

  const total = await page.locator('[data-industry]').count();
  check('all projects render by default', total === 5, `saw ${total}`);

  await page.click('[data-filter="Healthcare"]');
  await page.waitForTimeout(150);
  const visible = await page.locator('[data-industry]:not([hidden])').count();
  check('filtering narrows the grid', visible === 2, `saw ${visible}`);
  check(
    'active chip is announced as pressed',
    (await page.getAttribute('[data-filter="Healthcare"]', 'aria-pressed')) === 'true',
  );
  check(
    'status region reports the result',
    (await page.textContent('#filter-status'))?.includes('2 Healthcare') ?? false,
  );
  check('filter is reflected in the URL', page.url().includes('industry=Healthcare'));

  // A shared filtered link must land filtered.
  await page.goto(`${origin}/work/?industry=Logistics`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(200);
  check(
    'shared filtered URL restores the filter',
    (await page.locator('[data-industry]:not([hidden])').count()) === 1,
  );

  // Empty state.
  await page.evaluate(() => {
    document.querySelectorAll('[data-industry]').forEach((el) => (el.dataset.industry = 'Nothing'));
    document.querySelector('[data-filter="Logistics"]').click();
  });
  await page.waitForTimeout(150);
  check('empty result shows the empty state', await page.isVisible('#work-empty'));
  await page.click('#work-clear');
  await page.waitForTimeout(150);
  check('empty state can clear the filter', !(await page.isVisible('#work-empty')));

  await page.close();
}

// ---------------------------------------------------------------------------
console.log('\nMobile navigation');
// ---------------------------------------------------------------------------
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${origin}/`, { waitUntil: 'networkidle' });

  check('menu starts closed', !(await page.isVisible('#mobile-nav')));
  await page.click('#nav-toggle');
  await page.waitForTimeout(200);
  check('burger opens the menu', await page.isVisible('#mobile-nav'));
  check('toggle reports expanded', (await page.getAttribute('#nav-toggle', 'aria-expanded')) === 'true');
  check(
    'focus moves into the panel',
    await page.evaluate(() => document.getElementById('mobile-nav')?.contains(document.activeElement)),
  );
  check(
    'background scroll is locked',
    (await page.evaluate(() => document.body.style.overflow)) === 'hidden',
  );

  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  check('Escape closes the menu', !(await page.isVisible('#mobile-nav')));
  check(
    'focus returns to the toggle',
    (await page.evaluate(() => document.activeElement?.id)) === 'nav-toggle',
  );
  check('scroll lock is released', (await page.evaluate(() => document.body.style.overflow)) === '');

  await page.click('#nav-toggle');
  await page.waitForTimeout(150);
  await page.click('.mobile-nav__link >> nth=1');
  await page.waitForTimeout(250);
  check('following a link closes the menu', !(await page.isVisible('#mobile-nav')));

  await page.close();
}

// ---------------------------------------------------------------------------
console.log('\nTheme toggle');
// ---------------------------------------------------------------------------
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${origin}/`, { waitUntil: 'networkidle' });

  await page.click('#theme-toggle');
  // The canvas colour transitions over --dur-base; wait it out before reading,
  // otherwise getComputedStyle returns a mid-transition blend.
  await page.waitForTimeout(500);
  check('toggle switches to dark', (await page.getAttribute('html', 'data-theme')) === 'dark');
  check(
    'dark canvas is actually applied',
    (await page.evaluate(() => getComputedStyle(document.body).backgroundColor)) ===
      'rgb(18, 17, 14)',
  );

  await page.reload({ waitUntil: 'networkidle' });
  check('choice survives a reload', (await page.getAttribute('html', 'data-theme')) === 'dark');

  await page.click('#theme-toggle');
  await page.waitForTimeout(500);
  check('toggle switches back to light', (await page.getAttribute('html', 'data-theme')) === 'light');
  check(
    'light canvas is restored',
    (await page.evaluate(() => getComputedStyle(document.body).backgroundColor)) ===
      'rgb(247, 245, 240)',
  );

  await page.close();
}

// ---------------------------------------------------------------------------
console.log('\nKeyboard access & anchors');
// ---------------------------------------------------------------------------
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${origin}/`, { waitUntil: 'networkidle' });

  await page.keyboard.press('Tab');
  check(
    'first tab stop is the skip link',
    await page.evaluate(() => document.activeElement?.classList.contains('skip-link')),
  );

  await page.keyboard.press('Enter');
  await page.waitForTimeout(200);
  check('skip link targets main', page.url().endsWith('#main'));

  // Every in-page nav anchor must resolve to a real section.
  const dangling = await page.evaluate(() =>
    [...document.querySelectorAll('[data-nav-link]')]
      .map((a) => a.getAttribute('href'))
      .filter((h) => h?.includes('#'))
      .map((h) => h.slice(h.indexOf('#') + 1))
      .filter((id) => id && !document.getElementById(id)),
  );
  check('every nav anchor resolves to a section', dangling.length === 0, dangling.join(', '));

  // The scroll-spy must actually mark a section.
  await page.evaluate(() => document.getElementById('process')?.scrollIntoView());
  await page.waitForTimeout(700);
  check(
    'scroll-spy marks the visible section',
    (await page.locator('[data-nav-link][aria-current]').count()) === 1,
  );

  await page.close();
}

// ---------------------------------------------------------------------------
console.log('\nReduced motion');
// ---------------------------------------------------------------------------
{
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'reduce',
  });
  await page.goto(`${origin}/`, { waitUntil: 'networkidle' });
  check(
    'reveal animations are not armed',
    !(await page.evaluate(() => document.documentElement.classList.contains('is-ready'))),
  );
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll('.js-reveal')].filter(
      (el) => Number(getComputedStyle(el).opacity) < 0.9,
    ).length,
  );
  check('all content is visible without motion', hidden === 0, `${hidden} hidden`);
  await page.close();
}

// ---------------------------------------------------------------------------
console.log('\nResume');
// ---------------------------------------------------------------------------
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${origin}/resume/`, { waitUntil: 'networkidle' });
  const pdfHref = await page.getAttribute('a[download]', 'href');
  const res = await page.request.get(new URL(pdfHref, origin + '/').href);
  check('resume PDF downloads', res.ok(), `status ${res.status()}`);
  const body = await res.body();
  check('resume PDF is a real PDF', body.subarray(0, 5).toString() === '%PDF-', body.subarray(0, 5).toString());
  check('resume PDF is not empty', body.length > 20_000, `${body.length} bytes`);
  await page.close();
}

await browser.close();
server.close();

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log('\nFailures:');
  failures.forEach((f) => console.log(`  · ${f}`));
  process.exitCode = 1;
}
