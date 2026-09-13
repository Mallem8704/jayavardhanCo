# Jayavardhan & Co

Complete local Next.js App Router implementation with TypeScript, Tailwind CSS, Lucide icons, locally hosted Inter/Source Serif 4, eight editorial service pages and a server-backed enquiry integration.

## Run

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000.

```sh
npm test
npm run lint
npm run typecheck
npm run build
npm run start
```

Stop the development server before starting production on the same port, or use `npm run start -- --port 3001`. Requires Node.js 24+. This application needs the Next.js server; do not deploy the obsolete static `out/` directory.

## Configuration and content

- `lib/content.ts`: verified firm details, service categories and optional profiles.
- `lib/service-details.ts`: unique service explanations, discussion topics, FAQs and related services.
- `docs/IMPLEMENTATION.md`: implementation and full route map.
- `docs/VISUAL-SYSTEM.md`: shared design and component guidance.
- `docs/DEPLOYMENT.md`: email/Redis setup, security, environment and operating instructions.
- `docs/CONTENT-VERIFICATION.md` and `docs/LAUNCH-CHECKLIST.md`: factual and owner review requirements.

Copy the variable names from `.env.example` into your secret configuration. Without valid email and Redis configuration, the form honestly shows online enquiries as unavailable. It never fabricates delivery. Direct email and phone links use confirmed details. Automated tests use provider doubles; live inbox delivery still requires configured credentials and an authorised test.

The existing source website could not be retrieved for a content audit. Public factual copy is based on the owner's confirmation. No site was deployed or published in this completion pass.
