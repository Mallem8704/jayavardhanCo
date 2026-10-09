'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { services } from '@/lib/content';
import { limits, preselectedService, validateEnquiry, type Enquiry, type FieldErrors } from '@/lib/enquiry-validation';
import { TextInput, Select, Textarea } from '@/components/form-controls';
import { Button } from '@/components/ui';

export function EnquiryForm({ initialService, available }: { initialService: string; available: boolean }) {
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
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedback) statusRef.current?.focus();
  }, [feedback]);

  const change = (field: keyof Enquiry, value: string) => {
    setFields((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const validateCurrentStep = () => {
    if (step === 1) {
      if (!fields.service) {
        setErrors((prev) => ({ ...prev, service: 'Please select an area of practice.' }));
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!fields.message || fields.message.trim().length < 10) {
        setErrors((prev) => ({ ...prev, message: 'Please provide at least 10 characters describing your matter.' }));
        return false;
      }
      return true;
    }
    return true;
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locked.current || status === 'success') return;
    const form = event.currentTarget;
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
      else setStep(3);
      const key = Object.keys(validation.errors)[0];
      (form.elements.namedItem(key) as HTMLElement | null)?.focus();
      return;
    }

    if (!available) {
      setStatus('error');
      setFeedback(
        'Online enquiries are currently unavailable. Your message has not been sent. Please use the email or phone details alongside this form.'
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
            : 'We could not confirm delivery. Your entries are still here. Please try again.'
        );
      } else {
        setStatus('success');
        setFeedback(result.message);
      }
    } catch {
      setStatus('error');
      setFeedback('We could not confirm delivery. Your entries are still here. Check your connection and try again, or email the firm directly.');
    } finally {
      locked.current = false;
    }
  }

  const disabled = status === 'loading' || status === 'success';

  return (
    <form className="enquiry-form bg-white border border-[#DDD6C8] rounded-2xl p-6 sm:p-8 shadow-sm" onSubmit={submit} noValidate aria-busy={status === 'loading'}>
      {/* 3-Step Conversational Progress Indicator */}
      <div className="mb-6 pb-4 border-b border-[#DDD6C8]">
        <div className="flex items-center justify-between text-xs font-mono tracking-widest text-[#53645A] mb-2 uppercase">
          <span>Step {step} of 3</span>
          <span className="font-sans font-bold text-[#082C24]">
            {step === 1 && 'Practice Area'}
            {step === 2 && 'Business Details'}
            {step === 3 && 'Contact Info'}
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
        <div className="form-notice mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
          <h2 className="font-bold text-sm mb-1 text-amber-950">Online enquiries are currently unavailable.</h2>
          <p>
            Please email <a href="mailto:info@cajvr.com" className="underline font-medium">info@cajvr.com</a> or call{' '}
            <a href="tel:+918766728514" className="underline font-medium">+91 87667 28514</a>. This form is not sending messages at present.
          </p>
        </div>
      )}

      {/* STEP 1: What can we help with? */}
      <div className={step === 1 ? 'block space-y-4' : 'hidden'}>
        <div className="mb-2">
          <h3 className="font-serif text-xl sm:text-2xl text-[#082C24] font-normal">
            What can we help with?
          </h3>
          <p className="text-xs text-[#53645A] mt-1">
            Choose the service category you would like to discuss.
          </p>
        </div>

        {/* Standard Select (Maintained for accessibility and QA smoke tests) */}
        <Select
          id="service"
          name="service"
          label="Service of interest"
          required
          value={fields.service}
          onChange={(e) => change('service', e.target.value)}
          error={errors.service}
          disabled={disabled}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.title}
            </option>
          ))}
          <option value="not-sure">Not sure yet</option>
        </Select>

        <div className="pt-4 flex justify-end">
          <button
            type="button"
            onClick={() => {
              if (validateCurrentStep()) setStep(2);
            }}
            className="min-h-[48px] px-7 py-2.5 rounded-xl bg-[#082C24] text-[#F5F1E8] font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-[#051D18] transition-colors"
          >
            <span>Continue</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* STEP 2: Tell us about your business */}
      <div className={step === 2 ? 'block space-y-4' : 'hidden'}>
        <div className="mb-2">
          <h3 className="font-serif text-xl sm:text-2xl text-[#082C24] font-normal">
            Tell us about your business.
          </h3>
          <p className="text-xs text-[#53645A] mt-1">
            Share a brief outline of the matter and any relevant timelines.
          </p>
        </div>

        <TextInput
          id="organisation"
          name="organisation"
          label="Business or organisation (optional)"
          autoComplete="organization"
          maxLength={limits.organisation}
          value={fields.organisation}
          onChange={(e) => change('organisation', e.target.value)}
          error={errors.organisation}
          disabled={disabled}
        />

        <Textarea
          id="message"
          name="message"
          label="Brief message"
          required
          minLength={10}
          maxLength={limits.message}
          hint="Please do not submit passwords, bank details, tax documents, or other sensitive financial information through this form."
          value={fields.message}
          onChange={(e) => change('message', e.target.value)}
          error={errors.message}
          disabled={disabled}
        />

        <div className="pt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="min-h-[48px] px-5 py-2.5 rounded-xl border border-[#DDD6C8] text-xs font-semibold text-[#53645A] hover:bg-[#E8E0D1] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (validateCurrentStep()) setStep(3);
            }}
            className="min-h-[48px] px-7 py-2.5 rounded-xl bg-[#082C24] text-[#F5F1E8] font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-[#051D18] transition-colors"
          >
            <span>Continue</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* STEP 3: How can we reach you? */}
      <div className={step === 3 ? 'block space-y-4' : 'hidden'}>
        <div className="mb-2">
          <h3 className="font-serif text-xl sm:text-2xl text-[#082C24] font-normal">
            How can we reach you?
          </h3>
          <p className="text-xs text-[#53645A] mt-1">
            We confirm all details directly prior to engagement.
          </p>
        </div>

        <div className="form-row">
          <TextInput
            id="name"
            name="name"
            label="Full name"
            autoComplete="name"
            required
            maxLength={limits.name}
            value={fields.name}
            onChange={(e) => change('name', e.target.value)}
            error={errors.name}
            disabled={disabled}
          />
          <TextInput
            id="email"
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            required
            maxLength={limits.email}
            value={fields.email}
            onChange={(e) => change('email', e.target.value)}
            error={errors.email}
            disabled={disabled}
          />
        </div>

        <TextInput
          id="phone"
          name="phone"
          label="Phone (optional)"
          type="tel"
          autoComplete="tel"
          maxLength={limits.phone}
          value={fields.phone}
          onChange={(e) => change('phone', e.target.value)}
          error={errors.phone}
          disabled={disabled}
        />

        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            maxLength={200}
            value={fields.website}
            onChange={(e) => change('website', e.target.value)}
          />
        </div>

        <p className="form-privacy text-xs text-[#53645A]">
          Your details are used strictly to respond to your enquiry.{' '}
          <Link href="/privacy/" className="underline text-[#082C24]">
            Read how enquiry information is handled.
          </Link>
        </p>

        <div className="pt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep(2)}
            disabled={disabled}
            className="min-h-[48px] px-5 py-2.5 rounded-xl border border-[#DDD6C8] text-xs font-semibold text-[#53645A] hover:bg-[#E8E0D1] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>

          <Button type="submit" disabled={disabled}>
            {status === 'loading' ? 'Sending…' : status === 'success' ? 'Enquiry accepted' : 'Request a Conversation'}
          </Button>
        </div>
      </div>

      <div ref={statusRef} tabIndex={-1} className={`submission-status status-${status}`} role="status" aria-live="polite" aria-atomic="true">
        {feedback}
      </div>

      <noscript>
        <p className="text-xs text-[#53645A] mt-4">
          The enquiry form needs JavaScript. You can email info@cajvr.com or call +91 87667 28514 instead.
        </p>
      </noscript>
    </form>
  );
}
