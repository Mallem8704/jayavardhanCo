import { Hero } from '@/components/hero';
import { CredibilityStrip } from '@/components/credibility-strip';
import { BrandStatement } from '@/components/brand-statement';
import { ServicesCarousel } from '@/components/services-carousel';
import { DecisionInterface } from '@/components/decision-interface';
import { ProcessTimeline } from '@/components/process-timeline';
import { EditorialAbout } from '@/components/editorial-about';
import { VirtualCfoFeature } from '@/components/virtual-cfo-feature';
import { StartupAdvisoryFeature } from '@/components/startup-advisory-feature';
import { InsightsPreview } from '@/components/insights-preview';
import { ContactCta } from '@/components/contact-cta';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Chartered Accountants in Hyderabad',
  'Audit, tax, compliance and financial advisory from Jayavardhan & Co. Explore eight service areas and discuss your requirements.',
  '/'
);

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="overflow-x-hidden">
      {/* 01: Cinematic Mobile Hero */}
      <Hero />

      {/* Trust & Credibility Marquee Strip */}
      <CredibilityStrip />

      {/* 02: Full-screen Editorial Brand Statement */}
      <BrandStatement />

      {/* 03: Swipeable Mobile Practice Areas Carousel + Bottom Sheet */}
      <ServicesCarousel />

      {/* 04: Interactive Decision Interface ("Where should we begin?") */}
      <DecisionInterface />

      {/* 05: Scroll-Driven Engagement Process Timeline */}
      <ProcessTimeline />

      {/* 06: Editorial About Storytelling */}
      <EditorialAbout />

      {/* 07: Dedicated Virtual CFO Financial Dashboard Feature */}
      <VirtualCfoFeature />

      {/* 08: Dedicated Startup Advisory Milestone Feature */}
      <StartupAdvisoryFeature />

      {/* 09: Regulatory Perspectives & Educational Insights */}
      <InsightsPreview />

      {/* 10: Premium Contact CTA Section */}
      <ContactCta />
    </main>
  );
}
