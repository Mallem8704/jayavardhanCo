import Link from 'next/link';
import { ArrowUpRight, TrendingUp, DollarSign, PieChart, Activity, LineChart } from 'lucide-react';

const metrics = [
  {
    title: 'Cash Flow & Runway',
    desc: 'Operating burn rate visibility, liquidity buffers, and capital allocation.',
    tag: 'LIQUIDITY',
    icon: DollarSign,
  },
  {
    title: 'Revenue Streams',
    desc: 'Contract accounting, recurring vs project income, and revenue leak detection.',
    tag: 'TOP-LINE',
    icon: TrendingUp,
  },
  {
    title: 'Operating Margins',
    desc: 'Unit economic breakdown, direct cost containment, and EBITDA health.',
    tag: 'PROFITABILITY',
    icon: PieChart,
  },
  {
    title: 'Working Capital',
    desc: 'Receivables aging reduction, payables scheduling, and balance sheet velocity.',
    tag: 'EFFICIENCY',
    icon: Activity,
  },
  {
    title: 'Rolling Forecast',
    desc: '12-month forward projections, variance analysis, and investor board reporting.',
    tag: 'PROJECTIONS',
    icon: LineChart,
  },
];

export function VirtualCfoFeature() {
  return (
    <section className="py-20 sm:py-28 bg-[#051D18] text-[#F5F1E8] border-b border-white/10" aria-labelledby="cfo-title">
      <div className="shell max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#9DAF9F] font-semibold">
                Strategic Advisory Pillar
              </span>
            </div>
            <h2 id="cfo-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.14] text-[#F5F1E8]">
              Financial visibility without building a full finance department.
            </h2>
            <p className="text-base sm:text-lg text-[#E8E0D1]/80 mt-4 font-normal leading-relaxed">
              We provide scaling companies and founders with executive-level financial oversight, management reporting, and capital governance.
            </p>
          </div>

          <Link
            href="/services/virtual-cfo-business-advisory/"
            className="self-start lg:self-end min-h-[50px] px-7 py-3 rounded-xl bg-[#F5F1E8] text-[#051D18] font-semibold text-xs tracking-wider uppercase hover:bg-white flex items-center gap-2 shadow-lg transition-all"
          >
            <span>Explore Virtual CFO</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Illustrative Dashboard Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.title}
                className="rounded-2xl bg-[#082C24] border border-white/10 p-6 flex flex-col justify-between hover:border-[#C5A880]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880]">
                      {m.tag}
                    </span>
                    <Icon size={16} className="text-[#9DAF9F]" aria-hidden="true" />
                  </div>

                  {/* Clean Illustrative Trend Line */}
                  <div className="h-6 w-full flex items-end gap-1 mb-4 opacity-40" aria-hidden="true">
                    <div className="h-[40%] flex-1 bg-[#9DAF9F] rounded-t-sm" />
                    <div className="h-[60%] flex-1 bg-[#9DAF9F] rounded-t-sm" />
                    <div className="h-[50%] flex-1 bg-[#9DAF9F] rounded-t-sm" />
                    <div className="h-[80%] flex-1 bg-[#C5A880] rounded-t-sm" />
                    <div className="h-[95%] flex-1 bg-[#C5A880] rounded-t-sm" />
                  </div>

                  <h3 className="font-serif text-lg font-normal text-white mb-2 leading-snug">
                    {m.title}
                  </h3>

                  <p className="text-xs text-[#E8E0D1]/75 leading-relaxed font-normal">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 mt-4 text-[10px] font-mono text-[#9DAF9F]">
                  &middot; EXECUTIVE SCOPE
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
