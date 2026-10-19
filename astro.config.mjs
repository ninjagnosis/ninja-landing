import { defineConfig } from 'astro/config';
import siteKit from '@ninjainfosys/site-kit/integration';

// Static build, no trailing slashes. The sitemap is written after the build
// from dist/ (site-kit sitemap). The four form endpoints are Cloudflare
// Pages Functions in functions/api.
export default defineConfig({
  markdown: { shikiConfig: { theme: 'github-light' } },
  integrations: [siteKit({ pages: { glossary: false } })],
  site: 'https://ninjainfosys.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', assets: 'assets', inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
  compressHTML: true,
  vite: {
    server: { allowedHosts: true },
  },
});
