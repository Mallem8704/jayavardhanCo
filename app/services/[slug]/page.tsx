import { notFound } from 'next/navigation';
import Link from 'next/link';
import { services, serviceDetails } from '@/lib/content';
import { Breadcrumbs, TextLink } from '@/components/ui';
import { EngagementNote } from '@/components/engagement-note';
import { pageMetadata, productionOrigin } from '@/lib/seo';
import { ArrowUpRight, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  return service
    ? pageMetadata(
        `${service.title} in Hyderabad`,
        serviceDetails[slug].introduction,
        `/services/${slug}/`
      )
    : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const serviceIndex = services.findIndex((s) => s.slug === slug);
  const service = services[serviceIndex];
  if (!service) notFound();
  const detail = serviceDetails[slug];
  const serviceNumber = String(serviceIndex + 1).padStart(2, '0');

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${productionOrigin}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${productionOrigin}/services/` },
      { '@type': 'ListItem', position: 3, name: service.title, item: `${productionOrigin}/services/${slug}/` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: detail.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${productionOrigin}/services/${slug}/#service`,
    name: `${service.title} Services in Hyderabad`,
    description: detail.introduction,
    provider: {
      '@id': `${productionOrigin}/#firm`,
    },
    areaServed: [
      { '@type': 'City', name: 'Hyderabad' },
      { '@type': 'AdministrativeArea', name: 'Telangana' },
      { '@type': 'Country', name: 'India' },
    ],
  };

  return (
    <main id="main" tabIndex={-1} className="bg-[#F5F1E8] text-[#171A18] pb-24 lg:pb-16 pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbsSchema, faqSchema, serviceSchema]).replace(/</g, '\\u003c'),
        }}
      />

      {/* SERVICE HERO BANNER */}
      <section className="bg-[#082C24] text-[#F5F1E8] py-16 sm:py-24 px-6 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-financial-grid opacity-25 pointer-events-none" aria-hidden="true" />

        <div className="shell max-w-5xl mx-auto relative z-10">
          <div className="mb-8 opacity-80">
            <Breadcrumbs items={[{ label: 'Services', href: '/services/' }, { label: service.title }]} />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs tracking-widest text-[#C5A880]">
              PRACTICE DOMAIN {serviceNumber}
            </span>
            <span className="text-white/30">&middot;</span>
            <span className="text-xs uppercase tracking-wider text-[#9DAF9F]">
              Hyderabad Practice
            </span>
          </div>

          <h1 className="font-serif text-3.5xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.12] mb-6 max-w-4xl">
            {service.title}
          </h1>

          <p className="text-base sm:text-xl text-[#E8E0D1]/90 max-w-2xl font-normal leading-relaxed">
            {detail.introduction}
          </p>

          <div className="pt-8 flex flex-wrap gap-4">
            <Link
              href={`/contact/?service=${service.slug}`}
              className="min-h-[50px] px-8 py-3.5 rounded-xl bg-[#F5F1E8] text-[#082C24] font-semibold text-xs tracking-wider uppercase hover:bg-white flex items-center gap-2 shadow-lg transition-all"
            >
              <span>Discuss Your Requirements</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE DETAILS GRID */}
      <div className="shell max-w-5xl mx-auto py-16 sm:py-20 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Content (8 cols) */}
          <article className="lg:col-span-8 space-y-12">
            {/* 1. Understanding This Service */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#082C24]" />
                <span className="text-xs uppercase tracking-widest text-[#53645A] font-semibold">
                  Overview
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#082C24] font-normal">
                Understanding this service.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#53645A] leading-relaxed">
                {detail.understanding.map((para, index) => (
                  <div key={index} className="space-y-1">
                    {para.title && (
                      <h3 className="font-serif text-lg text-[#082C24] font-medium">{para.title}</h3>
                    )}
                    <p>{para.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. When You May Need Support */}
            <section className="bg-white border border-[#DDD6C8] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="font-serif text-xl sm:text-2xl text-[#082C24] font-normal">
                When businesses typically need this.
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#171A18]">
                {detail.needs.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#082C24] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 3. What to Discuss With Us */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl text-[#082C24] font-normal">
                What to discuss with us.
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-[#53645A]">
                {detail.discussion.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] flex-shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. Frequently Asked Questions */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl text-[#082C24] font-normal flex items-center gap-2">
                <HelpCircle size={20} className="text-[#53645A]" />
                <span>Frequently asked questions.</span>
              </h2>
              <div className="space-y-3">
                {detail.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group bg-white border border-[#DDD6C8] rounded-xl p-5 open:shadow-sm transition-all"
                  >
                    <summary className="cursor-pointer font-serif text-base sm:text-lg text-[#082C24] font-medium flex items-center justify-between list-none">
                      <span>{faq.question}</span>
                      <ChevronRight
                        size={18}
                        className="text-[#53645A] group-open:rotate-90 transition-transform"
                      />
                    </summary>
                    <p className="text-xs sm:text-sm text-[#53645A] mt-3 leading-relaxed border-t border-[#DDD6C8] pt-3">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <EngagementNote />
          </article>

          {/* Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white border border-[#DDD6C8] rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#53645A]">
                Engagement Discussion
              </span>
              <h3 className="font-serif text-2xl text-[#082C24] font-normal">
                Discuss {service.title.toLowerCase()}.
              </h3>
              <p className="text-xs text-[#53645A] leading-relaxed">
                Tell us a little about the context and relevant timing. Scope and requirements are agreed before work commences.
              </p>
              <Link
                href={`/contact/?service=${service.slug}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#082C24] text-[#F5F1E8] font-semibold text-xs tracking-wider uppercase hover:bg-[#051D18] transition-colors"
              >
                <span>Discuss Your Requirements</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>

            {/* Related Services */}
            <div className="bg-white border border-[#DDD6C8] rounded-2xl p-6 shadow-sm space-y-3">
              <h4 className="text-xs uppercase font-mono tracking-widest text-[#53645A] font-semibold">
                Related Practice Areas
              </h4>
              <ul className="space-y-2 text-xs">
                {detail.related.map((relatedSlug) => {
                  const related = services.find((s) => s.slug === relatedSlug);
                  if (!related) return null;
                  return (
                    <li key={related.slug}>
                      <TextLink href={`/services/${related.slug}/`}>
                        {related.title}
                      </TextLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
