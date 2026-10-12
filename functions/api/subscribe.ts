// Cloudflare Pages Function: POST /api/subscribe
// Adds the address to the newsletter collection in PocketBase.
interface Env {
  PB_URL?: string;
}

const COLLECTION = 'pbc_2371097426';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let email = '';
  try {
    const raw = (await request.json()) as { email?: unknown };
    email = typeof raw.email === 'string' ? raw.email.trim().slice(0, 200) : '';
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }
  if (!EMAIL.test(email)) return json({ error: 'Invalid email address' }, 400);

  const base = env.PB_URL || 'https://cms.ninjainfosys.com';
  try {
    const res = await fetch(`${base}/api/collections/${COLLECTION}/records`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, subscribed_at: new Date().toISOString() }),
    });
    if (res.ok) return json({ success: true });
    const text = await res.text();
    if (res.status === 400 && /unique/i.test(text)) return json({ error: 'You are already subscribed' }, 400);
    return json({ error: 'Could not subscribe' }, 502);
  } catch {
    return json({ error: 'Could not subscribe' }, 502);
  }
};
