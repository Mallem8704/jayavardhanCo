import type { Metadata } from 'next';
import { ServiceGrid } from '@/components/service-grid';
import { Breadcrumbs, SectionHeading } from '@/components/ui';
import { EngagementNote } from '@/components/engagement-note';
export const metadata: Metadata = { title: 'Our services', description: 'Explore eight areas of practice at Jayavardhan & Co, from audit and taxation to business advisory.' };
export default function Services() { return <main id="main" tabIndex={-1}><section className="page-intro"><div className="shell"><Breadcrumbs items={[{ label: 'Services' }]}/><SectionHeading as="h1" eyebrow="Our services" title="A clear place to start." description="Explore our areas of practice to find the subject relevant to your business."/></div></section><section className="shell section"><ServiceGrid/><EngagementNote/></section></main>; }
