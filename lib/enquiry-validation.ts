import { services } from './content.ts';
export const limits = { name: 100, email: 254, phone: 30, organisation: 160, message: 2000 } as const;
export type Enquiry = { name: string; email: string; phone: string; organisation: string; service: string; message: string; website: string; requestId: string };
export type FieldErrors = Partial<Record<keyof Enquiry, string>>;
export const allowedService = (value: unknown): value is string => typeof value === 'string' && (value === 'not-sure' || services.some(s => s.slug === value));
export function preselectedService(value: unknown): string { return allowedService(value) ? value : ''; }
export const validEmail = (value: string) => value.length <= 254 && /^[^\s<>@\r\n]+@[^\s<>@\r\n]+\.[^\s<>@\r\n]+$/.test(value);
export function validateEnquiry(input: unknown): { data?: Enquiry; errors: FieldErrors } {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { errors: { message: 'Please provide your enquiry details.' } };
  const raw = input as Record<string, unknown>;
  const read = (key: string) => typeof raw[key] === 'string' ? raw[key].trim() : '';
  const data: Enquiry = { name: read('name'), email: read('email'), phone: read('phone'), organisation: read('organisation'), service: read('service'), message: read('message'), website: read('website'), requestId: read('requestId') };
  const errors: FieldErrors = {};
  for (const field of ['name','email','phone','organisation'] as const) {
    if (data[field].length > limits[field]) errors[field] = `Use no more than ${limits[field]} characters.`;
    if (/[\r\n\x00-\x1F\x7F]/.test(data[field])) errors[field] = 'Use a single line of text.';
  }
  if (!data.name) errors.name = 'Enter your full name.';
  if (!validEmail(data.email)) errors.email = 'Enter a valid email address.';
  if (data.phone && !/^[+()\d\s.-]{5,30}$/.test(data.phone)) errors.phone = 'Enter a valid phone number or leave this blank.';
  if (!allowedService(data.service)) errors.service = 'Choose a service or “Not sure yet”.';
  if (data.message.length < 10) errors.message = 'Please write at least 10 characters about your enquiry.';
  if (data.message.length > limits.message) errors.message = `Use no more than ${limits.message} characters.`;
  if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(data.message)) errors.message = 'Remove unsupported control characters.';
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(data.requestId)) errors.requestId = 'Refresh this page before trying again.';
  if (data.website) errors.website = 'This enquiry could not be accepted.';
  return Object.keys(errors).length ? { errors } : { data, errors };
}
