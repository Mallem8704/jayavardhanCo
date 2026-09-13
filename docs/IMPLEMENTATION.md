# Implementation plan

1. Inspect the workspace and source website; preserve an existing stack. Workspace was empty, so use Next.js App Router, TypeScript, Tailwind CSS and Lucide.
2. Centralise confirmed firm identity and categories in a typed content module; keep unverified facts in an internal checklist.
3. Build a responsive editorial home page, service directory and category pages with consistent navigation, metadata and engagement guidance.
4. Validate production export, type safety, links, mobile navigation and responsive layout before handoff.

# Route map

| Route | Purpose |
| --- | --- |
| `/` | Firm introduction, eight practice areas, engagement guidance |
| `/services/` | Complete category directory |
| `/services/audit-assurance/` | Audit & Assurance |
| `/services/taxation/` | Taxation |
| `/services/gst/` | GST |
| `/services/accounting-bookkeeping/` | Accounting & Bookkeeping |
| `/services/corporate-compliance/` | Corporate Compliance |
| `/services/transfer-pricing-fema/` | Transfer Pricing & FEMA |
| `/services/startup-advisory/` | Startup Advisory |
| `/services/virtual-cfo-business-advisory/` | Virtual CFO & Business Advisory |
| Unmatched routes | Custom 404 |

# Architecture

`lib/content.ts` owns the public identity, typed service records and shared engagement text. Category pages are statically generated from those records. Server components are the default; only the responsive navigation is a client component. CSS tokens establish the theme; Tailwind v4 is configured for extension. System typography avoids third-party font requests. The typographic monogram is a design treatment, not an asserted existing firm logo.

No database or contact API is needed for the verified content. Do not add a contact form until its recipient, privacy handling and delivery integration are verified. No submissions are simulated. `docs/` is internal source documentation and is not included in the public static export.

## Shared visual system extension

The current design uses the exact requested palette and locally hosted Inter/Source Serif 4. See `docs/VISUAL-SYSTEM.md` for tokens, responsive behavior, components and future form integration. The wordmark is text only; the earlier monogram has been removed.

Additional routes: `/about/` for confirmed identity and practice context; `/contact/` for the confirmed professional name, office address, mailto link and telephone link. Navigation is Home | About | Services | Contact, with the primary action Discuss Your Requirements.
