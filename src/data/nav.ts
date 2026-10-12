import { products } from './products';
import { href, ui, type Lang } from '../lib/i18n';

export const productLinks = products.map((p) => ({ href: `/products/${p.slug}`, label: p.name }));

export const footerColumns = (lang: Lang) => {
  const f = ui[lang].footer;
  const T = ui[lang];
  return [
    { title: f.products, links: products.map((p) => ({ href: href(lang, `/products/${p.slug}`), label: p.name })) },
    {
      title: f.company,
      links: [
        { href: href(lang, '/about'), label: T.about },
        { href: href(lang, '/locations'), label: T.locations },
        { href: href(lang, '/careers'), label: T.careers },
        { href: '/blog', label: T.blog },
        { href: href(lang, '/contact'), label: T.contact },
      ],
    },
    {
      title: f.legal,
      links: [
        { href: '/terms', label: f.terms },
        { href: '/privacy', label: f.privacy },
        { href: '/cookies', label: f.cookies },
      ],
    },
  ];
};
