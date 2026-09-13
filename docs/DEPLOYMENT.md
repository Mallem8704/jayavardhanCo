# Deployment and enquiry operations

## Local preview

Use Node.js 24 or later. Run `npm ci`, then `npm run dev`; open http://127.0.0.1:3000. For a production-mode local check, run `npm run build` then `npm run start` (stop the development server first if using the same port). `npm run start -- --port 3001` uses a separate port.

This is now a Node-server Next.js application, not a static export. A host must support Next.js route handlers and server rendering. The old `out/` export is obsolete and must not be deployed. No deployment was performed; obtain an explicit user request before publishing or changing any domain.

## Environment variables

Copy `.env.example` to ignored `.env.local` for development or configure variables in the hosting secret manager. Never paste secrets into public content, client variables, Git or screenshots. The example contains names only, no secrets or invented email identities.

- `SITE_ENVIRONMENT`: leave unset or set to `staging` for every preview. Set to `production` only for the approved live site at https://jayavardhanco.com. This controls robots metadata, robots.txt, X-Robots-Tag and HSTS. Rebuild after changing it.
- `RESEND_API_KEY`: server-only key permitted to send mail from the verified sender domain.
- `ENQUIRY_FROM_EMAIL`: plain email address on the sender domain verified with Resend. Do not use the visitor's email as From.
- `ENQUIRY_TO_EMAIL`: approved firm recipient; the user confirmed info@cajvr.com for public contact. Confirm that this is the inbox intended for website enquiries.
- `UPSTASH_REDIS_REST_URL`: HTTPS REST endpoint for the firm's Upstash Redis database; expected hostname ends in `.upstash.io`.
- `UPSTASH_REDIS_REST_TOKEN`: server-only Redis command token with GET, SET, INCR, EXPIRE, DEL and EVAL access.
- `TRUSTED_CLIENT_IP_HEADER`: optional lowercase header that the chosen hosting proxy guarantees it overwrites with the real client address. Do not set this based merely on a header name suggested by a visitor. When unset, all visitors share a conservative rate bucket.

All delivery and Redis variables must be valid before the form is marked available. Never use NEXT_PUBLIC_ names for these secrets. The browser only receives an availability boolean.

## Provider setup and verification

1. Configure the owner's Resend account and verified sender domain, including its requested DNS records. This has not been performed by this build.
2. Configure the approved sender and recipient and the Redis REST credentials. Redis is required to avoid bypassing rate limits across multiple server instances.
3. Review provider processing/retention arrangements and complete the privacy review in the launch checklist.
4. Run the automated tests, lint, type check and production build.
5. On an authorised test environment, submit one explicitly approved non-sensitive test enquiry, verify the provider response and check the recipient inbox. No real test email has been sent in this session. A provider ID confirms acceptance, not mailbox arrival or reading.
6. Confirm failure behavior, repeated-click prevention and retry handling. Test with an incorrect key in a nonproduction environment if appropriate; restore valid secrets afterward.

API origin policy accepts the confirmed production origin. Development also allows localhost and 127.0.0.1 on port 3000. If an authenticated staging environment needs live delivery, deliberately add its trusted origin to the server policy and test it; do not allow arbitrary request Host/Origin values.

## Rate limiting and idempotency

Redis atomically enforces five valid attempts per client bucket per 15 minutes, plus 100 globally per 15 minutes. Unconfigured client-header trust shares the five-attempt bucket across all visitors. A front proxy should additionally cap total request rates and slow request bodies. The application caps the streamed body at 16 KB.

Rate keys and payload fingerprints use HMAC; raw IP addresses and messages are not stored in Redis. Processing locks expire after 90 seconds. Completed identifiers expire after 24 hours. The email provider receives an idempotency key for safe retries after ambiguous network failures. The browser preserves its request ID for an unchanged retry and disables submission immediately during a pending request and after success. A changed payload using the same ID is rejected by the server.

Email is plain text; the subject comes from a fixed allowed service title. Newlines are rejected in single-line fields. The reply-to address is validated. User text is never concatenated into HTML, recipient headers or a shell command. Application code does not log body contents, personal information, provider responses or credentials. Review hosting logs separately.

## Security, SEO and performance

Security headers are configured in `next.config.ts`: nosniff, no embedding, restricted referrer/permissions policies and CSP. CSP permits inline scripts/styles because Next.js hydration and generated styles require them in this architecture; it is not a strict nonce-based policy. Restrict any new third-party assets explicitly. Production HSTS is set only when the site is intentionally configured as production over HTTPS.

Staging defaults to noindex/nofollow/noarchive and robots Disallow. These are crawler instructions, not authentication; protect staging with host-level access control when needed. Canonicals and the sitemap use the domain supplied by the owner. No guessed social profiles, ratings, coordinates, qualifications or opening hours are included in JSON-LD.

Inter and Source Serif 4 are hosted with the application. The branded social PNG is generated at build time using the same locally installed fonts. No trackers, external font fetches or animation packages are used. The architectural SVG reserves its aspect ratio. Keep the font packages available at build time.

Official integration references checked during implementation:
- Resend send-email API: https://resend.com/docs/api-reference/emails/send-email
- Resend idempotency: https://resend.com/docs/dashboard/emails/idempotency-keys
- Upstash REST API: https://upstash.com/docs/redis/features/restapi

## Vercel and GitHub deployment

The owner subsequently authorised pushing all project source to https://github.com/Mallem8704/jayavardhanCo.git and deploying to Vercel. This supersedes the earlier local-only restriction for that destination. Preserve the default noindex policy on the generated vercel.app domain; attaching or replacing the existing domain is a separate step.

`vercel.json` selects Next.js with npm ci and npm run build. package.json pins Node 24.x. Import the GitHub repository into Vercel or use its authenticated CLI. The enquiry API allows exact Vercel domains supplied by the trusted VERCEL_URL and VERCEL_PROJECT_PRODUCTION_URL system variables, in addition to the confirmed existing domain. It never trusts arbitrary request origins.
