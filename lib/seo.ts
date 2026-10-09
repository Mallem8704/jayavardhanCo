import type { Metadata } from 'next';
export const productionOrigin = 'https://jayavardhanco.com';
export const isProductionSite = () =>
  process.env.SITE_ENVIRONMENT === 'production' ||
  process.env.VERCEL_ENV === 'production';
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = new URL(path, productionOrigin).toString();
  return { title: { absolute: `${title} | Jayavardhan & Co` }, description, alternates: { canonical: url }, openGraph: { title: `${title} | Jayavardhan & Co`, description, url, siteName: 'Jayavardhan & Co', locale: 'en_IN', type: 'website', images: [{ url: `${productionOrigin}/opengraph-image`, width: 1200, height: 630, alt: 'Jayavardhan & Co — Chartered Accountants' }] }, twitter: { card: 'summary_large_image', title: `${title} | Jayavardhan & Co`, description, images: [`${productionOrigin}/opengraph-image`] } };
}
