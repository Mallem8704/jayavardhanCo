'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { services, serviceDetails } from '@/lib/content';

const servicePointers: Record<string, string> = {
  'audit-assurance': 'Independent review. Clearer financial reporting. Greater accountability.',
  'taxation': 'Direct tax compliance. Corporate structuring. Regulatory clarity.',
  'gst': 'Input tax credit review. Filing discipline. Authority correspondence.',
  'accounting-bookkeeping': 'Accurate ledgers. Reporting standards. Management visibility.',
  'corporate-compliance': 'Secretarial governance. Annual filings. Statutory registers.',
  'transfer-pricing-fema': 'Cross-border transactions. RBI disclosures. Arm’s-length compliance.',
  'startup-advisory': 'Entity formation. Cap table structuring. Early compliance.',
  'virtual-cfo-business-advisory': 'Cash runway planning. Financial governance. Strategic insights.',
};

export function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSheet, setActiveSheet] = useState<(typeof services)[number] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync scroll position with progress indicator
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 16 : 300;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(0, index), services.length - 1));
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 16 : 320;
    el.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    setActiveIndex(index);
  };

  // Close sheet on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveSheet(null);
    };
    if (activeSheet) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [activeSheet]);

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#051D18] text-[#F5F1E8] overflow-hidden" aria-labelledby="services-title">
      <div className="shell mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#9DAF9F] font-semibold">
              Our Areas of Practice
            </span>
          </div>
          <h2 id="services-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-[#F5F1E8] max-w-2xl">
            Expertise for your financial and business requirements.
          </h2>
        </div>

        {/* Carousel Progress Indicator & Arrows */}
        <div className="flex items-center gap-4">
          <div className="font-mono text-xs tracking-widest text-[#9DAF9F]">
            <span className="text-[#F5F1E8] font-bold text-sm">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>{' '}
            / {String(services.length).padStart(2, '0')}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous service"
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-[#F5F1E8] hover:bg-white/10 active:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo(Math.min(services.length - 1, activeIndex + 1))}
              disabled={activeIndex === services.length - 1}
              aria-label="Next service"
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-[#F5F1E8] hover:bg-white/10 active:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* SWIPEABLE HORIZONTAL CARDS TRACK */}
      <div
        ref={scrollRef}
        className="snap-carousel no-scrollbar pb-6"
        role="region"
        aria-label="Practice areas carousel"
      >
        {services.map((service, index) => {
          const num = String(index + 1).padStart(2, '0');
          const pointer = servicePointers[service.slug] || service.summary;

          return (
            <article
              key={service.slug}
              className="snap-card group rounded-2xl bg-[#082C24] border border-white/10 hover:border-[#C5A880]/50 p-7 flex flex-col justify-between min-h-[380px] shadow-xl transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <span className="font-mono text-xs tracking-widest text-[#9DAF9F]">
                    {num}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveSheet(service)}
                    className="text-[11px] font-sans font-semibold tracking-wider text-[#C5A880] uppercase hover:underline py-1 px-2 -mr-2"
                  >
                    Quick View
                  </button>
                </div>

                <h3 className="font-serif text-2xl sm:text-2xl font-normal text-[#F5F1E8] mt-6 mb-3 leading-snug group-hover:text-[#E8E0D1] transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-[#E8E0D1]/80 leading-relaxed font-normal">
                  {pointer}
                </p>
              </div>

              <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}/`}
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#F5F1E8] uppercase hover:text-[#C5A880] transition-colors group-hover:translate-x-1 duration-200"
                >
                  <span>Explore Scope</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>

                <button
                  type="button"
                  onClick={() => setActiveSheet(service)}
                  aria-label={`Inspect overview for ${service.title}`}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-[#9DAF9F] transition-colors"
                >
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* MOBILE BOTTOM SHEET PREVIEW MODAL */}
      <div
        className={`bottom-sheet-backdrop ${activeSheet ? 'is-open' : ''}`}
        onClick={() => setActiveSheet(null)}
        aria-hidden={!activeSheet}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={activeSheet?.title || 'Service details'}
        className={`bottom-sheet-content ${activeSheet ? 'is-open' : ''}`}
      >
        <div className="bottom-sheet-handle" />

        {activeSheet && (
          <div className="p-6 sm:p-8 overflow-y-auto max-h-[82svh] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#DDD6C8]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#082C24]" />
                  <span className="text-[11px] uppercase tracking-widest text-[#53645A] font-semibold">
                    Practice Scope
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSheet(null)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#171A18] hover:bg-[#E8E0D1] transition-colors"
                  aria-label="Close service preview"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#082C24] mt-4 mb-2 font-normal">
                {activeSheet.title}
              </h3>
              <p className="text-sm text-[#53645A] leading-relaxed mb-6">
                {serviceDetails[activeSheet.slug]?.introduction || activeSheet.summary}
              </p>

              {/* What we help with */}
              <div className="space-y-3 mb-6 bg-[#E8E0D1]/50 p-4 rounded-xl border border-[#DDD6C8]">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#082C24]">
                  Typical Advisory Situations
                </h4>
                <ul className="space-y-2 text-xs text-[#171A18]">
                  {serviceDetails[activeSheet.slug]?.needs.slice(0, 3).map((need, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[#082C24] flex-shrink-0 mt-0.5" />
                      <span>{need}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Sheet CTAs */}
            <div className="pt-4 border-t border-[#DDD6C8] flex flex-col sm:flex-row gap-3">
              <Link
                href={`/contact/?service=${activeSheet.slug}`}
                onClick={() => setActiveSheet(null)}
                className="btn-forest w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-xs tracking-wider uppercase transition-colors"
              >
                <span className="text-[#F5F1E8]">Speak with us</span>
                <ArrowUpRight size={16} className="text-[#F5F1E8]" />
              </Link>
              <Link
                href={`/services/${activeSheet.slug}/`}
                onClick={() => setActiveSheet(null)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border border-[#082C24]/30 text-[#082C24] font-semibold text-xs tracking-wider uppercase hover:bg-[#E8E0D1] transition-colors"
              >
                <span>View Full Page Scope</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
