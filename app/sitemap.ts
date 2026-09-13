import type { MetadataRoute } from 'next';
import { services } from '@/lib/content';
import { productionOrigin } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap { return ['/', '/about/', '/services/', ...services.map(s => `/services/${s.slug}/`), '/contact/', '/privacy/'].map(path => ({ url: `${productionOrigin}${path}` })); }
