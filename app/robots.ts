import type { MetadataRoute } from 'next';
import { isProductionSite, productionOrigin } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return isProductionSite()
    ? {
        rules: [
          {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/'],
          },
          {
            userAgent: 'bingbot',
            allow: '/',
            disallow: ['/api/'],
          },
        ],
        sitemap: `${productionOrigin}/sitemap.xml`,
      }
    : {
        rules: {
          userAgent: '*',
          disallow: '/',
        },
      };
}
