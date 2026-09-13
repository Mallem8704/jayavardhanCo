import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { services, type Service } from '@/lib/content';
export function ServicePreview({ service, index }: { service: Service; index: number }) { return <Link href={`/services/${service.slug}/`} className="service-entry"><span className="service-number">{String(index + 1).padStart(2, '0')}</span><div><h3>{service.title}</h3><p>{service.summary}</p></div><ArrowUpRight size={20} aria-hidden="true"/></Link>; }
export function ServiceGrid() { return <div className="service-index">{services.map((service, index) => <ServicePreview key={service.slug} {...{ service, index }}/>)}</div>; }
