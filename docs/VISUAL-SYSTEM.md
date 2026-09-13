# Visual system and shared components

## Tokens and layout

Exact palette: navy #14283F, ivory #F7F5F0, white #FFFFFF, charcoal #283340, gold #A08352, border #DDDCD6. Secondary text uses #52606E; control borders #74808B; errors #9B2828. Gold is decorative, not small text.

Source Serif 4 regular/italic and Inter 400/500/600 are bundled with next/font/local. Content is capped at 1240px, with 4px corners and 180ms interactions. Reduced-motion mode removes transitions and smooth scrolling. No intro loader, autoplay media or scroll interception is present.

## Components

- Header: text wordmark, four primary links, Services disclosure and requirements CTA. Native buttons support Enter/Space, normal Tab order, Escape close/focus return and outside-focus dismissal. Mobile menus are disclosures, not modal dialogs.
- Hero: navy editorial surface, controlled sentence wrapping, ivory primary CTA, secondary service link and a framed ivory architectural plate. The SVG and its captions are decorative and hidden from assistive technology.
- ServicePreview/ServiceGrid: numbered two-column editorial index on desktop, single column on mobile.
- SectionHeading, Breadcrumbs, Button, ButtonLink, TextLink: shared semantics and consistent spacing/focus.
- EngagementNote: shared acceptance and independence limitations.
- EnquiryForm: all required fields, validated service preselection, inline errors, status announcements, request locking, preserved entries and honest unavailability when not configured.
- TextInput, Textarea, Select, Checkbox: associated labels, hint/error IDs, required state, disabled/read-only support and visible focus.
- Footer: eight services, navigation, privacy and confirmed contact details only.

The service pages use native details/summary FAQs and a desktop enquiry sidebar. It becomes static at narrower widths; focused fields and headings are not covered by sticky navigation.

## Verification evidence

The current hero was visually inspected at 375, 768, 1024 and 1440px. At all four widths, measured document scroll width equalled client width. The mobile layout keeps the copy and CTAs before the illustration.

The earlier shared-navigation pass verified Enter, Tab, Return and Escape behavior, including restoring focus to mobile/service toggles. Contact details use mailto:info@cajvr.com and tel:+918766728514; no calls were made.

Contrast measurements: charcoal/ivory 11.77:1; secondary text/ivory 5.92:1; white/navy 14.95:1; light secondary/navy 10.87:1; control border/white 4.04:1; error text/white 7.70:1.

Server and validation tests use provider doubles. Live email receipt requires configured credentials and is not claimed by those tests. See the launch checklist for outstanding owner/provider work.
