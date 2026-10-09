import Link from 'next/link';
import { ArrowUpRight, Phone, MessageSquare } from 'lucide-react';
import { contact } from '@/lib/content';

export function ContactCta() {
  const whatsappHref = `https://wa.me/918766728514?text=${encodeURIComponent(
    'Hello Jayavardhan & Co, I would like to discuss our company requirements.'
  )}`;

  return (
    <section className="py-24 sm:py-32 bg-[#051D18] text-[#F5F1E8] relative overflow-hidden" aria-labelledby="cta-title">
      {/* Subtle Financial Grid Lines */}
      <div className="absolute inset-0 bg-financial-grid opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="shell relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.07] border border-white/10 text-xs font-medium tracking-[0.2em] text-[#9DAF9F] uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" aria-hidden="true" />
          <span>Starting a Conversation</span>
        </div>

        {/* Huge Headline */}
        <h2 id="cta-title" className="font-serif text-3.5xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-normal leading-[1.1] text-white tracking-[-0.03em] max-w-3xl mb-6">
          Tell us what you&apos;re working through.
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-[#E8E0D1]/85 max-w-xl font-normal leading-relaxed mb-10">
          Share a little context about your business and the matter you would like to discuss.
        </p>

        {/* Action Buttons */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
          <Link
            href="/contact/"
            className="btn-ivory w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <span className="text-[#082C24]">Discuss Your Requirements</span>
            <ArrowUpRight size={18} className="text-[#082C24]" />
          </Link>

          <a
            href={contact.phone?.href || 'tel:+918766728514'}
            className="w-full sm:w-auto min-h-[52px] px-7 py-3.5 rounded-xl bg-white/[0.06] border border-white/15 text-[#F5F1E8] font-medium text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-white/10 hover:border-[#C5A880]/50 transition-all"
          >
            <Phone size={16} className="text-[#C5A880]" />
            <span>Call +91 87667 28514</span>
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[52px] px-6 py-3.5 rounded-xl bg-emerald-700/30 border border-emerald-500/30 text-emerald-200 font-medium text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-emerald-600/40 transition-all"
          >
            <MessageSquare size={16} className="text-emerald-300" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Professional Note */}
        <p className="text-[11px] text-[#9DAF9F] mt-10 font-mono tracking-wider">
          OFFICE: 703, MANJEERA TRINITY CORPORATE, KPHB &middot; HYDERABAD
        </p>
      </div>
    </section>
  );
}
