import type { MetadataRoute } from 'next';
import { services } from '@/lib/content';
import { productionOrigin } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
    { path: '/', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/about/', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/services/', changeFrequency: 'weekly', priority: 0.9 },
    ...services.map(s => ({
      path: `/services/${s.slug}/`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    { path: '/contact/', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/privacy/', changeFrequency: 'yearly', priority: 0.3 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${productionOrigin}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}

