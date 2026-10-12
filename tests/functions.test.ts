import { afterEach, describe, expect, it, vi } from 'vitest';
import { onRequestPost as contact } from '../functions/api/contact';
import { onRequestPost as subscribe } from '../functions/api/subscribe';

const req = (body: unknown) => new Request('https://x.test/api', { method: 'POST', body: typeof body === 'string' ? body : JSON.stringify(body) });
const call = (fn: any, body: unknown, env: Record<string, string> = {}) => fn({ request: req(body), env });
const good = { firstName: 'Sita', lastName: 'Sharma', email: 'sita@example.com', message: 'Hello', consent: true, website: '' };

afterEach(() => vi.unstubAllGlobals());

describe('POST /api/contact', () => {
  it('forwards a valid message to DCM with the tenant header', async () => {
    const f = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', f);
    const res = await call(contact, good, { DCM_API_URL: 'https://dcm.test', DCM_TENANT_SLUG: 't', DCM_CATEGORY_SLUG: 'c' });
    expect(res.status).toBe(200);
    const [url, init] = f.mock.calls[0];
    expect(url).toBe('https://dcm.test/api/public/dcm/c/contact');
    expect(init.headers['x-tenant-slug']).toBe('t');
    expect(JSON.parse(init.body)).toMatchObject({ full_name: 'Sita Sharma', email: 'sita@example.com', message: 'Hello' });
  });
  it('notes missing consent in the message', async () => {
    const f = vi.fn().mockResolvedValue(new Response('{}'));
    vi.stubGlobal('fetch', f);
    await call(contact, { ...good, consent: false });
    expect(JSON.parse(f.mock.calls[0][1].body).message).toContain('Consent not given');
  });
  it('drops honeypot hits without calling DCM', async () => {
    const f = vi.fn();
    vi.stubGlobal('fetch', f);
    const res = await call(contact, { ...good, website: 'spam' });
    expect(res.status).toBe(200);
    expect(f).not.toHaveBeenCalled();
  });
  it('rejects invalid data and bad JSON', async () => {
    vi.stubGlobal('fetch', vi.fn());
    expect((await call(contact, { ...good, email: 'nope' })).status).toBe(400);
    expect((await call(contact, { ...good, firstName: '' })).status).toBe(400);
    expect((await call(contact, '{not json')).status).toBe(400);
  });
  it('returns 502 when DCM fails or is unreachable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('no', { status: 500 })));
    expect((await call(contact, good)).status).toBe(502);
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('down')));
    expect((await call(contact, good)).status).toBe(502);
  });
});

describe('POST /api/subscribe', () => {
  it('creates a PocketBase record', async () => {
    const f = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', f);
    const res = await call(subscribe, { email: 'a@b.co' }, { PB_URL: 'https://pb.test' });
    expect(res.status).toBe(200);
    expect(f.mock.calls[0][0]).toBe('https://pb.test/api/collections/pbc_2371097426/records');
  });
  it('reports a duplicate address', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{"email":{"code":"validation_not_unique"}}', { status: 400 })));
    const res = await call(subscribe, { email: 'a@b.co' });
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/already/);
  });
  it('rejects a bad address', async () => {
    vi.stubGlobal('fetch', vi.fn());
    expect((await call(subscribe, { email: 'x' })).status).toBe(400);
  });
});
