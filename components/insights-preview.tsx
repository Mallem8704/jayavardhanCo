import Link from 'next/link';
import { ArrowUpRight, Clock, BookOpen } from 'lucide-react';

const articles = [
  {
    category: 'GST COMPLIANCE',
    title: 'Input Tax Credit Reconciliations Under Rule 36(4)',
    intro: 'How monthly GSTR-2B matching prevents departmental notices, interest liabilities, and disallowed tax credits.',
    readTime: '4 min read',
    slug: 'gst',
  },
  {
    category: 'DIRECT TAXATION',
    title: 'Advance Tax Timelines & Section 115BAA Provisions',
    intro: 'Key considerations for domestic corporations evaluating the 22% reduced corporate income tax regime.',
    readTime: '5 min read',
    slug: 'taxation',
  },
  {
    category: 'CROSS-BORDER FEMA',
    title: 'Inbound FDI Reporting via RBI FIRMS & Form FC-GPR',
    intro: 'Essential compliance steps for private limited companies receiving foreign direct investment from international investors.',
    readTime: '6 min read',
    slug: 'transfer-pricing-fema',
  },
  {
    category: 'CORPORATE COMPLIANCE',
    title: 'Annual MCA Filing Checklist for Private Limited Entities',
    intro: 'Director disclosures, statutory registers, AOC-4 financial filings, and MGT-7 requirements under the Companies Act.',
    readTime: '4 min read',
    slug: 'corporate-compliance',
  },
  {
    category: 'STARTUP FINANCE',
    title: 'DPIIT Recognition & Section 56(2)(viib) Exemption',
    intro: 'Understanding startup tax exemption criteria, founder cap table hygiene, and investor issuance valuations.',
    readTime: '5 min read',
    slug: 'startup-advisory',
  },
];

export function InsightsPreview() {
  return (
    <section className="py-20 sm:py-28 bg-[#F5F1E8] text-[#171A18] border-b border-[#DDD6C8]" aria-labelledby="insights-title">
      <div className="shell max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#082C24]" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#53645A] font-semibold">
                Regulatory Perspectives
              </span>
            </div>
            <h2 id="insights-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-[#082C24]">
              Clear insights on complex rules.
            </h2>
            <p className="text-base sm:text-lg text-[#53645A] mt-3 font-normal leading-relaxed">
              Concise professional updates and regulatory guides to help businesses anticipate statutory obligations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#53645A]">
            <BookOpen size={15} />
            <span>ICAI COMPLIANT EDITORIAL</span>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl bg-white border border-[#DDD6C8] p-7 flex flex-col justify-between shadow-sm hover:border-[#082C24] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#DDD6C8] mb-4 text-xs font-mono text-[#53645A]">
                  <span className="text-[#C5A880] font-bold text-[10px] tracking-wider uppercase">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-[#53645A]">
                    <Clock size={12} />
                    {item.readTime}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-normal text-[#082C24] mb-3 leading-snug group-hover:text-[#051D18]">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#53645A] leading-relaxed font-normal">
                  {item.intro}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#DDD6C8]">
                <Link
                  href={`/services/${item.slug}/`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#082C24] hover:underline"
                >
                  <span>Explore Associated Scope</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
