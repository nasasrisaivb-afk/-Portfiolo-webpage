// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Deployment is configured through two env vars so the same build works on
 * GitHub Pages (project site, served from a sub-path) and on a custom domain.
 *
 *   GitHub Pages (default):  SITE_URL=https://<user>.github.io  BASE_PATH=/-Portfiolo-webpage
 *   Custom domain:           SITE_URL=https://your-domain.com   BASE_PATH=/
 */
const SITE_URL = process.env.SITE_URL ?? 'https://nasasrisaivb-afk.github.io';
const BASE_PATH = process.env.BASE_PATH ?? '/-Portfiolo-webpage';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto', format: 'directory' },
  integrations: [
    sitemap({
      // The 404 and the print-only resume are not destinations.
      filter: (page) => !page.includes('/404') && !page.includes('/resume/print'),
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],
  vite: {
    build: {
      cssCodeSplit: false,
      assetsInlineLimit: 2048,
    },
  },
});
