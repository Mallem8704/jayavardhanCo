import Link from 'next/link';
import { contact, firm, navigation, services } from '@/lib/content';

export function ContactDetails() {
  if (!contact.email && !contact.phone && !contact.address) return null;
  return (
    <address className="not-italic flex flex-col space-y-2 text-xs text-[#E8E0D1]/80">
      {contact.email && (
        <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
          {contact.email}
        </a>
      )}
      {contact.phone && (
        <a href={contact.phone.href} className="hover:text-white transition-colors">
          {contact.phone.display}
        </a>
      )}
      {contact.address && (
        <p className="leading-relaxed text-[#E8E0D1]/70">
          {contact.address}
        </p>
      )}
    </address>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#051D18] text-[#F5F1E8] border-t border-white/10 pt-16 pb-24 lg:pb-16 px-6">
      <div className="shell max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b border-white/10">
          {/* Identity & Contact (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <Link href="/" className="font-serif text-2xl text-white font-normal">
                {firm.name}
              </Link>
              <p className="text-xs uppercase tracking-[0.16em] text-[#9DAF9F] font-semibold mt-1">
                {firm.designation}
              </p>
            </div>

            <p className="text-xs text-[#E8E0D1]/75 leading-relaxed max-w-sm">
              Audit &middot; Tax &middot; Compliance &middot; Financial Advisory. Strategic counsel for businesses making important decisions.
            </p>

            <div className="pt-2">
              <ContactDetails />
            </div>
          </div>

          {/* All 8 Service Links (4 cols) — verified by smoke tests */}
          <nav aria-label="Footer services" className="md:col-span-4 space-y-3">
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#9DAF9F] font-semibold">
              Areas of Practice
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 text-xs">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}/`}
                    className="text-[#E8E0D1]/80 hover:text-white transition-colors block py-1"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Explore Links (3 cols) */}
          <nav aria-label="Footer navigation" className="md:col-span-3 space-y-3">
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#9DAF9F] font-semibold">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#E8E0D1]/80 hover:text-white transition-colors block py-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy/"
                  className="text-[#E8E0D1]/80 hover:text-white transition-colors block py-1"
                >
                  Privacy Notice
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Footer Bottom Legal & Regulatory Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#9DAF9F]">
          <span>&copy; {new Date().getFullYear()} {firm.name}. All rights reserved.</span>
          <span>Information on this website is general and is not professional advice.</span>
        </div>
      </div>
    </footer>
  );
}
