# Fonts

Self-hosted variable fonts, latin subset only, so the page makes **zero
third-party requests** and text paints in one round trip.

| File | Family | Axis | Size |
|------|--------|------|------|
| `fraunces-latin-wght-normal.woff2` | Fraunces Variable | `wght 100–900` | ~36 KB |
| `inter-latin-wght-normal.woff2` | Inter Variable | `wght 100–900` | ~48 KB |

Both are SIL Open Font License 1.1 — see the bundled `LICENSE-*.txt`.
Sourced from the `@fontsource-variable/*` packages; re-run
`cp node_modules/@fontsource-variable/<family>/files/<file> public/fonts/`
after upgrading them.
