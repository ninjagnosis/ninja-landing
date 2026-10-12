// Worker entry for Cloudflare Workers Builds. The site is static (dist/) and
// served as assets; only /api/* runs this code. The two handlers are the same
// functions Cloudflare Pages would run from functions/api, so there is one
// implementation for both hosts.
import { onRequestPost as contact } from '../functions/api/contact';
import { onRequestPost as subscribe } from '../functions/api/subscribe';

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  DCM_API_URL?: string;
  DCM_TENANT_SLUG?: string;
  DCM_CATEGORY_SLUG?: string;
}

const routes: Record<string, (ctx: { request: Request; env: Env }) => Promise<Response> | Response> = {
  '/api/contact': contact as never,
  '/api/subscribe': subscribe as never,
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    const handler = routes[pathname];
    if (!handler) return env.ASSETS.fetch(request);
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { allow: 'POST' } });
    return handler({ request, env });
  },
};
