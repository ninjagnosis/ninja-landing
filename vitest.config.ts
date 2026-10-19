import { getViteConfig } from 'astro/config';

// Through Astro's config so the site-kit integration's '@site' alias applies.
export default getViteConfig({
  test: { include: ['tests/**/*.test.ts'] },
});
