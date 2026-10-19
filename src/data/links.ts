import { products } from './products';

export interface Link { href: string; label: string; meta?: string }

/** Products a post is about, from its tags. */
export const productsForTags = (tags: string[]): Link[] =>
  products.filter((p) => p.tags.some((t) => tags.includes(t))).map((p) => ({ href: `/products/${p.slug}`, label: p.name }));

/** Industries a post is about. The group sells no industry packages, so there are none. */
export const solutionsForTags = (_tags: string[]): Link[] => [];
