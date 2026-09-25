import type { APIRoute } from 'astro';
import { SHOW_PENDING } from '../lib/pending';

export const GET: APIRoute = ({ site }) => {
  const body = SHOW_PENDING
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
