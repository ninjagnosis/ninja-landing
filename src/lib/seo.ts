import { CERTIFICATIONS, CONTACT_EMAIL, CONTACT_PHONE_JSONLD, LLC, NEPAL, SITE_NAME, SITE_URL } from '../config/site';

/** The one URL a page is known by: lowercase, no query, no .html, no trailing slash except root. */
export function canonicalFor(path: string): string {
  let p = (path || '/').split(/[?#]/)[0].toLowerCase();
  p = p.replace(/\.html$/, '').replace(/\/index$/, '/');
  if (p !== '/') p = p.replace(/\/+$/, '');
  if (!p.startsWith('/')) p = `/${p}`;
  return p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}`;
}

export const abs = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`);

export function titleFor(page?: string): string {
  if (!page || page === SITE_NAME) return SITE_NAME;
  return `${page} · ${SITE_NAME}`;
}

const ORG_ID = `${SITE_URL}/#organization`;

export function orgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    legalName: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: abs('/brand/ninja-mark-512.png'),
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_JSONLD,
    address: {
      '@type': 'PostalAddress',
      streetAddress: LLC.street,
      addressLocality: LLC.locality,
      addressRegion: LLC.region,
      postalCode: LLC.postalCode,
      addressCountry: LLC.country,
    },
    hasCertification: CERTIFICATIONS.map((c) => ({ '@type': 'Certification', name: c.name, description: c.description })),
    award: [
      'ASOCIO Digital Government Award 2025',
      'National ICT Award 2025, Provincial/District Private Sector',
      'Provincial Startup ICT Recognition Award 2024, Lumbini Province',
      'Emerging Startup of the Year 2021, Lumbini Province, Kumari Bank NewBiz Startup Summit and Awards',
    ],
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', telephone: CONTACT_PHONE_JSONLD, email: CONTACT_EMAIL, availableLanguage: ['en'] },
    subOrganization: {
      '@type': 'Organization',
      name: NEPAL.legalName,
      address: { '@type': 'PostalAddress', streetAddress: NEPAL.street, addressLocality: NEPAL.locality, addressCountry: 'NP' },
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  const all = [{ name: 'Home', path: '/' }, ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: canonicalFor(it.path) })),
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
export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

const ymd = (d: Date) => d.toISOString().slice(0, 10);

export function articleJsonLd(post: {
  slug: string;
  title: string;
  description: string;
  date: Date;
  updated?: Date;
  image: string;
  tags?: string[];
  words?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: ymd(post.date),
    dateModified: ymd(post.updated ?? post.date),
    image: abs(post.image),
    url: canonicalFor(`/blog/${post.slug}`),
    mainEntityOfPage: canonicalFor(`/blog/${post.slug}`),
    author: { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME },
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
    ...(post.tags?.length ? { keywords: post.tags.map((t) => t.replace(/-/g, ' ')).join(', '), articleSection: post.tags[0].replace(/-/g, ' ') } : {}),
    ...(post.words ? { wordCount: post.words } : {}),
  };
}
