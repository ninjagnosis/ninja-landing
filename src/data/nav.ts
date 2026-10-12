import { products } from './products';

export const productLinks = products.map((p) => ({ href: `/products/${p.slug}`, label: p.name }));

export const footerColumns = [
  { title: 'Products', links: productLinks },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/locations', label: 'Locations' },
      { href: '/careers', label: 'Careers' },
      { href: '/blog', label: 'Blog' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/terms', label: 'Terms' },
      { href: '/privacy', label: 'Privacy' },
      { href: '/cookies', label: 'Cookies' },
    ],
  },
];
