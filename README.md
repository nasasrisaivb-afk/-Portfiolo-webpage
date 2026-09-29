# Nasa Sri Sai V.B — portfolio

A production-ready portfolio for a UX/UI and product designer. Static, fast,
accessible, and built so new projects are a data edit rather than a redesign.

**Stack:** [Astro 7](https://astro.build) · TypeScript · hand-written CSS with a
token-based design system · zero UI frameworks · zero third-party requests at
runtime.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:4321/-Portfiolo-webpage
```

| Script | What it does |
|--------|--------------|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the build locally |
| `npm run check` | TypeScript + Astro diagnostics |
| `npm run audit` | Overflow, a11y, console errors, broken links — every route × 7 viewports |
| `npm run test` | Functional tests: contact form, filtering, mobile menu, theme, keyboard |
| `npm run verify` | build → audit → test |
| `npm run assets` | Regenerate the resume PDF and the social images |
| `npm run figma` | Regenerate the Figma import package in `figma-export/` |
| `npm run og` | Social images only |
| `npm run resume:pdf` | Resume PDF only |

`npm run verify` is the gate. It is also what CI runs before publishing.

---

## Before you publish — the five edits

Everything below lives in plain TypeScript files. Nothing is hidden in a CMS.

1. **`src/data/site.ts`** — the three `profile.social` URLs are best guesses.
   Replace them with your real LinkedIn and Behance links.
2. **`src/data/resume.ts`** — placeholder education, certifications and dates.
   This file feeds the resume page, the About timeline **and** the PDF.
3. **`src/data/case-studies/*.ts`** — CropVibe is grounded in your real repo.
   DEXA, Mr. Yoda and CianaHealth have the right structure with written-in
   narratives; swap in your actual figures. Anything still unverified is
   labelled `Design target` or `To measure` rather than presented as a result.
4. **`.env`** — set `PUBLIC_CONTACT_ENDPOINT` so the contact form posts to a
   real inbox (see **Contact form** below).
5. Run `npm run assets` after editing the resume, then rebuild.

`CONTENT.md` has the full checklist with file paths and line references.

---

## Adding a project

```bash
# 1. create the case study
src/data/case-studies/my-project.ts     # export a `CaseStudy`

# 2. register it
src/data/projects.ts                    # import it, add to `caseStudies`
```

That is the whole job. The home-page rail, the `/work` index, the industry
filter facets, the `/work/<slug>` route, the previous/next pager, the sitemap
and the social card are all derived from that one list.

The case-study template renders **25 sections** — overview, business problem,
user problem, context, role, research, insights, personas, journey, pain
points, problem definition, IA, flows, wireframes, exploration, UI, design
system, prototyping, testing, iterations, final solution, impact, learnings,
next steps — and **skips any section your data omits**, with no empty headings
left behind. `src/data/case-studies/brand-system.ts` is a deliberately short
example of that.

---

## Contact form

The form is real in both configurations:

**With an endpoint** (recommended). Any service that takes a JSON `POST` and
returns 2xx — Formspree, Web3Forms, your own function:

```bash
# .env
PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxxx
# only for providers that want a key in the body (Web3Forms)
PUBLIC_CONTACT_ACCESS_KEY=
```

**Without one**, the form still validates, then composes the message into the
visitor's mail client and offers copy-to-clipboard with the address in full.
It is a fallback, not a dead button — but set the endpoint before you publish.

Both paths are covered by `npm run test`, including the 5xx failure branch.

Spam handling is a honeypot field, which costs nothing and catches naive bots.
For anything more, put a service with its own filtering behind the endpoint.

---

## Design system

Everything visual resolves to a token in `src/styles/tokens.css`.

- **Colour** follows a 60/30/10 split: canvas, surfaces and ink typography, and
  a single rationed accent. Both themes are declared as token sets, so dark
  mode is a value swap rather than a parallel stylesheet.
- **Every text and control pairing was contrast-checked** before it entered the
  system. Ratios are written into the token file beside the values — body text
  ≥ 6.9:1, control borders ≥ 3.9:1, accent-on-canvas ≥ 5.6:1.
- **Type** is a fluid clamp scale (`--step--2` … `--step-6`) that holds from
  320px to 2560px, set in Fraunces (display) and Inter (interface).
- **Space** is an 8px grid; **targets** are 44px minimum.

`src/styles/components.css` holds the components built from those tokens:
buttons (4 emphases × 3 sizes), tags, badges, cards, form fields with every
state, filter chips, empty states, skeletons, modal, toast.

---

## Accessibility

Treated as a build gate, not a review pass. `npm run audit` fails on:

- content clipped or overflowing at 320 / 360 / 390 / 414 / 768 / 1280 / 1680
- a missing or duplicated `h1`, or any skipped heading level
- images with no `alt`, or with no intrinsic size (layout shift)
- controls with no accessible name
- duplicate element ids
- broken internal links, console errors, failed requests

On top of that: semantic landmarks, a skip link as the first tab stop, visible
focus on everything, `aria-current` on the active section, a real focus trap
and scroll lock in the mobile menu, `role="status"` announcements for filtering
and form state, an error summary that takes focus on failed submit, and full
`prefers-reduced-motion` support — with reduced motion, nothing is hidden
waiting for a scroll trigger.

---

## Performance

- **No third-party requests.** Fonts are self-hosted, latin-subset, variable —
  two files, ~84 KB total, both preloaded.
- **No UI framework.** The JavaScript that ships is the nav, the theme toggle,
  the filter, the form and the reveal observer.
- Images are SVG (~3–6 KB each), lazy below the fold, with intrinsic dimensions
  so nothing shifts as they load.
- CSS is a single file, inlined when small enough.
- Motion is CSS-only and pauses entirely under reduced-motion.

---

## SEO

Per-page titles, descriptions, canonicals, Open Graph and Twitter cards;
`Person` JSON-LD on every page plus `Article` on case studies, `CollectionPage`
on `/work` and `ProfilePage` on `/resume`; a generated `sitemap-index.xml` and
`robots.txt` that always match the deployed origin and base path; a per-project
1200×630 social image.

---

## Deployment

The build reads two environment variables so one codebase serves both targets:

| Target | `SITE_URL` | `BASE_PATH` |
|--------|-----------|-------------|
| GitHub Pages project site (default) | `https://<user>.github.io` | `/-Portfiolo-webpage` |
| Custom domain | `https://your-domain.com` | `/` |

`.github/workflows/deploy.yml` builds on push to `main`, runs the audit and the
functional tests, and publishes to Pages only if both pass. Enable it once
under **Settings → Pages → Source → GitHub Actions**, and add
`PUBLIC_CONTACT_ENDPOINT` as a repository secret.

All internal links go through `href()` in `src/lib/url.ts`, so nothing breaks
when the base path changes.

---

## Project structure

```
src/
  data/                 all content — the only files you edit routinely
    site.ts             identity, SEO defaults, navigation, contact config
    types.ts            the content model
    projects.ts         the project registry (drives everything)
    case-studies/       one file per project
    skills.ts  process.ts  resume.ts  testimonials.ts
  styles/
    tokens.css          the design system
    global.css          base, typography, layout primitives, a11y, motion
    components.css      buttons, tags, cards, forms, chips, states
    case-study.css      case-study-specific patterns
  components/           presentational components
  layouts/              Base, CaseStudyLayout
  pages/                routes (+ robots.txt and manifest as endpoints)
  lib/url.ts            base-path-safe link helper
figma-export/           importable Figma package (see its own README)
  artboards/*.svg       7 screens + foundations + components
  tokens.json           W3C design tokens for the Variables importer
scripts/
  figma/                generates the above from src/data + src/styles
  audit.mjs             accessibility / overflow / link audit
  test-interactions.mjs functional tests
  build-covers.mjs      project artwork
  build-og-images.mjs   social images and app icons
  build-resume-pdf.mjs  resume PDF, rendered from /resume/print
  screenshots.mjs       design-review screenshots
```

---

## Licence

Code is yours to use. The content, case studies and artwork are
Nasa Sri Sai V.B's. Fraunces and Inter are SIL OFL 1.1 — see
`public/fonts/LICENSE-*.txt`.
