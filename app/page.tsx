import { ServiceGrid } from '@/components/service-grid';
import { SectionHeading, ButtonLink, TextLink } from '@/components/ui';
import { Hero } from '@/components/hero';
import { firm, services, visitorNeeds } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('Chartered Accountants', 'Audit, tax, compliance and financial advisory from Jayavardhan & Co. Explore eight service areas and discuss your requirements.', '/');
export default function Home() {
  return <main id="main" tabIndex={-1}>
    <Hero/>
    <section className="section shell" id="services"><SectionHeading eyebrow="Our areas of practice" title="Expertise for your financial and business requirements."/><ServiceGrid/></section>
    <section className="needs-section"><div className="shell needs-layout"><SectionHeading eyebrow="Find your starting point" title="What would you like help with?"/><ul className="needs-list">{visitorNeeds.map(([need, slug]) => <li key={slug}><span>{need}</span><TextLink href={`/services/${slug}/`}>{services.find(s => s.slug === slug)!.title}</TextLink></li>)}</ul></div></section>
    <section className="section shell conversation"><SectionHeading eyebrow="Starting a conversation" title="A clearer starting point." description="A little context helps frame an enquiry. Here are three things to consider before a discussion."/><ol className="conversation-steps"><li><span>01</span><h3>Tell us about your business.</h3><p>Describe your activities and the circumstances relevant to your enquiry.</p></li><li><span>02</span><h3>Identify the matter you need help with.</h3><p>Outline your questions and any timing considerations.</p></li><li><span>03</span><h3>Discuss the scope and next steps.</h3><p>Any engagement needs an agreed scope and consideration of applicable professional requirements.</p></li></ol></section>
    <section className="about-preview"><div className="shell about-preview-grid"><p className="eyebrow">About the firm</p><div><h2>{firm.name}</h2><p>Jayavardhan & Co is a Chartered Accountancy firm with an office in Hyderabad. Its areas of practice span audit and assurance, taxation, GST, accounting and bookkeeping, corporate compliance, transfer pricing and FEMA, startup advisory, and virtual CFO and business advisory.</p><TextLink href="/about/">About Jayavardhan & Co</TextLink></div></div></section>
    <section className="contact-invitation"><div className="shell"><SectionHeading title="Let’s discuss your requirements." description="Share a brief overview of your business and the support you are looking for."/><ButtonLink href="/contact/" variant="light">Contact Jayavardhan & Co</ButtonLink></div></section>
  </main>;
}
