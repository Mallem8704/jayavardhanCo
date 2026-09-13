import type { NextConfig } from 'next';
const productionSite = process.env.SITE_ENVIRONMENT === 'production';
const csp = ["default-src 'self'", "script-src 'self' 'unsafe-inline'" + (process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''), "style-src 'self' 'unsafe-inline'", "img-src 'self' data:", "font-src 'self'", "connect-src 'self'", "object-src 'none'", "base-uri 'self'", "form-action 'self'", "frame-ancestors 'none'"].join('; ');
const config: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  async headers() { return [{ source: '/:path*', headers: [
    { key: 'Content-Security-Policy', value: csp },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
    ...(productionSite ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000' }] : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }]),
  ] }]; },
};
export default config;
