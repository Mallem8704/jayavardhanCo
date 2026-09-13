import Link from 'next/link';
import { ArrowUpRight, BookOpen, ChartNoAxesCombined, FileCheck2, Globe2, Landmark, ReceiptText, Rocket, ShieldCheck } from 'lucide-react';
import { services } from '@/lib/content';
const icons = [ShieldCheck, Landmark, ReceiptText, BookOpen, FileCheck2, Globe2, Rocket, ChartNoAxesCombined];
export function ServiceGrid() {
  return <div className="service-grid">{services.map((service, i) => { const Icon = icons[i]; return <Link href={`/services/${service.slug}/`} key={service.slug} className="service-card"><div className="card-top"><Icon size={25} strokeWidth={1.4}/><span>0{i + 1}</span></div><h3>{service.title}</h3><p>{service.summary}</p><span className="card-link">Explore this area <ArrowUpRight size={17}/></span></Link>; })}</div>;
}
