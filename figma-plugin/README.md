# Portfolio — Build Design System (Figma plugin)

Run this once in Figma and it builds the whole design file natively:
variable collections with Light/Dark modes, text styles, component sets with
real variants, and six screens assembled from instances with auto-layout.

This is the same Plugin API work the Figma MCP server does remotely. It runs
here because the **Figma Starter plan caps MCP at 20 tool calls per month** —
not per day. Running the plugin locally has no quota at all.

---

## Install and run (about two minutes)

You need the **Figma desktop app** — browser Figma cannot load a local plugin.

1. Download this `figma-plugin/` folder (`manifest.json` and `code.js` are the
   only two files that matter).
2. Open the desktop app and create or open a **Design** file.
3. Menu → **Plugins → Development → Import plugin from manifest…**
4. Choose `figma-plugin/manifest.json`.
5. Run it: **Plugins → Development → Portfolio — Build Design System**.

It finishes in a few seconds and leaves you on the Screens page. The toast
reports what it built; anything it had to skip appears in
**Plugins → Development → Open console**.

> **Run it in a new file.** It creates pages named `01 — Foundations`,
> `02 — Components` and `03 — Screens`. Re-running is safe — it removes only
> what a previous run of this plugin created (tracked with plugin data) and
> updates variables and styles in place rather than duplicating them.

### On a Starter plan

A Starter file allows 3 pages, which is exactly what this uses. If the file
already has pages, the plugin reuses the last one and says so in a warning
rather than failing.

---

## What you get

**Variables** — 37 primitives (hidden from pickers), 22 semantic colours each
aliased to a primitive and resolving in both **Light** and **Dark**, 12 spacing
steps, 6 radii. Every colour carries its CSS variable name as code syntax, so
Dev Mode shows `var(--accent)` — the same token the site ships.

**Text styles** — the full 12-step ramp, Fraunces for display and Inter for
interface.

**Components** — 7, with 24 variants:

| Component | Variants |
|---|---|
| Button | `Emphasis` × `Size` — 4 × 3 |
| Field | `State` — Default, Focus, Error, Disabled |
| Tag | `Kind` — Plain, Accent, Solid |
| Badge | `Tone` — Success, Warning, Danger |
| Chip | `State` — Default, Pressed |
| Project card | single |
| Nav / Sticky | single |

Fills, strokes, corner radii, padding and gaps are **bound to variables**, not
typed in. The only literal colours are inside the project artwork, where a
white panel sits on a brand-colour plate and must stay white in dark mode.

**Screens** — Home desktop, **the same Home pinned to Dark mode**, Home mobile
(390), Work index, the CropVibe case study, and 404. All built from component
instances with auto-layout, so they reflow when you edit them.

The dark screen is the point of a two-mode collection: identical components,
one override. Select it and look at the Color collection in the right panel.

---

## Content comes from the site

`code.js` is generated. It embeds the real content from `src/data/` — projects,
taglines, metrics, insights, navigation — so the Figma file and the website
cannot drift.

```bash
npm run figma:plugin     # rebuild code.js from src/, then test it
```

Edit `figma-plugin/src/*.js`, never `code.js`.

| Source | Contains |
|---|---|
| `src/00-prelude.js` | Plugin API helpers — auto-layout, variable binding, text |
| `src/10-foundations.js` | Token definitions, variable collections, text styles |
| `src/20-components.js` | Component sets and variants |
| `src/30-screens.js` | Specimen sheet and the six screens |
| `src/90-main.js` | Orchestration, page setup, idempotent cleanup, reporting |

## Tested before it reaches you

`npm run figma:test` executes `code.js` against a mock of the Plugin API
(`scripts/figma/mock-figma.mjs`) that enforces the real rules — unloaded fonts
throw, colour channels outside 0–1 throw, `FILL` on a non-auto-layout child
throws, `figma.currentPage =` throws, unknown variant properties throw.

28 assertions cover: every semantic colour resolving in both modes and aliasing
a primitive, no variable left on `ALL_SCOPES`, WEB code syntax on every colour,
variant counts, variants actually laid out rather than stacked at 0,0, six
screens, the dark screen's mode override, no hardcoded fill outside the
artwork, and no text node rendering empty or the literal `undefined`.

It is not a layout engine, so it cannot prove nothing visually overlaps — that
is what opening the file shows you. It does prove the script runs end to end
and builds the structure it claims.
