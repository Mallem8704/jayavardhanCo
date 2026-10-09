'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import { contact } from '@/lib/content';

export function FloatingContactBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Reveal after user scrolls past the hero (approx 380px)
      setVisible(window.scrollY > 380);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappHref = `https://wa.me/918766728514?text=${encodeURIComponent(
    'Hello Jayavardhan & Co, I would like to enquire about your professional services.'
  )}`;

  return (
    <aside
      aria-label="Quick contact actions"
      className={`floating-mobile-bar lg:hidden ${visible ? 'is-visible' : 'is-hidden'}`}
    >
      <div className="floating-mobile-bar-inner">
        {/* Call Button */}
        <a
          href={contact.phone?.href || 'tel:+918766728514'}
          className="flex-1 flex items-center justify-center gap-1.5 min-h-[46px] rounded-full text-xs font-semibold text-[#F5F1E8] bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors"
          aria-label="Call Jayavardhan & Co"
        >
          <Phone size={14} className="text-[#C5A880]" aria-hidden="true" />
          <span>CALL</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 min-h-[46px] rounded-full text-xs font-semibold text-[#F5F1E8] bg-emerald-700/40 border border-emerald-500/30 hover:bg-emerald-600/50 active:bg-emerald-600/60 transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare size={14} className="text-emerald-300" aria-hidden="true" />
          <span>WHATSAPP</span>
        </a>

        {/* Enquire Button */}
        <Link
          href="/contact/"
          className="flex-1 flex items-center justify-center gap-1 min-h-[46px] rounded-full text-xs font-bold text-[#051D18] bg-[#F5F1E8] hover:bg-white active:bg-[#E8E0D1] transition-colors shadow-sm"
          aria-label="Enquire via form"
        >
          <span>ENQUIRE</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
