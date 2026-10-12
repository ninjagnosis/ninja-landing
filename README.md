# Ninja Infosys LLC site

Marketing site for Ninja Infosys LLC, the holding company for eShasan,
ePahichan, AirFone, LunaIoT and LunaCam. Astro, static output, built the same
way as the AirFone, ePahichan and LunaCam sites.

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # dist/ plus sitemap.xml
pnpm check      # audits dist/
pnpm test
```

## Where things are

- `src/config/site.ts`: company name, addresses, phone, email. The Nepal entity
  registration and PAN numbers are `null` until the owner supplies them; they
  are shown only when set.
- `src/data/products.ts`: the five products. One source for pages, menus,
  structured data and `llms.txt`.
- `src/content/blog/`: posts as Markdown; the schema is `src/lib/blog-schema.ts`.
- `functions/api/`: Cloudflare Pages Functions for `/api/contact` and
  `/api/subscribe`. Env: `DCM_API_URL`, `DCM_TENANT_SLUG`, `DCM_CATEGORY_SLUG`,
  `PB_URL` (all have the old site's defaults).
- `public/_redirects`: `/blogs` to `/blog`, consulting-era routes to `/products`.
- `DESIGN.md`: every colour, type and spacing value.

Deploy: Cloudflare Pages, build command `pnpm build`, output `dist`.
