import { createHmac } from 'node:crypto';
import { validateEnquiry, validEmail, type Enquiry } from '../enquiry-validation.ts';
import { services } from '../content.ts';
export type DeliveryConfig = { apiKey: string; from: string; to: string; redisUrl: string; redisToken: string; ipHeader?: string };
export function deliveryConfig(env: Record<string, string | undefined> = process.env): DeliveryConfig | null {
  const { RESEND_API_KEY: apiKey, ENQUIRY_FROM_EMAIL: from, ENQUIRY_TO_EMAIL: to, UPSTASH_REDIS_REST_URL: redisUrl, UPSTASH_REDIS_REST_TOKEN: redisToken, TRUSTED_CLIENT_IP_HEADER: ipHeader } = env;
  if (!apiKey || !from || !to || !redisUrl || !redisToken || !validEmail(from) || !validEmail(to)) return null;
  try { const url = new URL(redisUrl); if (url.protocol !== 'https:' || url.username || url.password || !url.hostname.endsWith('.upstash.io')) return null; } catch { return null; }
  if (ipHeader && !/^[a-z0-9-]{1,60}$/.test(ipHeader)) return null;
  return { apiKey, from, to, redisUrl, redisToken, ipHeader };
}
export function emailPayload(data: Enquiry, config: DeliveryConfig) {
  const title = services.find(service => service.slug === data.service)?.title ?? 'Not sure yet';
  return { from: config.from, to: [config.to], reply_to: data.email, subject: `Website enquiry: ${title}`, text: [`Name: ${data.name}`, `Email: ${data.email}`, `Phone: ${data.phone || 'Not provided'}`, `Business or organisation: ${data.organisation || 'Not provided'}`, `Service: ${title}`, '', 'Enquiry:', data.message].join('\n') };
}
const RATE = "local a=redis.call('INCR',KEYS[1]); if a==1 then redis.call('EXPIRE',KEYS[1],900) end; local b=redis.call('INCR',KEYS[2]); if b==1 then redis.call('EXPIRE',KEYS[2],900) end; if a>5 or b>100 then return 0 end; return 1";
const CLAIM = "local v=redis.call('GET',KEYS[1]); if not v then redis.call('SET',KEYS[1],'pending:'..ARGV[1],'EX',90); return 'claimed' end; if v=='done:'..ARGV[1] then return 'done' end; if v=='pending:'..ARGV[1] then return 'pending' end; return 'conflict'";
const RELEASE = "if redis.call('GET',KEYS[1])=='pending:'..ARGV[1] then return redis.call('DEL',KEYS[1]) end; return 0";
export type HandlerOptions = { config: () => DeliveryConfig | null; fetcher?: typeof fetch; allowLocal?: boolean; trustedOrigins?: string[] };
export function createEnquiryHandler({ config: getConfig, fetcher = fetch, allowLocal = false, trustedOrigins = [] }: HandlerOptions) {
  return async function POST(request: Request): Promise<Response> {
    const reply = (status: number, message: string, extra: Record<string, unknown> = {}) => Response.json({ message, ...extra }, { status, headers: { 'Cache-Control': 'no-store', ...(status === 429 ? { 'Retry-After': '900' } : {}) } });
    const origin = request.headers.get('origin');
    const localOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000'];
    if (origin !== 'https://jayavardhanco.com' && !(origin && trustedOrigins.includes(origin)) && !(allowLocal && origin && localOrigins.includes(origin))) return reply(403, 'This request could not be accepted. Please use the contact page.');
    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return reply(415, 'Please use the enquiry form.');
    if (Number(request.headers.get('content-length')) > 16384) return reply(413, 'Your enquiry is too long. Please shorten it.');
    let input: unknown;
    try {
      const reader = request.body?.getReader(); if (!reader) return reply(400, 'Your enquiry could not be read.');
      const chunks: Uint8Array[] = []; let length = 0;
      while (true) { const { value, done } = await reader.read(); if (done) break; length += value.byteLength; if (length > 16384) { await reader.cancel(); return reply(413, 'Your enquiry is too long. Please shorten it.'); } chunks.push(value); }
      input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch { return reply(400, 'Your enquiry could not be read. Please try again.'); }
    const { data, errors } = validateEnquiry(input);
    if (!data) return reply(422, errors.website ? 'This enquiry could not be accepted.' : 'Please check the highlighted fields.', { errors });
    const config = getConfig();
    if (!config) return reply(503, 'Online enquiries are currently unavailable. Please email info@cajvr.com or call +91 87667 28514. Your message has not been sent.');
    const hash = (value: string) => createHmac('sha256', config.redisToken).update(value).digest('hex');
    const redis = async (command: (string | number)[]) => {
      const response = await fetcher(config.redisUrl, { method: 'POST', headers: { Authorization: `Bearer ${config.redisToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify(command), signal: AbortSignal.timeout(5000), cache: 'no-store' });
      if (!response.ok) throw new Error('Rate limit service unavailable');
      const body = await response.json() as { result?: unknown; error?: string }; if (body.error || body.result === undefined) throw new Error('Rate limit command failed'); return body.result;
    };
    // Only use a header explicitly guaranteed to be overwritten by the deployment proxy.
    // Otherwise all visitors share one conservative bucket; no untrusted IP bypass.
    const identity = config.ipHeader ? (request.headers.get(config.ipHeader)?.slice(0, 128) || 'shared') : 'shared';
    const idKey = `enquiry:request:${hash(data.requestId)}`;
    const payload = emailPayload(data, config);
    const fingerprint = hash(JSON.stringify(payload));
    let claimed = false;
    try {
      if (await redis(['EVAL', RATE, 2, `enquiry:rate:${hash(identity)}`, 'enquiry:rate:global']) !== 1) return reply(429, 'Too many enquiries have been attempted. Please wait 15 minutes or contact the firm directly.');
      const claim = await redis(['EVAL', CLAIM, 1, idKey, fingerprint]);
      if (claim === 'done') return reply(200, 'Your enquiry has already been accepted for delivery.', { success: true });
      if (claim === 'pending') return reply(409, 'This enquiry is still being processed. Please wait before trying again.');
      if (claim !== 'claimed') return reply(409, 'This request has changed. Please refresh the page before submitting a new enquiry.');
      claimed = true;
      const sent = await fetcher('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': `enquiry/${data.requestId}/${fingerprint}` }, body: JSON.stringify(payload), signal: AbortSignal.timeout(12000), cache: 'no-store' });
      if (!sent.ok) throw new Error('Delivery not confirmed');
      const receipt = await sent.json() as { id?: unknown }; if (typeof receipt.id !== 'string' || !receipt.id) throw new Error('Delivery receipt missing');
      await redis(['SET', idKey, `done:${fingerprint}`, 'EX', 86400]);
      return reply(200, 'Thank you. Your enquiry has been accepted for delivery to Jayavardhan & Co.', { success: true });
    } catch {
      if (claimed) { try { await redis(['EVAL', RELEASE, 1, idKey, fingerprint]); } catch { /* No personal data or provider response is logged. */ } }
      return reply(503, 'We could not confirm delivery. Your entries are still here. Please retry or email info@cajvr.com.');
    }
  };
}
