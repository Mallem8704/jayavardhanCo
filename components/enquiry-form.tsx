'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { services } from '@/lib/content';
import { limits, preselectedService, validateEnquiry, type Enquiry, type FieldErrors } from '@/lib/enquiry-validation';
import { TextInput, Select, Textarea } from '@/components/form-controls';
import { Button } from '@/components/ui';
export function EnquiryForm({ initialService, available }: { initialService: string; available: boolean }) {
  const [fields, setFields] = useState<Enquiry>({ name: '', email: '', phone: '', organisation: '', service: preselectedService(initialService), message: '', website: '', requestId: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [feedback, setFeedback] = useState('');
  const locked = useRef(false);
  const retry = useRef<{ body: string; id: string } | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (feedback) statusRef.current?.focus(); }, [feedback]);
  const change = (field: keyof Enquiry, value: string) => { setFields(previous => ({ ...previous, [field]: value })); setErrors(previous => ({ ...previous, [field]: undefined })); };
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (locked.current || status === 'success') return;
    const form = event.currentTarget;
    const body = JSON.stringify({ ...fields, requestId: '' });
    const requestId = retry.current?.body === body ? retry.current.id : crypto.randomUUID();
    retry.current = { body, id: requestId };
    const payload = { ...fields, requestId };
    const validation = validateEnquiry(payload);
    setErrors(validation.errors);
    if (!validation.data) { setStatus('error'); setFeedback('Please check the highlighted fields.'); const key = Object.keys(validation.errors)[0]; (form.elements.namedItem(key) as HTMLElement | null)?.focus(); return; }
    if (!available) { setStatus('error'); setFeedback('Online enquiries are currently unavailable. Your message has not been sent. Please use the email or phone details alongside this form.'); return; }
    locked.current = true; setStatus('loading'); setFeedback('Sending your enquiry…');
    try {
      const response = await fetch('/api/enquiry/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: AbortSignal.timeout(25000) });
      const result = await response.json();
      if (!response.ok || result.success !== true) { setErrors(result.errors || {}); setStatus('error'); setFeedback(typeof result.message === 'string' ? result.message : 'We could not confirm delivery. Your entries are still here. Please try again.'); }
      else { setStatus('success'); setFeedback(result.message); }
    } catch { setStatus('error'); setFeedback('We could not confirm delivery. Your entries are still here. Check your connection and try again, or email the firm directly.'); }
    finally { locked.current = false; }
  }
  const disabled = status === 'loading' || status === 'success';
  return <form className="enquiry-form" onSubmit={submit} noValidate aria-busy={status === 'loading'}>
    {!available && <div className="form-notice"><h2>Online enquiries are currently unavailable.</h2><p>Please email <a href="mailto:info@cajvr.com">info@cajvr.com</a> or call <a href="tel:+918766728514">+91 87667 28514</a>. This form is not sending messages at present.</p></div>}
    <div className="form-row"><TextInput id="name" name="name" label="Full name" autoComplete="name" required maxLength={limits.name} value={fields.name} onChange={e => change('name', e.target.value)} error={errors.name} disabled={disabled}/><TextInput id="email" name="email" label="Email" type="email" autoComplete="email" required maxLength={limits.email} value={fields.email} onChange={e => change('email', e.target.value)} error={errors.email} disabled={disabled}/></div>
    <div className="form-row"><TextInput id="phone" name="phone" label="Phone (optional)" type="tel" autoComplete="tel" maxLength={limits.phone} value={fields.phone} onChange={e => change('phone', e.target.value)} error={errors.phone} disabled={disabled}/><TextInput id="organisation" name="organisation" label="Business or organisation (optional)" autoComplete="organization" maxLength={limits.organisation} value={fields.organisation} onChange={e => change('organisation', e.target.value)} error={errors.organisation} disabled={disabled}/></div>
    <Select id="service" name="service" label="Service of interest" required value={fields.service} onChange={e => change('service', e.target.value)} error={errors.service} disabled={disabled}><option value="">Select a service</option>{services.map(service => <option key={service.slug} value={service.slug}>{service.title}</option>)}<option value="not-sure">Not sure yet</option></Select>
    <Textarea id="message" name="message" label="Brief message" required minLength={10} maxLength={limits.message} hint="Please do not submit passwords, bank details, tax documents, or other sensitive financial information through this form." value={fields.message} onChange={e => change('message', e.target.value)} error={errors.message} disabled={disabled}/>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off" maxLength={200} value={fields.website} onChange={e => change('website', e.target.value)}/></div>
    <p className="form-privacy">Your details are used to respond to your enquiry. <Link href="/privacy/">Read how enquiry information is handled.</Link></p>
    <Button type="submit" disabled={disabled}>{status === 'loading' ? 'Sending…' : status === 'success' ? 'Enquiry accepted' : 'Send enquiry'}</Button>
    <div ref={statusRef} tabIndex={-1} className={`submission-status status-${status}`} role="status" aria-live="polite" aria-atomic="true">{feedback}</div>
    <noscript><p>The enquiry form needs JavaScript. You can email info@cajvr.com or call +91 87667 28514 instead.</p></noscript>
  </form>;
}
