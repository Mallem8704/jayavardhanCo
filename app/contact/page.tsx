import { Breadcrumbs, SectionHeading } from '@/components/ui';
import { ContactDetails } from '@/components/footer';
import { EnquiryForm } from '@/components/enquiry-form';
import { professional } from '@/lib/content';
import { preselectedService } from '@/lib/enquiry-validation';
import { deliveryConfig } from '@/lib/server/enquiry';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('Contact', 'Contact Jayavardhan & Co in Hyderabad. Tell us about your business and the service you would like to discuss.', '/contact/');
export const dynamic = 'force-dynamic';
export default async function Contact({ searchParams }: { searchParams: Promise<{ service?: string | string[] }> }) { const query = await searchParams; return <main id="main" tabIndex={-1}><section className="page-intro"><div className="shell"><Breadcrumbs items={[{ label: 'Contact' }]}/><SectionHeading as="h1" eyebrow="Start a conversation" title="Tell us what you need help with." description="Share a brief overview of your business and the support you are looking for."/></div></section><section className="section shell contact-layout"><EnquiryForm key={preselectedService(query.service)} initialService={preselectedService(query.service)} available={Boolean(deliveryConfig())}/><aside className="contact-card"><p className="eyebrow">Contact the firm</p><h2>Jayavardhan & Co</h2><p className="contact-name">{professional.name}<span>{professional.designation}</span></p><ContactDetails/><p className="contact-scope">An enquiry does not establish a professional engagement. Scope, acceptance and applicable independence requirements need to be considered separately.</p></aside></section></main>; }
