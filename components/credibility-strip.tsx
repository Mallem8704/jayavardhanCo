const items = [
  'CHARTERED ACCOUNTANTS',
  'AUDIT & ASSURANCE',
  'DIRECT TAXATION',
  'GST COMPLIANCE',
  'TRANSFER PRICING & FEMA',
  'STARTUP ADVISORY',
  'VIRTUAL CFO',
  'CORPORATE COMPLIANCE',
  'HYDERABAD',
];

export function CredibilityStrip() {
  return (
    <section
      aria-label="Core competencies"
      className="bg-[#051D18] text-[#9DAF9F] border-y border-white/10 py-3.5 overflow-hidden select-none"
    >
      <div className="animate-marquee-slow flex items-center">
        {/* First track */}
        <div className="flex items-center gap-8 px-4 flex-shrink-0 text-xs sm:text-[13px] font-sans font-medium tracking-[0.2em] uppercase">
          {items.map((item, idx) => (
            <span key={idx} className="flex items-center gap-8">
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70" aria-hidden="true" />
            </span>
          ))}
        </div>
        {/* Second track for seamless continuous loop */}
        <div className="flex items-center gap-8 px-4 flex-shrink-0 text-xs sm:text-[13px] font-sans font-medium tracking-[0.2em] uppercase" aria-hidden="true">
          {items.map((item, idx) => (
            <span key={`dup-${idx}`} className="flex items-center gap-8">
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
