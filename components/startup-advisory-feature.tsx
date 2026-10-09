import Link from 'next/link';
import { ArrowRight, ArrowDown } from 'lucide-react';

const roadmap = [
  {
    step: '01',
    phase: 'IDEA',
    title: 'Model & Structure',
    desc: 'Evaluating entity options, co-founder equity alignment, and capital requirements.',
  },
  {
    step: '02',
    phase: 'ENTITY',
    title: 'Incorporation',
    desc: 'Company registration (Pvt Ltd / LLP), SPICe+ MCA filing, and statutory documentation.',
  },
  {
    step: '03',
    phase: 'COMPLIANCE',
    title: 'Statutory Base',
    desc: 'GST registration, PAN/TAN, DPIIT startup tax exemptions, and initial banking protocols.',
  },
  {
    step: '04',
    phase: 'FINANCE',
    title: 'Financial Systems',
    desc: 'Cloud ledger setup, ESOP scheme architecture, and audit-ready bookkeeping.',
  },
  {
    step: '05',
    phase: 'GROWTH',
    title: 'Scale & Cross-Border',
    desc: 'Inbound foreign investment (FDI / Form FC-GPR), cap table diligence, and investor MIS.',
  },
];

export function StartupAdvisoryFeature() {
  return (
    <section className="py-20 sm:py-28 bg-[#F5F1E8] text-[#171A18] border-b border-[#DDD6C8]" aria-labelledby="startup-title">
      <div className="shell max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#082C24]" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#53645A] font-semibold">
                Founder Ecosystem
              </span>
            </div>
            <h2 id="startup-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-[#082C24]">
              From incorporation to informed growth.
            </h2>
            <p className="text-base sm:text-lg text-[#53645A] mt-3 font-normal leading-relaxed">
              We guide entrepreneurs through the critical financial and statutory decisions of building a venture.
            </p>
          </div>

          <Link
            href="/services/startup-advisory/"
            className="self-start lg:self-end min-h-[50px] px-7 py-3 rounded-xl bg-[#082C24] text-[#F5F1E8] font-semibold text-xs tracking-wider uppercase hover:bg-[#051D18] flex items-center gap-2 shadow-md transition-all"
          >
            <span>Explore Startup Advisory</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Visual Sequential Path Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {roadmap.map((item, idx) => (
            <div
              key={item.phase}
              className="rounded-2xl bg-white border border-[#DDD6C8] p-6 flex flex-col justify-between shadow-sm relative group hover:border-[#082C24] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#DDD6C8] mb-4">
                  <span className="font-mono text-xs text-[#53645A]">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#C5A880]">
                    {item.phase}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-normal text-[#082C24] mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-[#53645A] leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              {idx < roadmap.length - 1 && (
                <div className="hidden md:flex justify-end pt-4 mt-2 text-[#53645A]/40" aria-hidden="true">
                  <ArrowRight size={16} />
                </div>
              )}
              {idx < roadmap.length - 1 && (
                <div className="md:hidden flex justify-center py-2 text-[#53645A]/40" aria-hidden="true">
                  <ArrowDown size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
