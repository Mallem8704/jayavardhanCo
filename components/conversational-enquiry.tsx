'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Send, Check } from 'lucide-react';
import { services } from '@/lib/content';
import { limits, preselectedService, validateEnquiry, type Enquiry, type FieldErrors } from '@/lib/enquiry-validation';

export function ConversationalEnquiry({
  initialService = '',
  available = true,
}: {
  initialService?: string;
  available?: boolean;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fields, setFields] = useState<Enquiry>({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    service: preselectedService(initialService),
    message: '',
    website: '',
    requestId: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [feedback, setFeedback] = useState('');
  const locked = useRef(false);
  const retry = useRef<{ body: string; id: string } | null>(null);

  const change = (field: keyof Enquiry, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep1 = () => {
    if (!fields.service) {
      setErrors((prev) => ({ ...prev, service: 'Please choose an area of practice or select "Not sure yet".' }));
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!fields.message || fields.message.trim().length < 10) {
      setErrors((prev) => ({ ...prev, message: 'Please provide at least 10 characters describing your matter.' }));
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => (prev - 1) as 1 | 2);
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locked.current || status === 'success') return;

    const body = JSON.stringify({ ...fields, requestId: '' });
    const requestId = retry.current?.body === body ? retry.current.id : crypto.randomUUID();
    retry.current = { body, id: requestId };
    const payload = { ...fields, requestId };

    const validation = validateEnquiry(payload);
    setErrors(validation.errors);

    if (!validation.data) {
      setStatus('error');
      setFeedback('Please check the highlighted fields.');
      if (validation.errors.service) setStep(1);
      else if (validation.errors.message) setStep(2);
      return;
    }

    if (!available) {
      setStatus('error');
      setFeedback(
        'Online enquiries are currently unavailable. Please contact the firm directly via email (info@cajvr.com) or phone (+91 87667 28514).'
      );
      return;
    }

    locked.current = true;
    setStatus('loading');
    setFeedback('Transmitting your enquiry…');

    try {
      const response = await fetch('/api/enquiry/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        setErrors(result.errors || {});
        setStatus('error');
        setFeedback(
          typeof result.message === 'string'
            ? result.message
            : 'We could not confirm delivery. Please verify and try again.'
        );
      } else {
        setStatus('success');
        setFeedback(result.message || 'Your enquiry has been received. We will respond promptly.');
      }
    } catch {
      setStatus('error');
      setFeedback('We could not confirm delivery. Please check your connection or contact us directly.');
    } finally {
      locked.current = false;
    }
  }

  const disabled = status === 'loading' || status === 'success';

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-[#DDD6C8] rounded-3xl p-6 sm:p-10 shadow-xl">
      {/* Step Progress Tracker */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#53645A] mb-3">
          <span>STEP {step} OF 3</span>
          <span className="font-sans font-bold text-[#082C24]">
            {step === 1 && 'Practice Selection'}
            {step === 2 && 'Business Context'}
            {step === 3 && 'Contact Details'}
          </span>
        </div>
        <div className="h-1.5 w-full bg-[#E8E0D1] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#082C24] transition-all duration-300 rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {!available && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
          <p>
            Online enquiries are temporarily offline. Please reach us at{' '}
            <a href="mailto:info@cajvr.com" className="font-bold underline">
              info@cajvr.com
            </a>{' '}
            or call{' '}
            <a href="tel:+918766728514" className="font-bold underline">
              +91 87667 28514
            </a>
            .
          </p>
        </div>
      )}

      {status === 'success' ? (
        <div className="text-center py-10 space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
            <Check size={28} />
          </div>
          <h3 className="font-serif text-2xl text-[#082C24] font-normal">
            Enquiry Accepted
          </h3>
          <p className="text-sm text-[#53645A] max-w-md mx-auto leading-relaxed">
            {feedback}
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#082C24] text-[#F5F1E8] font-semibold text-xs tracking-wider uppercase"
            >
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} noValidate aria-busy={status === 'loading'}>
          {/* STEP 1: What can we help with? */}
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h3 className="font-serif text-2xl text-[#082C24] font-normal">
                  What can we help with?
                </h3>
                <p className="text-xs text-[#53645A] mt-1">
                  Choose the primary area of practice relevant to your requirement.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {services.map((s) => {
                  const isSelected = fields.service === s.slug;
                  return (
                    <button
                      key={s.slug}
                      type="button"
                      onClick={() => change('service', s.slug)}
                      className={`min-h-[50px] p-3.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#082C24] bg-[#082C24] text-[#F5F1E8] shadow-sm'
                          : 'border-[#DDD6C8] bg-[#F5F1E8]/50 hover:bg-[#E8E0D1] text-[#171A18]'
                      }`}
                    >
                      <span>{s.title}</span>
                      {isSelected && <CheckCircle2 size={16} className="text-[#C5A880]" />}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => change('service', 'not-sure')}
                  className={`min-h-[50px] p-3.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between sm:col-span-2 ${
                    fields.service === 'not-sure'
                      ? 'border-[#082C24] bg-[#082C24] text-[#F5F1E8]'
                      : 'border-[#DDD6C8] bg-[#F5F1E8]/50 hover:bg-[#E8E0D1] text-[#171A18]'
                  }`}
                >
                  <span>Not sure yet / Multi-service discussion</span>
                  {fields.service === 'not-sure' && <CheckCircle2 size={16} className="text-[#C5A880]" />}
                </button>
              </div>

              {errors.service && (
                <p className="text-xs text-[#9B2828] flex items-center gap-1.5 font-medium">
                  <AlertCircle size={14} />
                  <span>{errors.service}</span>
                </p>
              )}

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="min-h-[48px] px-7 py-3 rounded-xl bg-[#082C24] text-[#F5F1E8] font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-[#051D18] transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Tell us about your business. */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h3 className="font-serif text-2xl text-[#082C24] font-normal">
                  Tell us about your business.
                </h3>
                <p className="text-xs text-[#53645A] mt-1">
                  Share a brief outline of the matter and any relevant timelines.
                </p>
              </div>

              <div>
                <label htmlFor="organisation" className="block text-xs font-semibold text-[#082C24] mb-1.5">
                  Business or Entity Name (Optional)
                </label>
                <input
                  id="organisation"
                  type="text"
                  maxLength={limits.organisation}
                  value={fields.organisation}
                  onChange={(e) => change('organisation', e.target.value)}
                  placeholder="e.g. Acme Tech Solutions Pvt Ltd"
                  className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-[#DDD6C8] bg-[#F5F1E8]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#082C24]"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-[#082C24] mb-1.5">
                  Brief Context or Question <span className="text-[#9B2828]">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  maxLength={limits.message}
                  value={fields.message}
                  onChange={(e) => change('message', e.target.value)}
                  placeholder="Please describe your requirements, transaction scale, or questions. Do not enter passwords or bank credentials."
                  className="w-full p-4 rounded-xl border border-[#DDD6C8] bg-[#F5F1E8]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#082C24]"
                />
                {errors.message && (
                  <p className="text-xs text-[#9B2828] mt-1 flex items-center gap-1.5 font-medium">
                    <AlertCircle size={14} />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="min-h-[48px] px-5 py-3 rounded-xl border border-[#DDD6C8] text-xs font-semibold text-[#53645A] hover:bg-[#E8E0D1] flex items-center gap-2"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="min-h-[48px] px-7 py-3 rounded-xl bg-[#082C24] text-[#F5F1E8] font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-[#051D18]"
                >
                  <span>Continue</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: How can we reach you? */}
          {step === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h3 className="font-serif text-2xl text-[#082C24] font-normal">
                  How can we reach you?
                </h3>
                <p className="text-xs text-[#53645A] mt-1">
                  We verify all enquiries before scheduling a partner discussion.
                </p>
              </div>

              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-[#082C24] mb-1.5">
                  Full Name <span className="text-[#9B2828]">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  maxLength={limits.name}
                  value={fields.name}
                  onChange={(e) => change('name', e.target.value)}
                  placeholder="e.g. Ramesh Reddy"
                  className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-[#DDD6C8] bg-[#F5F1E8]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#082C24]"
                />
                {errors.name && (
                  <p className="text-xs text-[#9B2828] mt-1 font-medium">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#082C24] mb-1.5">
                    Email Address <span className="text-[#9B2828]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    maxLength={limits.email}
                    value={fields.email}
                    onChange={(e) => change('email', e.target.value)}
                    placeholder="name@company.com"
                    className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-[#DDD6C8] bg-[#F5F1E8]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#082C24]"
                  />
                  {errors.email && (
                    <p className="text-xs text-[#9B2828] mt-1 font-medium">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-[#082C24] mb-1.5">
                    Phone (Optional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={limits.phone}
                    value={fields.phone}
                    onChange={(e) => change('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-[#DDD6C8] bg-[#F5F1E8]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#082C24]"
                  />
                  {errors.phone && (
                    <p className="text-xs text-[#9B2828] mt-1 font-medium">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Honeypot anti-spam */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  value={fields.website}
                  onChange={(e) => change('website', e.target.value)}
                />
              </div>

              {status === 'error' && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-[#9B2828] flex items-start gap-2">
                  <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                  <span>{feedback}</span>
                </div>
              )}

              <p className="text-[11px] text-[#53645A]">
                Your information is handled strictly in accordance with our{' '}
                <Link href="/privacy/" className="underline text-[#082C24]">
                  Privacy Notice
                </Link>
                .
              </p>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={disabled}
                  className="min-h-[48px] px-5 py-3 rounded-xl border border-[#DDD6C8] text-xs font-semibold text-[#53645A] hover:bg-[#E8E0D1] flex items-center gap-2"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={disabled}
                  className="min-h-[48px] px-8 py-3 rounded-xl bg-[#082C24] text-[#F5F1E8] font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-[#051D18] disabled:opacity-50 transition-colors shadow-md"
                >
                  <Send size={14} />
                  <span>{status === 'loading' ? 'Sending…' : 'Request a Conversation'}</span>
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
