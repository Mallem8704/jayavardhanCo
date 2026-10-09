'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronDown, Menu, X, ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';
import { firm, navigation, services, contact } from '@/lib/content';

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  const isHome = path === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    setServicesExpanded(false);
  };

  const isActive = (href: string) =>
    href === '/' ? path === '/' : path.startsWith(href.replace(/\/$/, ''));

  // Header appearance state:
  // Transparent when at top of homepage, solid warm ivory when scrolled or on subpages
  const isTransparent = isHome && !scrolled && !open;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent text-[#F5F1E8] border-b border-white/10'
            : 'bg-[#F5F1E8]/95 backdrop-blur-md text-[#171A18] border-b border-[#082C24]/10 shadow-sm'
        }`}
      >
        <div className="shell flex items-center justify-between min-h-[68px] sm:min-h-[76px] transition-all">
          {/* Brand Logo & Designation */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3 py-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#082C24] rounded"
            aria-label={`${firm.name}, Home`}
          >
            <span className="relative block w-9 sm:w-11 aspect-[420/316] flex-shrink-0">
              <Image
                src={isTransparent ? '/ca-india-light.png' : '/ca-india-dark.png'}
                width={420}
                height={316}
                sizes="48px"
                alt="CA India Emblem"
                loading="eager"
                priority
                className="w-full h-full object-contain"
              />
            </span>
            <span className="flex flex-col">
              <span
                className={`font-serif text-lg sm:text-xl font-normal tracking-tight transition-colors ${
                  isTransparent ? 'text-[#F5F1E8]' : 'text-[#082C24]'
                }`}
              >
                {firm.name}
              </span>
              <span
                className={`text-[10px] tracking-[0.16em] uppercase font-sans font-medium transition-colors ${
                  isTransparent ? 'text-[#9DAF9F]' : 'text-[#53645A]'
                }`}
              >
                {firm.designation}
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Desktop Navigation" className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navigation.map((item) =>
              item.href === '/services/' ? (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`py-3 flex items-center gap-1 transition-colors ${
                      isActive(item.href)
                        ? 'text-[#C5A880] underline underline-offset-8 decoration-2'
                        : isTransparent
                        ? 'text-[#F5F1E8]/90 hover:text-white'
                        : 'text-[#171A18] hover:text-[#082C24]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                  </Link>
                  {/* Desktop Dropdown */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                    <div className="bg-[#F5F1E8] border border-[#DDD6C8] rounded-xl p-4 shadow-xl text-xs space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-[#53645A] font-semibold px-2 py-1">
                        Areas of Practice
                      </p>
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}/`}
                          className="block px-2.5 py-2 rounded-lg text-[#171A18] hover:bg-[#E8E0D1] hover:text-[#082C24] transition-colors"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-3 transition-colors ${
                    isActive(item.href)
                      ? 'text-[#C5A880] underline underline-offset-8 decoration-2'
                      : isTransparent
                      ? 'text-[#F5F1E8]/90 hover:text-white'
                      : 'text-[#171A18] hover:text-[#082C24]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}

            <Link
              href="/contact/"
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm ${
                isTransparent
                  ? 'btn-ivory hover:shadow-md'
                  : 'btn-forest'
              }`}
            >
              <span>Discuss Your Requirements</span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle Button (Min 48px Touch Target) */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close main menu' : 'Open main menu'}
            className={`lg:hidden flex items-center justify-center w-12 h-12 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] ${
              isTransparent
                ? 'text-[#F5F1E8] hover:bg-white/10 active:bg-white/20'
                : 'text-[#082C24] hover:bg-[#082C24]/10 active:bg-[#082C24]/20'
            }`}
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* FULL-SCREEN IMMERSIVE MOBILE MENU */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
        className={`fixed inset-0 z-40 bg-[#051D18] text-[#F5F1E8] flex flex-col justify-between pt-24 pb-8 px-6 transition-all duration-300 lg:hidden overflow-y-auto ${
          open ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="space-y-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#9DAF9F] font-semibold">
            Navigation Menu
          </p>

          <nav className="flex flex-col space-y-3 font-serif text-2xl sm:text-3xl">
            <Link
              href="/"
              onClick={closeMenu}
              className={`py-2 transition-colors flex items-center justify-between border-b border-white/10 ${
                path === '/' ? 'text-[#C5A880]' : 'text-[#F5F1E8] hover:text-white'
              }`}
            >
              <span>Home</span>
              <span className="text-xs font-sans text-[#9DAF9F] opacity-60">01</span>
            </Link>

            <Link
              href="/about/"
              onClick={closeMenu}
              className={`py-2 transition-colors flex items-center justify-between border-b border-white/10 ${
                path === '/about/' ? 'text-[#C5A880]' : 'text-[#F5F1E8] hover:text-white'
              }`}
            >
              <span>About the Firm</span>
              <span className="text-xs font-sans text-[#9DAF9F] opacity-60">02</span>
            </Link>

            {/* Services with Expandable Sub-Menu */}
            <div className="border-b border-white/10 pb-2">
              <div className="flex items-center justify-between py-2">
                <Link
                  href="/services/"
                  onClick={closeMenu}
                  className={`transition-colors ${
                    path.startsWith('/services') ? 'text-[#C5A880]' : 'text-[#F5F1E8] hover:text-white'
                  }`}
                >
                  Areas of Practice
                </Link>
                <button
                  type="button"
                  onClick={() => setServicesExpanded(!servicesExpanded)}
                  aria-expanded={servicesExpanded}
                  aria-label="Toggle all practice areas"
                  className="w-12 h-12 flex items-center justify-center text-[#9DAF9F] hover:text-white transition-colors"
                >
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-200 ${servicesExpanded ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              {servicesExpanded && (
                <div className="pl-3 py-2 space-y-2.5 font-sans text-sm border-l-2 border-[#C5A880]/40 my-2">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}/`}
                      onClick={closeMenu}
                      className="block py-1 text-[#E8E0D1] hover:text-white transition-colors"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact/"
              onClick={closeMenu}
              className={`py-2 transition-colors flex items-center justify-between border-b border-white/10 ${
                path === '/contact/' ? 'text-[#C5A880]' : 'text-[#F5F1E8] hover:text-white'
              }`}
            >
              <span>Contact & Enquiries</span>
              <span className="text-xs font-sans text-[#9DAF9F] opacity-60">04</span>
            </Link>
          </nav>

          {/* Primary Mobile Action Button */}
          <div className="pt-4">
            <Link
              href="/contact/"
              onClick={closeMenu}
              className="btn-ivory w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-sm tracking-wide shadow-lg transition-all active:scale-[0.98]"
            >
              <span className="text-[#082C24]">Discuss Your Requirements</span>
              <ArrowUpRight size={18} className="text-[#082C24]" />
            </Link>
          </div>
        </div>

        {/* Quick Contact Micro-Details in Mobile Menu */}
        <div className="pt-6 border-t border-white/10 space-y-2.5 text-xs text-[#9DAF9F]">
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-[#C5A880]" />
            <a href="tel:+918766728514" className="text-white hover:underline">
              +91 87667 28514
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-[#C5A880]" />
            <a href="mailto:info@cajvr.com" className="text-white hover:underline">
              info@cajvr.com
            </a>
          </div>
          <div className="flex items-start gap-2 pt-1 text-[11px] text-[#E8E0D1]/80">
            <MapPin size={14} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
            <span>703, Manjeera Trinity Corporate, KPHB, Hyderabad – 500072</span>
          </div>
        </div>
      </div>
    </>
  );
}
