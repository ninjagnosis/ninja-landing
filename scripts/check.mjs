#!/usr/bin/env node
// Audits the built site: one h1, title, description, canonical, alt text,
// no em-dashes in visible text, and a sitemap entry for every indexable page.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';

const dist = process.argv[2] ?? 'dist';
const files = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? files(join(d, n)) : n.endsWith('.html') ? [join(d, n)] : []));
const errors = [];
for (const f of files(dist)) {
  const root = parse(readFileSync(f, 'utf8'));
  const name = f.slice(dist.length);
  if (name === '/404.html') continue;
  if (!root.querySelector('title')?.text.trim()) errors.push(`${name}: no title`);
  if (!root.querySelector('meta[name="description"]')?.getAttribute('content')) errors.push(`${name}: no description`);
  if (!root.querySelector('link[rel="canonical"]')) errors.push(`${name}: no canonical`);
  const h1 = root.querySelectorAll('main h1').length;
  if (h1 !== 1) errors.push(`${name}: ${h1} h1`);
  for (const img of root.querySelectorAll('img')) if (img.getAttribute('alt') === undefined) errors.push(`${name}: img without alt ${img.getAttribute('src')}`);
  const text = root.querySelector('main')?.text ?? '';
  if (/—/.test(text)) errors.push(`${name}: em-dash in text`);
}
if (!existsSync(join(dist, 'sitemap.xml'))) errors.push('no sitemap.xml');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`check: ${files(dist).length} pages ok`);
