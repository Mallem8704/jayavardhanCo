import Link from 'next/link';
import { ArrowRight, MapPin, Award, Scale } from 'lucide-react';
import { firm, professional, contact } from '@/lib/content';

export function EditorialAbout() {
  return (
    <section className="py-20 sm:py-28 bg-[#F5F1E8] text-[#171A18] border-b border-[#DDD6C8]" aria-labelledby="about-title">
      <div className="shell max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Text Story (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#082C24]" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#53645A] font-semibold">
                About the Firm
              </span>
            </div>

            <h2 id="about-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.14] text-[#082C24]">
              Financial clarity starts with understanding the business.
            </h2>

            <p className="text-base sm:text-lg text-[#53645A] leading-relaxed font-normal">
              Jayavardhan & Co is a Chartered Accountancy firm based in Hyderabad advising businesses across audit, tax, compliance and financial decision-making.
            </p>

            <div className="pt-4 border-t border-[#DDD6C8] grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#53645A]">
                  Principal Practitioner
                </span>
                <p className="font-serif text-lg text-[#082C24] font-medium">
                  {professional.name}
                </p>
                <p className="text-xs text-[#53645A]">
                  {professional.designation}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#53645A]">
                  Office Location
                </span>
                <p className="text-xs sm:text-sm text-[#171A18] leading-snug">
                  {contact.address}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about/"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#082C24] uppercase hover:underline underline-offset-4"
              >
                <span>Read Full Firm Background</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Visual Grid (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="rounded-2xl bg-[#082C24] text-[#F5F1E8] p-7 border border-[#082C24] shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-widest text-[#9DAF9F]">
                  PRACTICE TENET 01
                </span>
                <Scale size={18} className="text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-xl font-normal text-white">
                Statutory Independence
              </h3>
              <p className="text-xs text-[#E8E0D1]/80 leading-relaxed font-normal">
                Upholding strict professional objectivity and regulatory standards governed by the Chartered Accountants Act, 1949.
              </p>
            </div>

            <div className="rounded-2xl bg-white text-[#171A18] p-7 border border-[#DDD6C8] shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-widest text-[#53645A]">
                  PRACTICE TENET 02
                </span>
                <Award size={18} className="text-[#082C24]" />
              </div>
              <h3 className="font-serif text-xl font-normal text-[#082C24]">
                Partner-Led Attention
              </h3>
              <p className="text-xs text-[#53645A] leading-relaxed font-normal">
                Direct engagement oversight for every advisory client, ensuring thorough review rather than delegating to junior layers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
