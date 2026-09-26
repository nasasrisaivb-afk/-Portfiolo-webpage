import type { APIRoute } from 'astro';

/**
 * Generated so the sitemap URL always matches the deployed origin and base
 * path, rather than being hard-coded in a static file that silently rots.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(
    `${import.meta.env.BASE_URL.replace(/\/$/, '')}/sitemap-index.xml`,
    site ?? 'https://example.com',
  ).href;

  return new Response(
    `User-agent: *
Allow: /

# No crawl-delay: this is a small static site.
Sitemap: ${sitemap}
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
