// What the site-kit package reads from this site beyond the constants in
// config/site.ts: header, share cards, llms.txt and blog wording. The footer is
// the site's own (layouts/Base.astro passes it to the kit's footer slot).
import type { SiteKit } from '@ninjainfosys/site-kit/contract';
import fontGeist from '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url';
import fontManrope from '@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2?url';
import { products } from '../data/products';
import { asocio, awards } from '../data/media';
import { blogJsonLd } from '../lib/blog-jsonld';
import { orgJsonLd, titleFor, webPageJsonLd } from '../lib/page-meta';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, NEPAL_LINE, SITE_URL } from './site';

export const kit: SiteKit = {
  blog: {
    label: 'Blog',
    name: 'Ninja Infosys blog',
    indexTitle: 'Blog: strategy, management and productivity',
    indexPageType: 'CollectionPage',
    indexJsonLd: (posts) => [blogJsonLd(posts)],
    description: 'Notes from Ninja Infosys LLC on strategy, management and productivity: how a company with several software products chooses what to build and what to stop.',
    rssDescription: 'Notes on strategy, management and productivity from Ninja Infosys LLC.',
    pageDescription: (n, last) => `Older posts from Ninja Infosys LLC on strategy, management and productivity for a company with several software products. Page ${n} of ${last}.`,
    tagDescription: (label) => `Ninja Infosys LLC posts about ${label.toLowerCase()}: how a company with several software products thinks about it and acts on it.`,
    tagNoun: 'posts',
    related: { products: 'Products in this post', industries: 'Industries', more: 'More posts' },
    imageCredit: 'Ninja Infosys',
  },
  seo: {
    hreflang: 'en',
    ogLocale: 'en_US',
    logo: '/brand/ninja-mark-512.png',
    orgJsonLd,
    titleFor,
    webPage: webPageJsonLd,
    author: 'Ninja Infosys LLC',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },
  head: {
    preloadFonts: [fontGeist, fontManrope],
    icons: [
      { rel: 'icon', href: '/brand/ninja-mark-64.png', type: 'image/png' },
      { rel: 'icon', href: '/brand/ninja-mark-32.png', sizes: '32x32', type: 'image/png' },
      { rel: 'apple-touch-icon', href: '/brand/ninja-mark-192.png' },
    ],
  },
  header: {
    homeLabel: 'Ninja Infosys LLC home',
    logo: { kind: 'mark', light: '/brand/ninja-mark-64.png', dark: '', alt: '', width: 40, height: 40, text: 'Ninja Infosys' },
    utility: {
      lead: { href: CONTACT_PHONE_TEL, text: CONTACT_PHONE_DISPLAY },
      label: 'Product sites',
      joined: true,
      links: products.map((p) => ({ href: p.url, label: p.name })),
    },
    groups: [
      {
        id: 'products',
        label: 'Products',
        base: '/products',
        links: products.map((p) => ({ href: `/products/${p.slug}`, label: p.name, logo: p.logo })),
        feature: { title: 'Notes on strategy and management', href: '/blog', cta: 'Read the blog' },
      },
    ],
    plain: [
      { href: '/about', label: 'About' },
      { href: '/media', label: 'Media' },
      { href: '/blog', label: 'Blog' },
      { href: '/careers', label: 'Careers' },
      { href: '/contact', label: 'Contact' },
    ],
    action: { href: '/contact', label: 'Contact us' },
    mobileLinks: [
      { href: '/locations', label: 'Locations' },
      { href: '/privacy', label: 'Privacy' },
    ],
    mobileCall: { href: CONTACT_PHONE_TEL, label: 'Call us' },
  },
  cta: {
    heading: 'Get in touch',
    actions: [
      { href: '/contact', label: 'Contact us', class: 'btn-light' },
      { href: '/blog', label: 'Read the blog', class: 'btn-secondary' },
    ],
  },
  og: {
    background: '#0B1F4D',
    ink: '#FFFFFF',
    muted: '#C9D6F0',
    name: { text: 'Ninja Infosys LLC', size: 40, weight: 600 },
    mark: { file: 'brand/ninja-mark-192.png', png: true, width: 80, height: 80, plate: { background: '#FFFFFF', radius: 20, padding: 14 } },
    pages: () => [
      { slug: 'index', title: 'Ninja Infosys LLC' },
      { slug: 'about', title: 'About Ninja Infosys LLC' },
      { slug: 'locations', title: 'Locations' },
      { slug: 'careers', title: 'Careers' },
      { slug: 'media', title: 'ASOCIO Digital Government Award 2025' },
      { slug: 'contact', title: 'Contact Ninja Infosys LLC' },
      { slug: 'products', title: 'Products' },
      { slug: 'blog', title: 'Ninja Infosys blog' },
      { slug: 'terms', title: 'Terms of service' },
      { slug: 'privacy', title: 'Privacy policy' },
      { slug: 'cookies', title: 'Cookie policy' },
      { slug: '404', title: 'Page not found' },
      ...products.map((p) => ({ slug: `products/${p.slug}`, title: p.headline })),
    ],
  },
  llms: {
    description: `Ninja Infosys LLC builds and runs eShasan, ePahichan, AirFone, LunaIoT and LunaCam, software products. ${NEPAL_LINE}`,
    facts: [`- Contact: ${CONTACT_EMAIL}, ${CONTACT_PHONE_DISPLAY}`],
    before: () => [
      { title: 'Products', items: products.map((p) => `- [${p.name}](${SITE_URL}/products/${p.slug}): ${p.short}`) },
      { title: 'Certification', items: ['- ISO 9001:2015, quality management systems'] },
      { title: 'Awards', items: [`- ${asocio.name}, ${asocio.date}, ${asocio.place}. [Media](${SITE_URL}/media)`, ...awards.map((a) => `- ${a.year}: ${a.name}, ${a.by}`)] },
    ],
    after: () => [
      {
        title: 'Company',
        items: [
          `- [About](${SITE_URL}/about)`,
          `- [Locations](${SITE_URL}/locations)`,
          `- [Media: awards and press](${SITE_URL}/media)`,
          `- [Careers](${SITE_URL}/careers)`,
          `- [Contact](${SITE_URL}/contact)`,
          `- [Privacy](${SITE_URL}/privacy)`,
          `- [Terms](${SITE_URL}/terms)`,
        ],
      },
    ],
  },
};
