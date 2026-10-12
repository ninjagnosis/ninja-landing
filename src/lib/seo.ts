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

/** Titles stay under about 65 characters. The brand is added only when it fits and is not already there. */
export function titleFor(page?: string): string {
  if (!page || page === SITE_NAME) return SITE_NAME;
  if (page.includes('Ninja Infosys')) return page;
  const full = `${page} · ${SITE_NAME}`;
  return full.length <= 65 ? full : page;
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
    logo: { '@type': 'ImageObject', '@id': `${SITE_URL}/#logo`, url: abs('/brand/ninja-mark-512.png'), contentUrl: abs('/brand/ninja-mark-512.png'), width: 512, height: 512, caption: SITE_NAME },
    image: abs('/brand/ninja-mark-512.png'),
    sameAs: ['https://www.facebook.com/infosysninja'],
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
    brand: [
      { '@type': 'Brand', name: 'eShasan', url: 'https://eshasan.com' },
      { '@type': 'Brand', name: 'ePahichan', url: 'https://epahichan.com' },
      { '@type': 'Brand', name: 'AirFone', url: 'https://airfone.app' },
      { '@type': 'Brand', name: 'LunaIoT', url: 'https://mylunago.com' },
      { '@type': 'Brand', name: 'LunaCam', url: 'https://lunacam.app' },
    ],
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
      foundingDate: '2019-10-10',
      address: { '@type': 'PostalAddress', streetAddress: NEPAL.street, addressLocality: NEPAL.locality, addressCountry: 'NP' },
    },
  };
}

/** Every page is a WebPage that belongs to the site and is about the organisation. */
export function webPageJsonLd(p: { name: string; description: string; path: string; type?: string; published?: Date; modified?: Date }) {
  return {
    '@context': 'https://schema.org',
    '@type': p.type ?? 'WebPage',
    '@id': `${canonicalFor(p.path)}#webpage`,
    url: canonicalFor(p.path),
    name: p.name,
    description: p.description,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    ...(p.type === 'AboutPage' || p.type === 'ContactPage' ? { mainEntity: { '@id': ORG_ID } } : {}),
    ...(p.published ? { datePublished: p.published.toISOString().slice(0, 10) } : {}),
    ...(p.modified ? { dateModified: p.modified.toISOString().slice(0, 10) } : {}),
  };
}

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

/** The blog index as a Blog with its posts. */
export function blogJsonLd(posts: { slug: string; title: string; description: string; date: Date }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    name: 'Ninja Infosys blog',
    url: canonicalFor('/blog'),
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.date.toISOString().slice(0, 10),
      url: canonicalFor(`/blog/${p.slug}`),
    })),
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
