import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services } from '@/lib/content';
import { Breadcrumbs, ButtonLink, SectionHeading, TextLink } from '@/components/ui';
import { EngagementNote } from '@/components/engagement-note';
export const dynamicParams = false;
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const service = services.find(s => s.slug === slug); return { title: service?.title ?? 'Service not found', description: service?.summary }; }
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = services.find(s => s.slug === slug); if (!service) notFound();
  return <main id="main" tabIndex={-1}><section className="page-intro"><div className="shell"><Breadcrumbs items={[{ label: 'Services', href: '/services/' }, { label: service.title }]}/><SectionHeading as="h1" eyebrow="Area of practice" title={service.title} description={service.summary}/></div></section><section className="shell section detail-grid"><article><SectionHeading eyebrow="Understanding the area" title="Start with the context."/><p className="detail-copy">{service.context}</p><EngagementNote/><ButtonLink href="/contact/">Discuss Your Requirements</ButtonLink></article><aside className="related"><h2>Other areas of practice</h2>{services.filter(s => s.slug !== slug).map(s => <TextLink href={`/services/${s.slug}/`} key={s.slug}>{s.title}</TextLink>)}</aside></section></main>;
}
