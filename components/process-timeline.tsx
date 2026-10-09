'use client';

import { useState } from 'react';

const steps = [
  {
    num: '01',
    title: 'Tell us about your business.',
    summary: 'Describe your corporate activities, operational scale, and the background relevant to your enquiry.',
    detail: 'Whether you are an early-stage startup incorporating in Telangana, an established manufacturer handling multi-state GST, or a multinational with cross-border transfer pricing, context allows us to assign the right partner-led perspective.',
  },
  {
    num: '02',
    title: 'Identify what needs attention.',
    summary: 'Outline your specific questions, statutory deadlines, and any timing considerations.',
    detail: 'Clearly defining the regulatory framework—such as an upcoming statutory audit, direct tax assessment notice, FEMA FDI filing, or investor MIS requirement—ensures we assess the required deliverables accurately.',
  },
  {
    num: '03',
    title: 'Define scope & next steps.',
    summary: 'Agree upon clear terms, professional independence, and formal engagement deliverables.',
    detail: 'In strict adherence to ICAI standards and professional ethics, we agree on mutual expectations, engagement limitations, and verification requirements before commencing any advisory or assurance mandate.',
  },
];

export function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 sm:py-28 bg-[#082C24] text-[#F5F1E8] border-b border-white/10" aria-labelledby="process-title">
      <div className="shell max-w-5xl mx-auto">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#9DAF9F] font-semibold">
              Engagement Framework
            </span>
          </div>
          <h2 id="process-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F5F1E8] leading-[1.15]">
            A clear way forward.
          </h2>
          <p className="text-base sm:text-lg text-[#E8E0D1]/80 mt-3 font-normal">
            A little context helps frame an enquiry. Here is our structured starting point before any discussion.
          </p>
        </div>

        {/* Vertical Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Step Cards */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-2xl p-6 sm:p-7 border transition-all duration-300 ${
                    isActive
                      ? 'bg-[#051D18] border-[#C5A880] shadow-xl scale-[1.01]'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/25 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`font-mono text-xs tracking-widest ${
                        isActive ? 'text-[#C5A880] font-bold' : 'text-[#9DAF9F]'
                      }`}
                    >
                      STEP {step.num}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? 'bg-[#C5A880]' : 'bg-white/20'
                      }`}
                    />
                  </div>

                  <h3
                    className={`font-serif text-xl sm:text-2xl font-normal mb-2 transition-colors ${
                      isActive ? 'text-white' : 'text-[#E8E0D1]'
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#E8E0D1]/80 leading-relaxed font-normal">
                    {step.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Explanation of Active Milestone */}
          <div className="lg:col-span-5 bg-[#051D18] border border-white/10 rounded-2xl p-7 sm:p-8 relative overflow-hidden">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#9DAF9F] block mb-2">
              Engagement Detail
            </span>
            <div className="h-1 w-12 bg-[#C5A880] mb-6" />

            <h4 className="font-serif text-2xl text-[#F5F1E8] font-normal mb-4">
              {steps[activeStep].title}
            </h4>

            <p className="text-sm text-[#E8E0D1]/85 leading-relaxed font-normal mb-6">
              {steps[activeStep].detail}
            </p>

            <div className="pt-6 border-t border-white/10 text-xs text-[#9DAF9F] flex items-center justify-between font-mono">
              <span>MILESTONE {steps[activeStep].num} OF 03</span>
              <span className="text-white">ICAI COMPLIANT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
