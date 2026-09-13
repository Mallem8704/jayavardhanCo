import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { services, engagement } from '@/lib/content';
export const dynamicParams = false;
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const service = services.find(s => s.slug === slug); return { title: service?.title ?? 'Service not found', description: service?.summary }; }
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = services.find(s => s.slug === slug); if (!service) notFound();
  return <main id="main"><section className="page-intro"><div className="shell"><Link className="back-link" href="/services/"><ArrowLeft size={16}/> All services</Link><p className="eyebrow">Area of practice</p><h1>{service.title}</h1><p>{service.summary}</p></div></section><section className="shell section detail-grid"><article><p className="eyebrow">Understanding the area</p><h2>Start with the context.</h2><p className="detail-copy">{service.context}</p><aside className="scope-note"><h2>{engagement.title}</h2><p>{engagement.description}</p></aside></article><aside className="related"><h2>Other areas of practice</h2>{services.filter(s => s.slug !== slug).map(s => <Link href={`/services/${s.slug}/`} key={s.slug}>{s.title}<ArrowUpRight size={16}/></Link>)}</aside></section></main>;
}
