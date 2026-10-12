import { describe, expect, it, vi } from 'vitest';
import worker from '../worker/index';

const env = { ASSETS: { fetch: vi.fn().mockResolvedValue(new Response('asset', { status: 200 })) } };
const post = (path: string, body: unknown) => new Request(`https://x.test${path}`, { method: 'POST', body: JSON.stringify(body) });

describe('worker', () => {
  it('serves everything outside /api from assets', async () => {
    const res = await worker.fetch(new Request('https://x.test/about'), env);
    expect(await res.text()).toBe('asset');
  });
  it('only accepts POST on the form endpoints', async () => {
    const res = await worker.fetch(new Request('https://x.test/api/contact'), env);
    expect(res.status).toBe(405);
  });
  it('routes /api/contact and validates', async () => {
    const res = await worker.fetch(post('/api/contact', { firstName: '', lastName: '', email: 'x' }), env);
    expect(res.status).toBe(400);
  });
  it('routes /api/subscribe and validates', async () => {
    const res = await worker.fetch(post('/api/subscribe', { email: 'nope' }), env);
    expect(res.status).toBe(400);
  });
});
