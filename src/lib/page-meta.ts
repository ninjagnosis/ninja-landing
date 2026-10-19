// Ninja Infosys' own Organization and WebPage data, the page title rule and the
// logo. Self-contained (reads only config/site) so config/kit.ts can import it
// without a cycle through the kit.
import { CERTIFICATIONS, CONTACT_EMAIL, CONTACT_PHONE_JSONLD, LLC, NEPAL, SITE_NAME, SITE_URL } from '../config/site';

const ORG_ID = `${SITE_URL}/#organization`;
const abs = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`);
function canonicalFor(path: string): string {
  let p = (path || '/').split(/[?#]/)[0].toLowerCase();
  p = p.replace(/\.html$/, '').replace(/\/index$/, '/');
  if (p !== '/') p = p.replace(/\/+$/, '');
  if (!p.startsWith('/')) p = `/${p}`;
  return p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}`;
}

/** Titles stay under about 65 characters. The brand is added only when it fits and is not already there. */
export function titleFor(page?: string): string {
  if (!page || page === SITE_NAME) return SITE_NAME;
  if (page.includes('Ninja Infosys')) return page;
  const full = `${page} · ${SITE_NAME}`;
  return full.length <= 65 ? full : page;
}

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

