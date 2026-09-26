const BASE = import.meta.env.BASE_URL || '/';

/** Normalised base path, always exactly one trailing slash. */
export const base = BASE.endsWith('/') ? BASE : `${BASE}/`;

/**
 * Build an internal href that survives being served from a sub-path
 * (GitHub Pages project sites) as well as from a domain root.
 *
 *   href('/work')        -> '/-Portfiolo-webpage/work'
 *   href('/#contact')    -> '/-Portfiolo-webpage/#contact'
 *   href('#contact')     -> '#contact'            (same-page anchor, untouched)
 *   href('https://…')    -> 'https://…'           (external, untouched)
 */
export function href(path: string): string {
  if (!path) return base;
  if (/^(?:[a-z]+:|\/\/|#|mailto:|tel:)/i.test(path)) return path;
  return `${base}${path.replace(/^\/+/, '')}`;
}

/** Same as `href`, for files in `public/` (resume, images, icons). */
export const asset = href;

/** Absolute URL, for canonical links, OG tags and JSON-LD. */
export function absolute(path: string, site: URL | undefined): string {
  const origin = site ? site.origin : '';
  return `${origin}${href(path)}`;
}

/** True when `current` is the page (or a child of the page) at `path`. */
export function isCurrent(current: string, path: string): boolean {
  const strip = (s: string) => s.replace(/\/+$/, '') || '/';
  return strip(current) === strip(href(path));
}
