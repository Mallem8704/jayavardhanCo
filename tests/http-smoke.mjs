import assert from 'node:assert/strict';
const base=process.env.QA_BASE_URL || 'http://127.0.0.1:3000';
const slugs=['audit-assurance','taxation','gst','accounting-bookkeeping','corporate-compliance','transfer-pricing-fema','startup-advisory','virtual-cfo-business-advisory'];
const pages=['/','/about/','/services/',...slugs.map(s=>'/services/'+s+'/'),'/contact/','/privacy/'];
const titles=new Set();
for(const path of pages){const response=await fetch(base+path);assert.equal(response.status,200,path);const html=await response.text();const title=html.match(/<title>([^<]+)<\/title>/)?.[1];assert.ok(title?.includes('Jayavardhan'),path+' title');assert.ok(!titles.has(title),path+' unique title');titles.add(title);assert.ok(html.includes('https://jayavardhanco.com'+path),path+' canonical');assert.match(html,/name="robots" content="[^"]*noindex/,path+' staging noindex');assert.ok(response.headers.get('x-content-type-options')==='nosniff');assert.ok(response.headers.get('content-security-policy'));for(const slug of slugs)assert.ok(html.includes('/services/'+slug+'/'),path+' footer '+slug);console.log('PASS '+path);}
const selected=await(await fetch(base+'/contact/?service=gst')).text();assert.match(selected,/<option[^>]*value="gst"[^>]*selected=""/);
const invalid=await(await fetch(base+'/contact/?service=unknown')).text();assert.match(invalid,/<option[^>]*value=""[^>]*selected=""/);
const sitemap=await(await fetch(base+'/sitemap.xml')).text();for(const path of pages)assert.ok(sitemap.includes('https://jayavardhanco.com'+path));
const robots=await(await fetch(base+'/robots.txt')).text();assert.ok(robots.includes('Disallow: /'));
const missing=await fetch(base+'/not-a-real-page/');assert.equal(missing.status,404);
const api=await fetch(base+'/api/enquiry/',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://jayavardhanco.com'},body:JSON.stringify({name:'QA Visitor',email:'visitor@example.test',phone:'',organisation:'',service:'gst',message:'A local validation check only.',website:'',requestId:'c24bb360-cfdd-4517-9ae5-171c713bfbc1'})});assert.equal(api.status,503);assert.notEqual((await api.json()).success,true);
const image=await fetch(base+'/opengraph-image');assert.equal(image.status,200);assert.ok(image.headers.get('content-type')?.startsWith('image/png'));const png=Buffer.from(await image.arrayBuffer());assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
console.log('PASS preselection, invalid query, sitemap, robots, 404, unavailable API and 1200x630 social PNG.');
