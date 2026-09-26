import type { APIRoute } from 'astro';
import { profile, site } from '../data/site';
import { asset } from '../lib/url';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: `${profile.name} — ${profile.role}`,
      short_name: profile.shortName,
      description: site.description,
      start_url: asset('/'),
      scope: asset('/'),
      display: 'standalone',
      background_color: site.themeColorLight,
      theme_color: site.themeColorLight,
      icons: [
        { src: asset('/favicon.svg'), sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        { src: asset('/apple-touch-icon.png'), sizes: '180x180', type: 'image/png' },
        { src: asset('/icon-512.png'), sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } },
  );
