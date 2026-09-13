# Visual system and shared components

## Tokens

- Navy `#14283F`, ivory `#F7F5F0`, white `#FFFFFF`, body `#283340`, gold `#A08352`, border `#DDDCD6`.
- Secondary text `#52606E`; control borders `#74808B`; error text `#9B2828`. Gold is reserved for decorative rules and underline accents, never small text.
- Source Serif 4 regular/italic and Inter 400/500/600 are bundled WOFF2 assets using next/font/local. No runtime font service requests.
- Content max 1240px; 4px corners; 180ms transitions; mobile navigation below 1100px; stacked editorial sections below 700px.
- Reduced-motion mode removes transitions and smooth scrolling. No entrance animations or delayed content.

## Component inventory

- `components/header.tsx`: text wordmark, four primary links, independent Services link and disclosure button, all eight categories, mobile disclosure and requirements CTA. Enter/Space activate native buttons; Tab follows links; Escape closes and restores toggle focus. Outside pointer and focus departure close menus. Navigation is a disclosure, not an ARIA application menu.
- `components/footer.tsx`: shared footer and optional verified contact renderer.
- `components/ui.tsx`: Button, ButtonLink, TextLink, SectionHeading and Breadcrumbs.
- `components/service-grid.tsx`: ServicePreview and ServiceGrid from the typed content model.
- `components/engagement-note.tsx`: consistent scope and independence guidance.
- `components/form-controls.tsx`: TextInput, Textarea, Select and Checkbox; required associated labels, optional hint/error IDs, aria-invalid, required state, disabled/read-only states, native keyboard interaction and visible focus. Use Button for form submission and supply type="submit" explicitly.

## Form integration

The shared form controls are ready to compose, but no enquiry form is exposed without a delivery backend and agreed data handling. Contact uses confirmed mailto and tel links. These open the visitor's email/phone application; they do not claim a message has been sent. Backend validation and success/error reporting must accompany any future submission endpoint.

Example:

```tsx
<TextInput id="email" name="email" label="Email address" type="email" autoComplete="email" required hint="Use the address where you want a reply." error={errors.email} />
```

Do not use placeholders in place of labels. Keep unique field IDs. Validate on the server when a delivery backend is introduced.

## Validation — 13 September 2026

- Production static build and TypeScript check pass for Home, About, Contact, directory and eight category pages.
- Browser checked at desktop 1440px, mobile 390px and narrow 320px. Measured document scroll width equals client width on tested Contact and category pages.
- Desktop service disclosure tested with Enter, Tab and Return; category navigation succeeded. Mobile service and navigation disclosures tested; Escape restored focus to the matching toggle.
- Text contrast: charcoal/ivory 11.77:1; secondary text/ivory 5.92:1; white/navy 14.95:1; secondary light/navy 10.87:1. Control border/white 4.04:1; error text/white 7.70:1. Gold is decorative only.
- Verified contact links point to mailto:info@cajvr.com and tel:+918766728514. No messages or calls were initiated during checks.
- Form controls are typed reusable primitives; end-to-end form submission is not implemented or claimed.
