// The blog index as a Blog with its posts. Self-contained so config/kit.ts can
// import it without a cycle through the kit.
import { SITE_URL } from '../config/site';

const ORG_ID = `${SITE_URL}/#organization`;
const canonicalFor = (path: string) => `${SITE_URL}${path}`;

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

