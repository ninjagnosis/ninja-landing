// Structured data. The generic builders (website, breadcrumb, FAQ, article) live
// in the kit and the Organization and WebPage data in lib/page-meta.ts; the
// place, blog and product markup is Ninja Infosys' own.
import { CONTACT_EMAIL, CONTACT_PHONE_JSONLD, SITE_URL } from '../config/site';
import { ORG_ID, canonicalFor } from '@ninjainfosys/site-kit/lib/seo';

export * from '@ninjainfosys/site-kit/lib/seo';
export { webPageJsonLd } from './page-meta';
export { blogJsonLd } from './blog-jsonld';

/** An office as a Place, so both addresses are machine readable. */
export function placeJsonLd(p: { name: string; street: string; locality: string; region?: string; postalCode?: string; country: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: p.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: p.street,
      addressLocality: p.locality,
      ...(p.region ? { addressRegion: p.region } : {}),
      ...(p.postalCode ? { postalCode: p.postalCode } : {}),
      addressCountry: p.country,
    },
    telephone: CONTACT_PHONE_JSONLD,
    email: CONTACT_EMAIL,
    parentOrganization: { '@id': ORG_ID },
  };
}

/** A product in the group. No `offers`: the site carries no prices. */
export function productJsonLd(p: { slug: string; name: string; description: string; url: string; highlights?: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: p.name,
    description: p.description,
    applicationCategory: 'BusinessApplication',
    url: canonicalFor(`/products/${p.slug}`),
    sameAs: [p.url],
    ...(p.highlights?.length ? { featureList: p.highlights } : {}),
    provider: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };
}

/** FAQ markup for questions shown on the page (never for hidden text). */
