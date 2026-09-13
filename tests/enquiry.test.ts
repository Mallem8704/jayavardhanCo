import test from 'node:test';
import assert from 'node:assert/strict';
import { services, serviceDetails, partnerProfiles } from '../lib/content.ts';
import { preselectedService, validateEnquiry } from '../lib/enquiry-validation.ts';
import { createEnquiryHandler, deliveryConfig, emailPayload, type DeliveryConfig } from '../lib/server/enquiry.ts';
const valid = { name: 'Test Visitor', email: 'visitor@example.test', phone: '', organisation: '', service: 'gst', message: 'I would like to discuss a business question.', website: '', requestId: 'c24bb360-cfdd-4517-9ae5-171c713bfbc1' };
const config: DeliveryConfig = { apiKey: 'test-key', from: 'website@example.test', to: 'firm@example.test', redisUrl: 'https://test.upstash.io', redisToken: 'test-token' };
function request(body: unknown = valid, origin = 'https://jayavardhanco.com') { return new Request('https://jayavardhanco.com/api/enquiry/', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify(body) }); }
function provider({ failEmail = false, failRedis = false, missingReceipt = false } = {}) {
  const cache = new Map<string,string>(); let calls = 0; let rate = 0;
  const fetcher: typeof fetch = async (url, init) => {
    const data = JSON.parse(String(init?.body));
    if (String(url).includes('api.resend.com')) { calls++; assert.ok(new Headers(init?.headers).get('Idempotency-Key')); return Response.json(missingReceipt ? {} : { id: 'test-delivery-receipt' }, { status: failEmail ? 500 : 200 }); }
    if (failRedis) return Response.json({}, { status: 503 });
    if (data[0] === 'EVAL' && data[1].includes("'INCR'")) return Response.json({ result: ++rate <= 5 ? 1 : 0 });
    if (data[0] === 'EVAL' && data[1].includes("return 'claimed'")) { const [,,, key, hash] = data; const previous = cache.get(key); if (!previous) { cache.set(key, 'pending:' + hash); return Response.json({ result: 'claimed' }); } return Response.json({ result: previous === 'done:' + hash ? 'done' : previous === 'pending:' + hash ? 'pending' : 'conflict' }); }
    if (data[0] === 'SET') { cache.set(data[1], data[2]); return Response.json({ result: 'OK' }); }
    if (data[0] === 'EVAL' && data[1].includes("'DEL'")) { cache.delete(data[3]); return Response.json({ result: 1 }); }
    throw new Error('Unexpected provider command');
  };
  return { fetcher, calls: () => calls };
}
test('all eight services have complete, distinct editorial content and valid related links', () => {
  assert.equal(services.length, 8); assert.equal(new Set(services.map(s => s.slug)).size, 8);
  for (const service of services) { const detail = serviceDetails[service.slug]; assert.ok(detail.introduction); assert.ok(detail.understanding.length >= 2); assert.ok(detail.needs.length >= 3); assert.ok(detail.discussion.length >= 3); assert.ok(detail.faqs.length >= 3 && detail.faqs.length <= 4); for (const slug of detail.related) assert.ok(services.some(s => s.slug === slug) && slug !== service.slug); }
  assert.equal(new Set(Object.values(serviceDetails).map(d => d.introduction)).size, 8); assert.deepEqual(partnerProfiles, []);
});
test('service preselection permits only the eight slugs and Not sure yet', () => { for (const s of services) assert.equal(preselectedService(s.slug), s.slug); assert.equal(preselectedService('not-sure'),'not-sure'); for (const value of ['unknown','<script>', ['gst'], null, undefined]) assert.equal(preselectedService(value),''); });
test('valid enquiry normalises whitespace and accepts optional fields', () => { assert.equal(validateEnquiry({ ...valid, name: '  Test Visitor  ' }).data?.name, 'Test Visitor'); });
test('required fields, lengths, header injection and honeypot are rejected', () => { for (const bad of [{ name: '' }, { email: 'bad' }, { email: 'visitor@example.test\r\nBcc:other@example.test' }, { message: 'short' }, { message: 'a'.repeat(2001) }, { name: 'a'.repeat(101) }, { phone: 'javascript:123' }, { service: 'unknown' }, { website: 'spam' }, { requestId: '../unsafe' }]) assert.equal(validateEnquiry({ ...valid, ...bad }).data, undefined); });
test('unconfigured provider fails closed', async () => { assert.equal(deliveryConfig({}), null); const response = await createEnquiryHandler({ config: () => null })(request()); assert.equal(response.status,503); assert.notEqual((await response.json()).success,true); });
test('invalid configured email and insecure Redis endpoint fail closed', () => { assert.equal(deliveryConfig({ RESEND_API_KEY: 'x', ENQUIRY_FROM_EMAIL: 'a@example.test\r\nBcc:x', ENQUIRY_TO_EMAIL: 'b@example.test', UPSTASH_REDIS_REST_URL: 'http://test.upstash.io', UPSTASH_REDIS_REST_TOKEN: 'x' }), null); });
test('server rejects cross-origin, malformed JSON, oversized bodies and invalid fields', async () => { const handler = createEnquiryHandler({ config: () => null }); assert.equal((await handler(request(valid,'https://evil.example'))).status,403); assert.equal((await handler(request({ ...valid, message: '' }))).status,422); assert.equal((await handler(request({ ...valid, message: 'a'.repeat(17000) }))).status,413); assert.equal((await handler(new Request('https://jayavardhanco.com/api/enquiry/',{method:'POST',headers:{Origin:'https://jayavardhanco.com','Content-Type':'application/json'},body:'not-json'}))).status,400); });
test('email construction uses plain text, validated reply-to and a fixed subject category', () => { const payload = emailPayload({ ...valid, message: '<script>alert(1)</script>' }, config); assert.equal(payload.reply_to, valid.email); assert.equal(payload.subject,'Website enquiry: GST'); assert.ok(!('html' in payload)); assert.ok(payload.text.includes('<script>')); });
test('success requires an actual provider receipt and repeated request is deduplicated', async () => { const stub = provider(); const handler = createEnquiryHandler({ config: () => config, fetcher: stub.fetcher }); assert.equal((await handler(request())).status,200); assert.equal((await handler(request())).status,200); assert.equal(stub.calls(),1); });
test('changed payload with the same request ID is rejected', async () => { const stub = provider(); const handler = createEnquiryHandler({ config: () => config, fetcher: stub.fetcher }); await handler(request()); assert.equal((await handler(request({...valid,message:'A different enquiry body.'}))).status,409); assert.equal(stub.calls(),1); });
test('email rejection, missing receipt and Redis outage never return fake success', async () => { for (const options of [{ failEmail: true }, { missingReceipt: true }, { failRedis: true }]) { const stub=provider(options); const response=await createEnquiryHandler({ config: () => config, fetcher: stub.fetcher })(request()); assert.equal(response.status,503); assert.notEqual((await response.json()).success,true); if(options.failRedis)assert.equal(stub.calls(),0); } });
test('rate limiting rejects excess requests without additional emails', async () => { const stub=provider();const handler=createEnquiryHandler({config:()=>config,fetcher:stub.fetcher}); for(let i=0;i<5;i++)await handler(request());const response=await handler(request());assert.equal(response.status,429);assert.equal(response.headers.get('retry-after'),'900');assert.equal(stub.calls(),1); });
test('network exception returns a safe error without exposing provider details', async () => { const response=await createEnquiryHandler({config:()=>config,fetcher:async()=>{throw new Error('private provider diagnostic');}})(request());assert.equal(response.status,503);assert.ok(!(await response.text()).includes('private provider')); });

test('simultaneous submissions are locked while the first email is pending', async () => {
  const stub=provider(); let release!: () => void; let announce!: () => void;
  const started=new Promise<void>(resolve=>{announce=resolve;});
  const gate=new Promise<void>(resolve=>{release=resolve;});
  const fetcher: typeof fetch=async(url,init)=>{if(String(url).includes('api.resend.com')){announce();await gate;}return stub.fetcher(url,init);};
  const handler=createEnquiryHandler({config:()=>config,fetcher});const first=handler(request());await started;
  assert.equal((await handler(request())).status,409);release();assert.equal((await first).status,200);assert.equal(stub.calls(),1);
});
test('failed delivery can be retried without changing the provider idempotency key', async () => {
  const stub=provider();const keys:string[]=[];let attempt=0;
  const fetcher:typeof fetch=async(url,init)=>{if(String(url).includes('api.resend.com')){keys.push(new Headers(init?.headers).get('Idempotency-Key')!);if(++attempt===1)return Response.json({}, {status:500});}return stub.fetcher(url,init);};
  const handler=createEnquiryHandler({config:()=>config,fetcher});assert.equal((await handler(request())).status,503);assert.equal((await handler(request())).status,200);assert.equal(keys[0],keys[1]);
});
