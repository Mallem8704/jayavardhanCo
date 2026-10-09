import Link from 'next/link';
import { Breadcrumbs, TextLink } from '@/components/ui';
import { EngagementNote } from '@/components/engagement-note';
import { firm, professional, services, contact } from '@/lib/content';
import { pageMetadata, productionOrigin } from '@/lib/seo';
import { ArrowUpRight, Shield, Award, Users, Building, Scale, MapPin } from 'lucide-react';

export const metadata = pageMetadata(
  'About',
  'Jayavardhan & Co is a Chartered Accountancy firm in Hyderabad. Learn about its eight areas of practice and confirmed professional details.',
  '/about/'
);

const breadcrumbsSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${productionOrigin}/` },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${productionOrigin}/about/` },
  ],
};

export default function About() {
  return (
    <main id="main" tabIndex={-1} className="bg-[#F5F1E8] text-[#171A18] pb-24 pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbsSchema).replace(/</g, '\\u003c'),
        }}
      />

      {/* HERO SECTION */}
      <section className="bg-[#082C24] text-[#F5F1E8] py-16 sm:py-24 px-6 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-financial-grid opacity-25 pointer-events-none" aria-hidden="true" />

        <div className="shell max-w-5xl mx-auto relative z-10">
          <div className="mb-8 opacity-80">
            <Breadcrumbs items={[{ label: 'About' }]} />
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#9DAF9F] font-semibold">
              Firm Profile & Perspective
            </span>
          </div>

          <h1 className="font-serif text-3.5xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.12] mb-6 max-w-4xl">
            Financial clarity starts with understanding the business.
          </h1>

          <p className="text-base sm:text-xl text-[#E8E0D1]/90 max-w-2xl font-normal leading-relaxed">
            Jayavardhan & Co is a Chartered Accountancy firm based in Hyderabad advising businesses across audit, tax, compliance and financial decision-making.
          </p>
        </div>
      </section>

      <div className="shell max-w-5xl mx-auto py-16 sm:py-24 px-6 space-y-16 sm:space-y-20">
        {/* 1. OUR PERSPECTIVE */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#082C24]" />
            <span className="text-xs uppercase tracking-widest text-[#53645A] font-semibold">
              Our Perspective
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#082C24] font-normal leading-snug max-w-2xl">
            Precision in the detail. Perspective for what’s next.
          </h2>
          <p className="text-sm sm:text-base text-[#53645A] leading-relaxed max-w-3xl">
            In a fast-changing regulatory environment, sound financial management is not merely about recordkeeping—it is the foundation of confident business execution. We bring rigorous statutory discipline together with strategic clarity to help leaders understand their true obligations and make informed choices.
          </p>
        </section>

        {/* 2. LEADERSHIP & PRACTITIONER PROFILE */}
        <section className="bg-white border border-[#DDD6C8] rounded-2xl p-7 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#53645A]">
              Practice Leadership
            </span>
            <h2 className="font-serif text-3xl text-[#082C24] font-normal">
              {professional.name}
            </h2>
            <p className="text-sm font-semibold text-[#C5A880] tracking-wider uppercase">
              {professional.designation}
            </p>
            <p className="text-xs sm:text-sm text-[#53645A] leading-relaxed pt-2">
              Practicing under the regulatory framework of the Institute of Chartered Accountants of India (ICAI), providing partner-led attention across all assurance, direct and indirect taxation, cross-border FEMA, and corporate advisory mandates.
            </p>
          </div>

          <div className="md:col-span-4 bg-[#F5F1E8] p-6 rounded-xl border border-[#DDD6C8] space-y-3 text-xs">
            <div className="flex items-center gap-2 text-[#082C24] font-semibold">
              <Shield size={16} />
              <span>Statutory Compliance</span>
            </div>
            <p className="text-[#53645A] leading-relaxed">
              Strict adherence to the Chartered Accountants Act, 1949 and ICAI Code of Ethics.
            </p>
          </div>
        </section>

        {/* 3. CORE VALUES & PROFESSIONAL APPROACH */}
        <section className="space-y-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#082C24]" />
            <span className="text-xs uppercase tracking-widest text-[#53645A] font-semibold">
              Our Professional Approach
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-[#DDD6C8] rounded-2xl p-6 space-y-3 shadow-sm">
              <Scale size={20} className="text-[#082C24]" />
              <h3 className="font-serif text-xl text-[#082C24] font-normal">
                Strict Independence
              </h3>
              <p className="text-xs text-[#53645A] leading-relaxed">
                Clear separation of assurance and advisory roles to preserve absolute objectivity and integrity.
              </p>
            </div>

            <div className="bg-white border border-[#DDD6C8] rounded-2xl p-6 space-y-3 shadow-sm">
              <Award size={20} className="text-[#082C24]" />
              <h3 className="font-serif text-xl text-[#082C24] font-normal">
                Partner-Led Counsel
              </h3>
              <p className="text-xs text-[#53645A] leading-relaxed">
                Direct involvement by qualified professionals in every engagement rather than impersonal delegation.
              </p>
            </div>

            <div className="bg-white border border-[#DDD6C8] rounded-2xl p-6 space-y-3 shadow-sm">
              <Users size={20} className="text-[#082C24]" />
              <h3 className="font-serif text-xl text-[#082C24] font-normal">
                Contextual Clarity
              </h3>
              <p className="text-xs text-[#53645A] leading-relaxed">
                Explaining complex tax laws, notifications, and accounting standards in plain, actionable business terms.
              </p>
            </div>
          </div>
        </section>

        {/* 4. PRACTICE AREAS DIRECTORY */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#082C24]" />
            <span className="text-xs uppercase tracking-widest text-[#53645A] font-semibold">
              Areas of Practice
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#082C24] font-normal">
            Eight dedicated domains of counsel.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/`}
                className="bg-white border border-[#DDD6C8] hover:border-[#082C24] p-5 rounded-xl transition-all shadow-sm group"
              >
                <h3 className="font-serif text-lg text-[#082C24] font-normal group-hover:underline">
                  {service.title}
                </h3>
                <p className="text-xs text-[#53645A] mt-1 line-clamp-2">
                  {service.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. HYDERABAD OFFICE LOCATION */}
        <section className="bg-white border border-[#DDD6C8] rounded-2xl p-7 sm:p-10 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-[#53645A]">
            <MapPin size={16} className="text-[#C5A880]" />
            <span>Hyderabad Practice Office</span>
          </div>

          <h2 className="font-serif text-2xl text-[#082C24] font-normal">
            Manjeera Trinity Corporate, KPHB
          </h2>

          <p className="text-sm text-[#53645A] leading-relaxed max-w-2xl">
            {contact.address} Situated in the northern corporate hub of Hyderabad, in close proximity to the Hitec City, Madhapur, and Gachibowli technology corridor.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 text-xs font-semibold">
            <a href="tel:+918766728514" className="text-[#082C24] hover:underline">
              Telephone: +91 87667 28514
            </a>
            <span className="text-[#DDD6C8]">&middot;</span>
            <a href="mailto:info@cajvr.com" className="text-[#082C24] hover:underline">
              Email: info@cajvr.com
            </a>
          </div>
        </section>

        <EngagementNote />
      </div>
    </main>
  );
}
