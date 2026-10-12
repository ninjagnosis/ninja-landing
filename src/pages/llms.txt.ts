import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { products } from '../data/products';
import { published } from '../lib/blog';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, NEPAL_LINE, SITE_URL } from '../config/site';

// Generated from the same data as the pages, so it never drifts.
export async function GET(_: APIContext) {
  const posts = published(await getCollection('blog'));
  const out = [
    '# Ninja Infosys LLC',
    '',
    `> Ninja Infosys LLC builds and runs eShasan, ePahichan, AirFone, LunaIoT and LunaCam, software products built and run in Nepal. ${NEPAL_LINE}`,
    '',
    `- Contact: ${CONTACT_EMAIL}, ${CONTACT_PHONE_DISPLAY}`,
    '',
    '## Products',
    '',
    ...products.map((p) => `- [${p.name}](${SITE_URL}/products/${p.slug}): ${p.short}`),
    '',
    '## Blog',
    '',
    ...(posts.length ? posts.map((p) => `- [${p.data.title}](${SITE_URL}/blog/${p.id}): ${p.data.description}`) : ['- No posts yet']),
    '',
    '## Company',
    '',
    `- [About](${SITE_URL}/about)`,
    `- [Locations](${SITE_URL}/locations)`,
    `- [Careers](${SITE_URL}/careers)`,
    `- [Contact](${SITE_URL}/contact)`,
    `- [Privacy](${SITE_URL}/privacy)`,
    `- [Terms](${SITE_URL}/terms)`,
    '',
  ];
  return new Response(out.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
