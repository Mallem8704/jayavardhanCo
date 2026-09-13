# Jayavardhan & Co

Responsive Next.js App Router website using TypeScript, Tailwind CSS v4 and Lucide icons. Source Serif 4 and Inter are bundled locally through next/font/local.

## Run

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. `npm run build` creates a static site in `out/`. Serve that directory with a static host supporting directory indexes and a custom `404.html`. `npm run typecheck` checks TypeScript.

Public content and verified contact details are in `lib/content.ts`. The implementation plan and route map are in `docs/IMPLEMENTATION.md`; factual review requirements are in `docs/CONTENT-VERIFICATION.md`; component usage and validation notes are in `docs/VISUAL-SYSTEM.md`.

Routes: Home, About, Services, eight service category pages and Contact. The supplied source website could not be retrieved during the initial audit. Firm identity, categories and contact information are based on the user's explicit confirmation. Contact actions use email and telephone links; no enquiry delivery backend or analytics are configured. Accessible form controls are available for future integration.
