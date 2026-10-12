// Cloudflare Pages Function: POST /api/contact
// Validates the form, drops honeypot hits, and forwards the message to the
// DCM contact endpoint (the same destination the old site used).
interface Env {
  DCM_API_URL?: string;
  DCM_TENANT_SLUG?: string;
  DCM_CATEGORY_SLUG?: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }

  // Honeypot: report success so bots learn nothing.
  if (str(raw.website, 100)) return json({ success: true });

  const firstName = str(raw.firstName, 50);
  const lastName = str(raw.lastName, 50);
  const email = str(raw.email, 200);
  const message = str(raw.message, 1000);
  if (!firstName || !lastName || !EMAIL.test(email)) return json({ error: 'Invalid form data' }, 400);

  const base = env.DCM_API_URL || 'https://ninjainfosys.app.eshasan.com';
  const tenant = env.DCM_TENANT_SLUG || 'ninjainfosys';
  const category = env.DCM_CATEGORY_SLUG || 'ninjainfosys';
  const note = raw.consent === true ? message || 'N/A' : `${message || 'N/A'}\n\n(Consent not given)`;

  try {
    const res = await fetch(`${base}/api/public/dcm/${category}/contact`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-tenant-slug': tenant },
      body: JSON.stringify({ full_name: `${firstName} ${lastName}`, email, phone_number: null, message: note }),
    });
    if (!res.ok) return json({ error: 'Failed to submit contact form.' }, 502);
    return json({ success: true });
  } catch {
    return json({ error: 'Failed to submit contact form.' }, 502);
  }
};
