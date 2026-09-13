import { ServiceGrid } from '@/components/service-grid';
import { Breadcrumbs, SectionHeading } from '@/components/ui';
import { EngagementNote } from '@/components/engagement-note';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('Our services', 'Explore all eight service areas at Jayavardhan & Co: audit, taxation, GST, accounting, corporate compliance, transfer pricing and FEMA, startup and CFO advisory.', '/services/');
export default function Services() { return <main id="main" tabIndex={-1}><section className="page-intro"><div className="shell"><Breadcrumbs items={[{ label: 'Services' }]}/><SectionHeading as="h1" eyebrow="Our services" title="A clear place to start." description="Explore our areas of practice to find the subject relevant to your business."/></div></section><section className="shell section"><ServiceGrid/><EngagementNote/></section></main>; }
