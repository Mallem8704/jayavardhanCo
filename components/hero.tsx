import Link from 'next/link';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section
      className="relative min-h-[92svh] lg:min-h-[96svh] bg-[#082C24] text-[#F5F1E8] flex flex-col justify-between pt-28 sm:pt-32 pb-10 px-6 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Abstract Finance Visual Layer: Ledger Grid, Statement Watermarks, Hairline Geometry */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {/* Fine Architectural Ledger Grid */}
        <div className="absolute inset-0 bg-financial-grid opacity-60" />

        {/* Ambient Twilight Gradient Glow */}
        <div className="absolute -top-32 -right-20 w-[420px] h-[420px] rounded-full bg-[#051D18] blur-3xl opacity-80" />
        <div className="absolute top-1/2 -left-32 w-[380px] h-[380px] rounded-full bg-[#0a392f] blur-3xl opacity-40" />

        {/* Faint Financial Statement Line Structures */}
        <svg
          className="absolute right-[-8%] bottom-[-5%] w-[680px] h-[520px] text-[#F5F1E8] opacity-[0.035] hidden sm:block"
          viewBox="0 0 680 520"
          fill="none"
          stroke="currentColor"
        >
          {/* Column rules */}
          <line x1="80" y1="20" x2="80" y2="500" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="280" y1="20" x2="280" y2="500" strokeWidth="1" />
          <line x1="480" y1="20" x2="480" y2="500" strokeWidth="1" />
          <line x1="620" y1="20" x2="620" y2="500" strokeWidth="1" />
          {/* Row rules */}
          <line x1="40" y1="80" x2="660" y2="80" strokeWidth="1" />
          <line x1="40" y1="160" x2="660" y2="160" strokeWidth="1" />
          <line x1="40" y1="240" x2="660" y2="240" strokeWidth="1" />
          <line x1="40" y1="320" x2="660" y2="320" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="40" y1="400" x2="660" y2="400" strokeWidth="1.5" />
          <line x1="40" y1="408" x2="660" y2="408" strokeWidth="1" />
        </svg>

        {/* Faint Financial Data Matrix Typography */}
        <div className="absolute top-28 right-8 text-[11px] font-mono tracking-wider text-[#9DAF9F] opacity-15 hidden lg:block text-right leading-loose">
          <span>STATUTORY AUDIT &middot; IND AS</span><br />
          <span>FEMA DISCLOSURES &middot; FC-GPR</span><br />
          <span>DIRECT TAXATION &middot; SEC 115BAA</span><br />
          <span>GST AUDIT &middot; FORM 9C</span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="shell relative z-10 my-auto py-6 flex flex-col items-start max-w-4xl">
        {/* Small Editorial Eyebrow Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.07] border border-white/10 text-[11px] sm:text-xs font-medium tracking-[0.18em] text-[#9DAF9F] uppercase mb-6 sm:mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" aria-hidden="true" />
          <span>Chartered Accountants &middot; Hyderabad</span>
        </div>

        {/* Powerful Editorial Headline */}
        <h1
          id="hero-heading"
          className="font-serif text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.6rem] font-normal leading-[1.09] tracking-[-0.035em] text-[#F5F1E8] mb-6 sm:mb-8"
        >
          <span>Clarity in your numbers.</span>
          <span className="block mt-1 sm:mt-2 text-[#E8E0D1]">
            Confidence in your <em className="italic font-light text-[#C5A880]">next step.</em>
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg lg:text-xl text-[#E8E0D1]/90 max-w-xl font-normal leading-relaxed mb-8 sm:mb-10">
          Audit, tax, compliance and financial advisory for businesses making important decisions.
        </p>

        {/* Action Button Row (Mobile-First Full-Width CTAs) */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
          <Link
            href="/contact/"
            className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-xl bg-[#F5F1E8] text-[#082C24] font-semibold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-lg shadow-black/25 hover:bg-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <span>Discuss Your Requirements</span>
            <ArrowUpRight size={18} className="text-[#082C24]" aria-hidden="true" />
          </Link>

          <a
            href="#services"
            className="w-full sm:w-auto min-h-[52px] px-7 py-3.5 rounded-xl bg-white/[0.06] border border-white/15 text-[#F5F1E8] font-medium text-sm tracking-wide flex items-center justify-center hover:bg-white/10 hover:border-[#C5A880]/50 transition-all duration-200"
          >
            Explore Services
          </a>
        </div>
      </div>

      {/* Subtle Directional Scroll Indicator */}
      <div className="shell relative z-10 pt-4 flex items-center justify-between text-xs text-[#9DAF9F]">
        <a
          href="#statement"
          className="inline-flex items-center gap-2 hover:text-white transition-colors group py-2"
          aria-label="Scroll to explore brand statement"
        >
          <span>Scroll to explore</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform duration-200" aria-hidden="true" />
        </a>

        <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#9DAF9F]/70 tracking-wider uppercase font-mono">
          <span>KPHB</span>
          <span>&middot;</span>
          <span>HITEC CITY CORRIDOR</span>
        </div>
      </div>
    </section>
  );
}
