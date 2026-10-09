import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui';
import { EngagementNote } from '@/components/engagement-note';
import { services } from '@/lib/content';
import { pageMetadata, productionOrigin } from '@/lib/seo';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export const metadata = pageMetadata(
  'Our services',
  'Explore all eight service areas at Jayavardhan & Co in Hyderabad: audit, taxation, GST, accounting, corporate compliance, transfer pricing and FEMA, startup and CFO advisory.',
  '/services/'
);

const breadcrumbsSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${productionOrigin}/` },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${productionOrigin}/services/` },
  ],
};

export default function Services() {
  return (
    <main id="main" tabIndex={-1} className="bg-[#F5F1E8] text-[#171A18] pb-24 pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbsSchema).replace(/</g, '\\u003c'),
        }}
      />

      {/* Header Banner */}
      <section className="bg-[#082C24] text-[#F5F1E8] py-16 sm:py-24 px-6 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-financial-grid opacity-25 pointer-events-none" aria-hidden="true" />

        <div className="shell max-w-5xl mx-auto relative z-10">
          <div className="mb-8 opacity-80">
            <Breadcrumbs items={[{ label: 'Services' }]} />
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#9DAF9F] font-semibold">
              Areas of Practice
            </span>
          </div>

          <h1 className="font-serif text-3.5xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.12] mb-4 max-w-3xl">
            A clear place to start.
          </h1>

          <p className="text-base sm:text-lg text-[#E8E0D1]/90 max-w-xl font-normal leading-relaxed">
            Explore our eight practice domains to find the framework and regulatory advisory relevant to your business.
          </p>
        </div>
      </section>

      {/* Practice Grid */}
      <section className="shell max-w-6xl mx-auto py-16 sm:py-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            return (
              <article
                key={service.slug}
                className="bg-white border border-[#DDD6C8] hover:border-[#082C24] rounded-2xl p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#DDD6C8] mb-5">
                    <span className="font-mono text-xs text-[#53645A] font-semibold">{num}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                  </div>

                  <h2 className="font-serif text-2xl text-[#082C24] font-normal mb-3 group-hover:text-[#051D18]">
                    {service.title}
                  </h2>

                  <p className="text-xs text-[#53645A] leading-relaxed">
                    {service.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#DDD6C8] flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}/`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#082C24] group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>View Scope</span>
                    <ArrowRight size={14} />
                  </Link>

                  <ArrowUpRight size={16} className="text-[#53645A] group-hover:text-[#082C24]" />
                </div>
              </article>
            );
          })}
        </div>

        <EngagementNote />
      </section>
    </main>
  );
}
