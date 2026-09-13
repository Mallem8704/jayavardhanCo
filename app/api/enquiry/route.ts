import { createEnquiryHandler, deliveryConfig } from '@/lib/server/enquiry';
export const runtime = 'nodejs';
// Exact deployment domains from trusted server configuration, never request headers.
const trustedOrigins = process.env.VERCEL ? [process.env.VERCEL_PROJECT_PRODUCTION_URL, process.env.VERCEL_URL]
  .filter((host): host is string => Boolean(host && /^[a-z0-9-]+\.vercel\.app$/i.test(host)))
  .map(host => `https://${host}`) : [];
export const POST = createEnquiryHandler({ config: deliveryConfig, allowLocal: process.env.NODE_ENV === 'development', trustedOrigins });
