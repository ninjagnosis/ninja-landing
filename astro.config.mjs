import { defineConfig } from 'astro/config';

// Static build, no trailing slashes. The sitemap is written after the build
// from dist/ (scripts/sitemap.mjs). The four form endpoints are Cloudflare
// Pages Functions in functions/api.
export default defineConfig({
  markdown: { shikiConfig: { theme: 'github-light' } },
  site: 'https://ninjainfosys.com',
  output: 'static',
  trailingSlash: 'never',
  i18n: { locales: ['en', 'ne'], defaultLocale: 'en', routing: { prefixDefaultLocale: false } },
  build: { format: 'file', assets: 'assets', inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
  compressHTML: true,
  vite: {
    server: { allowedHosts: true },
    ssr: { external: ['@resvg/resvg-js'] },
    optimizeDeps: { exclude: ['@resvg/resvg-js'] },
    build: { rollupOptions: { external: [/\.node$/] } },
  },
});
