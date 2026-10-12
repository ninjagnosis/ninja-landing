#!/usr/bin/env node
// Pulls the leadership and team lists from DCM at build time and writes
// src/data/people.generated.json plus the photos into public/people/.
//
// DCM file URLs are presigned and expire in 15 minutes, so photos are
// downloaded here and the page references the local copy.
//
// Never fails the build: if DCM is down or returns nothing, the existing
// snapshot (committed) stays and the site falls back to src/data/people.ts.
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';

const BASE = process.env.DCM_API_URL || 'https://ninjainfosys.app.eshasan.com';
const TENANT = process.env.DCM_TENANT_SLUG || 'ninjainfosys';
const CATEGORY = process.env.DCM_CATEGORY_SLUG || 'ninjainfosys';
const OUT = 'src/data/people.generated.json';
const PHOTOS = 'public/people';
// Leadership order is pinned; anyone not listed follows in DCM's order.
const LEADERSHIP_ORDER = ['ramesh', 'trilochan', 'kritisha', 'nabin'];
const LINKEDIN = /https?:\/\/(?:[\w-]+\.)?linkedin\.com\/\S+/i;

async function api(path) {
  const res = await fetch(`${BASE}/api/public/dcm/${CATEGORY}/${path}`, { headers: { 'X-Tenant-Slug': TENANT }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`${path} ${res.status}`);
  const json = await res.json();
  return json?.data ?? null;
}

/** First line of a DCM description is the role, the rest is the bio. DCM has no role field. */
function split(text) {
  const t = (text ?? '').trim();
  const i = t.indexOf('\n');
  return i === -1 ? { role: t, bio: '' } : { role: t.slice(0, i).trim(), bio: t.slice(i + 1).trim() };
}

function pullLinkedIn(text) {
  if (!text) return { text: '', url: undefined };
  const lines = text.split('\n');
  const line = lines.find((l) => LINKEDIN.test(l));
  return line ? { text: lines.filter((l) => l !== line).join('\n'), url: line.match(LINKEDIN)[0] } : { text, url: undefined };
}

async function photo(slug, url) {
  if (!url) return undefined;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) return undefined;
    const type = res.headers.get('content-type') || '';
    const ext = type.includes('png') ? '.png' : type.includes('webp') ? '.webp' : type.includes('jpeg') || type.includes('jpg') ? '.jpg' : extname(new URL(url).pathname) || '.jpg';
    mkdirSync(PHOTOS, { recursive: true });
    writeFileSync(join(PHOTOS, `${slug}${ext}`), Buffer.from(await res.arrayBuffer()));
    return `/people/${slug}${ext}`;
  } catch {
    return undefined;
  }
}

async function list(contentSlug) {
  const data = await api(contentSlug);
  const items = data?.items ?? [];
  const out = [];
  for (const it of items) {
    let detail = it;
    try { detail = (await api(`${contentSlug}/${it.slug}`))?.item ?? it; } catch { /* keep list item */ }
    const en = pullLinkedIn(detail.eng_description ?? detail.description);
    const { role, bio } = split(en.text);
    out.push({
      slug: it.slug,
      name: (detail.eng_name || detail.name || '').trim(),
      role,
      bio,
      linkedin: en.url,
      photo: await photo(it.slug, detail.files?.[0]?.file_url),
    });
  }
  return out.filter((p) => p.name);
}

try {
  const leadershipRaw = await list('leadership');
  const rank = (s) => { const i = LEADERSHIP_ORDER.indexOf(s); return i === -1 ? 99 : i; };
  const leadership = leadershipRaw.sort((a, b) => rank(a.slug) - rank(b.slug));
  const taken = new Set(leadership.map((p) => p.slug));
  const team = (await list('team')).filter((p) => !taken.has(p.slug));
  if (!leadership.length && !team.length) throw new Error('DCM returned no people');
  writeFileSync(OUT, JSON.stringify({ fetchedAt: new Date().toISOString(), leadership, team }, null, 2) + '\n');
  console.log(`people: ${leadership.length} leadership, ${team.length} team from DCM`);
} catch (err) {
  const kept = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : null;
  console.warn(`people: DCM not used (${err.message}). ${kept ? `Keeping snapshot from ${kept.fetchedAt}.` : 'Using src/data/people.ts.'}`);
}
