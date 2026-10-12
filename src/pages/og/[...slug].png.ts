// One 1200x630 share image per page: the page's title on the Ninja Infosys
// stage with the mark. Built at build time with satori and resvg.
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import satori from 'satori';

// resvg is a native addon. Loading it with require at run time keeps Vite
// from trying to bundle its .node binary (which fails on Linux builders).
const { Resvg } = createRequire(import.meta.url)('@resvg/resvg-js') as typeof import('@resvg/resvg-js');
import { products } from '../../data/products';

const font = (w: number) => readFileSync(`node_modules/@fontsource/poppins/files/poppins-latin-${w}-normal.woff`);
const mark = `data:image/png;base64,${readFileSync('public/brand/ninja-mark-192.png').toString('base64')}`;

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  const pages: { slug: string; title: string }[] = [
    { slug: 'index', title: 'Ninja Infosys LLC, the holding company behind five products' },
    { slug: 'about', title: 'About Ninja Infosys LLC' },
    { slug: 'locations', title: 'Locations' },
    { slug: 'careers', title: 'Careers' },
    { slug: 'contact', title: 'Contact Ninja Infosys LLC' },
    { slug: 'products', title: 'Products' },
    { slug: 'blog', title: 'Ninja Infosys blog' },
    { slug: 'terms', title: 'Terms of service' },
    { slug: 'privacy', title: 'Privacy policy' },
    { slug: 'cookies', title: 'Cookie policy' },
    { slug: '404', title: 'Page not found' },
    ...products.map((p) => ({ slug: `products/${p.slug}`, title: p.headline })),
    ...posts.map((p) => ({ slug: `blog/${p.id}`, title: p.data.title })),
    ...[...new Set(posts.flatMap((p) => p.data.tags))].map((t) => ({ slug: `blog/tag/${t}`, title: `${t.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase())} posts` })),
  ];
  const n = Math.ceil(posts.length / 10);
  for (let i = 2; i <= n; i++) pages.push({ slug: `blog/page/${i}`, title: `Ninja Infosys blog, page ${i}` });
  return pages.map((p) => ({ params: { slug: p.slug }, props: { title: p.title } }));
}

export async function GET({ props }: APIContext) {
  const { title } = props as { title: string };
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: { width: 1200, height: 630, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#0B1F4D', color: '#FFFFFF', fontFamily: 'Poppins' },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', alignItems: 'center', gap: 20 },
              children: [
                { type: 'div', props: { style: { display: 'flex', background: '#FFFFFF', borderRadius: 20, padding: 14 }, children: [{ type: 'img', props: { src: mark, width: 80, height: 80 } }] } },
                { type: 'div', props: { style: { fontSize: 40, fontWeight: 600 }, children: 'Ninja Infosys LLC' } },
              ],
            },
          },
          { type: 'div', props: { style: { fontSize: title.length > 40 ? 64 : 80, fontWeight: 600, lineHeight: 1.1, maxWidth: 1000 }, children: title } },
          { type: 'div', props: { style: { fontSize: 30, color: '#C9D6F0' }, children: 'ninjainfosys.com' } },
        ],
      },
    },
    { width: 1200, height: 630, fonts: [{ name: 'Poppins', data: font(400), weight: 400 }, { name: 'Poppins', data: font(600), weight: 600 }] },
  );
  const png = new Resvg(svg).render().asPng();
  return new Response(png, { headers: { 'content-type': 'image/png' } });
}
