# Implementation and route map

## Completed implementation

1. Retained the requested Next.js App Router, TypeScript, Tailwind CSS and Lucide foundation.
2. Built the six-section editorial homepage: architectural hero, two-column service index, needs-to-services guide, enquiry preparation, factual About preview and navy contact invitation.
3. Expanded all eight service pages with unique introductions, understanding, situations, discussion topics, three FAQs, related links and a preselected contact CTA.
4. Implemented About, optional verified partner profiles, the complete contact form, privacy notice, server validation and a configurable delivery boundary.
5. Added canonical metadata, sitemap, robots, locally rendered branded social image, verified structured data, security headers and default staging noindex.
6. Added tests and operational documentation. This version is local only: the user explicitly prohibited deployment without a separate request.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Six-section homepage |
| `/about/` | Verified firm/professional information and areas of practice |
| `/services/` | Eight-service editorial index |
| `/services/audit-assurance/` | Audit & Assurance |
| `/services/taxation/` | Taxation |
| `/services/gst/` | GST |
| `/services/accounting-bookkeeping/` | Accounting & Bookkeeping |
| `/services/corporate-compliance/` | Corporate Compliance |
| `/services/transfer-pricing-fema/` | Transfer Pricing & FEMA |
| `/services/startup-advisory/` | Startup Advisory |
| `/services/virtual-cfo-business-advisory/` | Virtual CFO & Business Advisory |
| `/contact/?service=gst` | Enquiry form with validated service preselection |
| `/privacy/` | Actual enquiry-processing notice |
| `/api/enquiry/` | POST-only server enquiry integration |
| `/sitemap.xml` | Canonical public route inventory |
| `/robots.txt` | Environment-specific crawler policy |
| `/opengraph-image` | Branded 1200 × 630 PNG |
| Unmatched routes | 404 page |

## Content and component architecture

`lib/content.ts` is the typed public-content entry point. It re-exports `serviceDetails` from `lib/service-details.ts`, where each service has structured educational copy, discussion topics, FAQs and related slugs. `partnerProfiles` supports optional verified profiles and is empty because partner status and biographies have not been confirmed. The confirmed name/designation are displayed separately without assigning an unverified role.

Server components render content, metadata and optional contact details. Client code is limited to responsive navigation, the enquiry form and the error boundary. Fonts are bundled locally through `next/font/local`. The architectural motif is decorative SVG geometry, not a professional emblem or purported office image.

The site now requires the Next.js Node server; a static export cannot serve the enquiry endpoint. The API validates and normalises fields, bounds payload size, rejects cross-origin submissions, checks a honeypot, applies atomic shared Redis limits and deduplication, and constructs a plain-text email. No provider is enabled in this workspace. Missing configuration returns an honest unavailable state; tests use provider doubles and never send email.

Internal `docs/`, tests and environment files are not public routes. Keep application source inaccessible to the public web server.
