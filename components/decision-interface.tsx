'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { services } from '@/lib/content';

interface DecisionOption {
  label: string;
  slug: string;
  recommended: string;
  explanation: string;
  keyOutcomes: string[];
}

const decisionOptions: DecisionOption[] = [
  {
    label: 'I need an audit',
    slug: 'audit-assurance',
    recommended: 'AUDIT & ASSURANCE',
    explanation:
      'We provide independent scrutiny and verification of financial records, helping boards and stakeholders ensure statutory compliance and reporting credibility.',
    keyOutcomes: ['Statutory Financial Audit', 'Internal Controls Review', 'Board & Investor Transparency'],
  },
  {
    label: 'I have a tax question',
    slug: 'taxation',
    recommended: 'DIRECT TAXATION',
    explanation:
      'We assist individuals and corporations with income tax planning, advance tax computation, assessment defenses, and appellate matters under the Income Tax Act.',
    keyOutcomes: ['Corporate Tax Return Filing', 'Scrutiny & Notice Support', 'Tax Planning & Advisory'],
  },
  {
    label: 'I need GST support',
    slug: 'gst',
    recommended: 'GST COMPLIANCE',
    explanation:
      'From monthly GSTR filings and input tax credit reconciliations to departmental audits and notices, we ensure error-free indirect tax compliance.',
    keyOutcomes: ['GSTR-1 & 3B Reconciliation', 'Annual Return (Form 9/9C)', 'Input Tax Credit Optimization'],
  },
  {
    label: 'I need bookkeeping',
    slug: 'accounting-bookkeeping',
    recommended: 'ACCOUNTING & BOOKKEEPING',
    explanation:
      'We maintain structured, audit-ready financial records ensuring periodic management reporting, ledger sanity, and seamless statutory audit preparation.',
    keyOutcomes: ['Management Information Systems (MIS)', 'Audit-Ready Ledgers', 'Bank & Vendor Reconciliations'],
  },
  {
    label: 'I need company compliance support',
    slug: 'corporate-compliance',
    recommended: 'CORPORATE COMPLIANCE',
    explanation:
      'We guide companies through Ministry of Corporate Affairs (MCA) requirements, annual filings, board resolutions, and secretarial disclosures under the Companies Act.',
    keyOutcomes: ['Annual MCA / ROC Filings', 'Statutory Registers & Resolutions', 'Director KYC & Compliance'],
  },
  {
    label: 'I have cross-border transactions',
    slug: 'transfer-pricing-fema',
    recommended: 'TRANSFER PRICING & FEMA',
    explanation:
      'We handle complex cross-border transactions, RBI foreign investment reporting (FC-GPR / ODI), and transfer pricing benchmarking studies.',
    keyOutcomes: ['Form FC-GPR / SMF Filing', 'Transfer Pricing Study', 'RBI Inbound / Outbound FDI Support'],
  },
  {
    label: 'I’m starting a company',
    slug: 'startup-advisory',
    recommended: 'STARTUP ADVISORY',
    explanation:
      'We help founders understand the financial, tax, and compliance requirements of building a business—from incorporation to initial equity structuring.',
    keyOutcomes: ['Entity Selection & Incorporation', 'DPIIT Startup Recognition', 'Founder Cap Table & Tax Structuring'],
  },
  {
    label: 'I need better financial visibility',
    slug: 'virtual-cfo-business-advisory',
    recommended: 'VIRTUAL CFO & ADVISORY',
    explanation:
      'We deliver strategic financial leadership for scaling businesses—runway modeling, cash flow governance, and MIS structuring without the cost of a full in-house team.',
    keyOutcomes: ['Cash Runway & Burn Governance', 'Financial Modeling & Projections', 'Executive Decision Support'],
  },
];

export function DecisionInterface() {
  const [selected, setSelected] = useState<DecisionOption>(decisionOptions[6]); // Defaults to 'I’m starting a company'

  const activeService = services.find((s) => s.slug === selected.slug);

  return (
    <section className="py-20 sm:py-28 bg-[#F5F1E8] text-[#171A18] border-b border-[#DDD6C8]" aria-labelledby="decision-title">
      <div className="shell max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#082C24]" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#53645A] font-semibold">
              Find Your Starting Point
            </span>
          </div>
          <h2 id="decision-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-[#082C24]">
            Where should we begin?
          </h2>
          <p className="text-base sm:text-lg text-[#53645A] mt-3 font-normal">
            Choose what best describes what you need help with.
          </p>
        </div>

        {/* Selectable Pills Grid */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-10">
          {decisionOptions.map((option) => {
            const isCurrent = selected.label === option.label;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => setSelected(option)}
                aria-pressed={isCurrent}
                className={`min-h-[48px] px-5 py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 text-left flex items-center gap-2.5 ${
                  isCurrent
                    ? 'bg-[#082C24] text-[#F5F1E8] shadow-md -translate-y-0.5'
                    : 'bg-[#E8E0D1]/60 text-[#171A18] hover:bg-[#E8E0D1] border border-[#DDD6C8]'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    isCurrent ? 'bg-[#C5A880]' : 'bg-[#7F8E84]'
                  }`}
                  aria-hidden="true"
                />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>

        {/* DYNAMIC RECOMMENDED SERVICE RESULT CARD */}
        <div className="rounded-2xl bg-white border border-[#DDD6C8] p-6 sm:p-10 shadow-lg relative overflow-hidden transition-all duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#DDD6C8]">
            <div>
              <span className="inline-block text-[11px] font-mono tracking-widest text-[#53645A] uppercase mb-1">
                You selected: &ldquo;{selected.label}&rdquo;
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest font-bold text-[#C5A880]">
                  Recommended Practice
                </span>
                <span className="text-[#DDD6C8]">&middot;</span>
                <span className="text-xs font-mono text-[#53645A]">
                  0{services.findIndex((s) => s.slug === selected.slug) + 1}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#082C24] font-normal mt-1">
                {activeService?.title || selected.recommended}
              </h3>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/services/${selected.slug}/`}
                className="btn-forest min-h-[48px] px-6 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-sm transition-colors"
              >
                <span className="text-[#F5F1E8]">Explore {activeService?.shortTitle || 'Service'}</span>
                <ArrowRight size={14} className="text-[#F5F1E8]" />
              </Link>

              <Link
                href={`/contact/?service=${selected.slug}`}
                className="min-h-[48px] px-6 py-3 rounded-xl border border-[#082C24]/30 text-[#082C24] font-semibold text-xs tracking-wider uppercase hover:bg-[#E8E0D1] flex items-center gap-1.5 transition-colors"
              >
                <span>Speak to us</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <p className="md:col-span-7 text-sm sm:text-base text-[#53645A] leading-relaxed">
              {selected.explanation}
            </p>

            <div className="md:col-span-5 bg-[#F5F1E8] p-4 rounded-xl border border-[#DDD6C8]">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#082C24] block mb-2">
                Typical Engagement Focus
              </span>
              <ul className="space-y-1.5 text-xs text-[#171A18]">
                {selected.keyOutcomes.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#082C24] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
