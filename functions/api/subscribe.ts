// Cloudflare Pages Function: POST /api/subscribe
// The PocketBase newsletter collection is retired (cms.ninjainfosys.com no
// longer answers), so a subscription is sent to the DCM contact endpoint as a
// message the team can act on. DCM has no unique constraint on email, so
// duplicates are not detected here.
interface Env {
  DCM_API_URL?: string;
  DCM_TENANT_SLUG?: string;
  DCM_CATEGORY_SLUG?: string;
}

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

  const base = env.DCM_API_URL || 'https://ninjainfosys.app.eshasan.com';
  const tenant = env.DCM_TENANT_SLUG || 'ninjainfosys';
  const category = env.DCM_CATEGORY_SLUG || 'ninjainfosys';
  try {
    const res = await fetch(`${base}/api/public/dcm/${category}/contact`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-tenant-slug': tenant },
      body: JSON.stringify({
        full_name: 'Newsletter subscriber',
        email,
        phone_number: null,
        message: 'Newsletter subscription request from the blog page. Add this address to the mailing list.',
      }),
    });
    if (!res.ok) return json({ error: 'Could not subscribe' }, 502);
    return json({ success: true });
  } catch {
    return json({ error: 'Could not subscribe' }, 502);
  }
};
