# Ninja Infosys site: Astro rebuild

Date: 2026-10-12. Status: draft for review.

## Goal

Replace the Next.js marketing site with an Astro static site that uses the same
architecture, layout patterns and content conventions as the AirFone, ePahichan
and LunaCam sites, so all four are maintained one way. Nothing is lost: pages,
blogs, SEO and forms carry over.

## Positioning

Ninja Infosys LLC is a holding company. The site presents the group and its five
products (eShasan, ePahichan, AirFone, LunaIoT, LunaCam), not a consulting firm.
The home page leads with the products, then the group (who we are, where we
operate, how to reach us). Consulting-era copy ("global consulting",
capabilities, industries) is not carried over.

## Decisions already made

- Astro 5, static output, same skeleton as `epahichan-public-landing`
  (`src/pages`, `src/components/{home,site,seo,blog,forms}`, `src/config/site.ts`,
  `src/data/*.ts`, `src/content/blog`, `src/styles/tokens.css`, `DESIGN.md`).
- Palette from the logo: blue `#0048C0` is the action colour (buttons, links,
  focus), red `#DC143C` is the accent (selection, logo, large type only), one dark
  navy stage band per page `#0B1F4D`. Neutrals are white and blue-tinted. Light only.
  Final values and computed contrast go in `DESIGN.md` before use.
- Type: Poppins for headings, buttons and navigation; Inter for reading. Self-hosted.
- Flat surfaces, radius 8/12px, no shadows, gradients, blur, bylines, eyebrows or
  breadcrumbs. Same scale, spacing and motion rules as the three reference sites.
- Company name everywhere: **Ninja Infosys LLC**.
- Ninja Infosys LLC is the main focus of the site: page titles, Open Graph
  titles, the Organization schema, the header logo text, the home page and the
  copyright line all name Ninja Infosys LLC. Nothing in the main content is
  framed around the Nepal company.
- Nepal entity line: a single supporting line in the footer, contact and legal
  pages only, stating that Ninja Infosys LLC operates in Nepal through Ninja
  Infosys Pvt. Ltd. (Nepal-registered private limited company). Office address and registration numbers are inputs from the
  owner and are not invented. Missing values fail the build check, not ship blank.

## Pages and layout patterns

Same set and shape as the reference sites:

| Route | Pattern source |
|---|---|
| `/` | home: hero, products, solutions, trust, CTA band (ePahichan `components/home`) |
| `/products/[slug]`, `/solutions/[slug]` | data-driven pages from `src/data/products.ts`, `solutions.ts`. Products are exactly five: eShasan, ePahichan, AirFone, LunaIoT, LunaCam (`/products/eshasan`, `/epahichan`, `/airfone`, `/lunaiot`, `/lunacam`). Each links out to its own site. |
| `/about`, `/locations`, `/careers`, `/contact` | one designed page each, written for a holding company |
| `/services`, `/solutions/[slug]`, `/partners` | consulting-era pages: dropped unless the owner says to keep one (open item 5) |
| `/blog`, `/blog/[slug]`, `/blog/page/[n]`, `/blog/tag/[tag]` | content collection, paginated |
| `/glossary` and `/glossary/[slug]` | only if there is source content; otherwise dropped |
| `/privacy`, `/terms`, `/cookies`, `/delete-account` | Legal layout |
| `/thanks`, `/404` | as in the reference sites |
| `/sitemap.xml`, `/robots.txt`, `/rss.xml`, `/llms.txt`, `/og/*.png` | generated |

Old routes keep their URLs, except blogs: `/blogs` and `/blogs/[slug]` redirect to `/blog`. Trailing-slash behaviour is kept as configured.

## SEO (carried over and extended)

- Per-page title, description, canonical, Open Graph and Twitter tags through one
  `Seo.astro`, as in the reference sites.
- JSON-LD: Organization (Ninja Infosys LLC, with Nepal entity), WebSite, Article
  for posts, BreadcrumbList as data only (not shown).
- Sitemap with real `lastmod` from post dates; robots with the existing disallows;
  host `https://ninjainfosys.com`.
- Redirects for every changed URL so no indexed page 404s. Redirect list is
  generated from the old route table and checked in a test.
- Security headers from the old `next.config.mjs` move to a `_headers` file.

## Blogs

- New blogs only. The old posts are not migrated, and the DCM and PocketBase blog
  sources are dropped.
- Topics are about the group: Ninja Infosys LLC and its five products
  (eShasan, ePahichan, AirFone, LunaIoT, LunaCam), their launches, how they work
  and company news. Each post is tagged with the product or "group" it belongs
  to, and `/blog/tag/[tag]` pages give one feed per product.
- Posts are Markdown files in `src/content/blog`, validated by a schema that
  fails the build on a missing or wrong field, as in the reference sites. No
  author byline; posts are by Ninja Infosys LLC.
- Posts are written by the owner (or drafted on request). The blog index and
  RSS feed are generated from whatever posts exist.
- Old `/blogs` and `/blogs/[slug]` URLs redirect permanently to `/blog` so
  indexed links do not 404.

## Content sources

- Team, partners, banners, testimonials: fetched at build time
  from DCM and PocketBase with the same fallbacks as today, written to
  `src/data` snapshots.
- Language: English and Nepali strings kept in one dictionary. Whether the
  switcher stays is an open item (below).

## Forms

Contact, booking, quote and subscribe are the one runtime piece. The old site
claims static export but its four `/api/*` routes do not work in a static build
(its own README says so).

Design: static pages plus four small Cloudflare Pages Functions (or one Worker
route), same validation (zod, honeypot) and same destination (DCM contact
submission). Email notification currently uses nodemailer over SMTP, which does
not run on Workers; replace with the DCM submission alone, or an HTTP mail API.
This needs the owner's choice (open item).

## Hosting

Cloudflare Pages, static output with Functions for forms. `wrangler.jsonc`
and the OpenNext worker config are removed.

## Testing

- Build fails on schema errors, missing Nepal entity fields, broken internal
  links, missing alt text and any colour value not in `DESIGN.md`
  (`pnpm check`, as in the reference sites).
- Redirect test over the old route table.
- Form functions: unit tests for validation, honeypot and DCM failure path.
- Manual: owner views the live preview after each batch.

## Out of scope

Rewriting copy, new features, new languages, changing the sitemap beyond the
`/blogs` to `/blog` move.

## Open items for the owner

1. Nepal entity details: legal name, registration number, PAN/VAT if shown,
   office address.
2. Keep the English/Nepali switcher? Keep the search overlay? (Recommend: keep
   switcher, drop search.)
3. Form email: DCM submission only, or an HTTP mail service.
4. Is `/blogs` to `/blog` acceptable, or keep `/blogs` as the canonical path?
5. Drop `/services`, `/solutions` and `/partners`, or keep any of them? (Recommend
   drop; their old URLs redirect to `/` or `/products`.)
