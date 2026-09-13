import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { services, type Service } from '@/lib/content';
export function ServicePreview({ service, index }: { service: Service; index: number }) { return <Link href={`/services/${service.slug}/`} className="service-card"><div className="card-top"><span className="service-number">{String(index + 1).padStart(2, '0')}</span><span className="card-rule" aria-hidden="true"/></div><h3>{service.title}</h3><p>{service.summary}</p><span className="card-link">Explore this area <ArrowUpRight size={17} aria-hidden="true"/></span></Link>; }
export function ServiceGrid() { return <div className="service-grid">{services.map((service, index) => <ServicePreview key={service.slug} {...{ service, index }}/>)}</div>; }
