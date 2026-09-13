export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  context: string;
};

export const firm = {
  name: 'Jayavardhan & Co',
  designation: 'Chartered Accountants',
  headline: 'Clarity for the decisions ahead.',
  introduction: 'Audit, tax, compliance and business advisory. Explore the areas of practice at Jayavardhan & Co.',
} as const;

// Only user-confirmed categories. Descriptions explain each field, not engagement scope.
export const services: readonly Service[] = [
  { slug: 'audit-assurance', title: 'Audit & Assurance', shortTitle: 'Audit & Assurance', summary: 'Financial reporting, accountability and independent scrutiny.', context: 'Audit and assurance concern the credibility of information and the responsibilities surrounding it. The nature and scope of an engagement depend on the applicable framework and eligibility requirements.' },
  { slug: 'taxation', title: 'Taxation', shortTitle: 'Taxation', summary: 'Understanding tax obligations in the context of your decisions.', context: 'Tax considerations vary with the person, entity, transaction and period involved. An assessment begins with the relevant facts and the law applicable to those facts.' },
  { slug: 'gst', title: 'GST', shortTitle: 'GST', summary: 'A distinct focus on goods and services tax.', context: 'Goods and services tax considerations depend on the nature of supplies, business activities and applicable rules. Understanding the underlying transactions is an essential starting point.' },
  { slug: 'accounting-bookkeeping', title: 'Accounting & Bookkeeping', shortTitle: 'Accounting & Bookkeeping', summary: 'The financial records behind an informed business.', context: 'Accounting and bookkeeping concern the organisation and presentation of financial records. The relevant reporting framework and the needs of the business help define the work required.' },
  { slug: 'corporate-compliance', title: 'Corporate Compliance', shortTitle: 'Corporate Compliance', summary: 'Understanding the obligations that come with an entity.', context: 'Corporate obligations depend on an entity’s structure, activities and circumstances. Identifying those facts helps establish the applicable requirements and a suitable engagement scope.' },
  { slug: 'transfer-pricing-fema', title: 'Transfer Pricing & FEMA', shortTitle: 'Transfer Pricing & FEMA', summary: 'Considerations for related-party and cross-border transactions.', context: 'Transfer pricing and foreign exchange regulation are distinct areas that can intersect in cross-border activity. The parties, transaction structure and relevant jurisdictions shape the considerations involved.' },
  { slug: 'startup-advisory', title: 'Startup Advisory', shortTitle: 'Startup Advisory', summary: 'Financial and compliance considerations at the beginning.', context: 'Early business decisions carry financial and compliance implications. A useful starting point is a clear understanding of the business model, proposed structure and stage of development.' },
  { slug: 'virtual-cfo-business-advisory', title: 'Virtual CFO & Business Advisory', shortTitle: 'Virtual CFO & Business Advisory', summary: 'A financial perspective on business decisions.', context: 'Business advisory brings financial considerations into planning and decision-making. The nature of the business, available information and objectives determine the scope that may be appropriate.' },
];

export const engagement = {
  title: 'The right scope comes first.',
  description: 'Services are subject to an agreed scope, engagement acceptance and applicable professional requirements. Where audit and advisory work intersect, independence requirements may limit the services that can be undertaken.',
} as const;

export const navigation = [{ label: 'Home', href: '/' }, { label: 'About', href: '/about/' }, { label: 'Services', href: '/services/' }, { label: 'Contact', href: '/contact/' }] as const;
export type VerifiedContact = { email?: string; phone?: { display: string; href: `tel:${string}` }; address?: string };
// Confirmed directly by the user, 13 September 2026.
export const contact: VerifiedContact = { email: 'info@cajvr.com', phone: { display: '+91 87667 28514', href: 'tel:+918766728514' }, address: '703, Manjeera Trinity Corporate, KPHB, Hyderabad - 500 072.' };
export const professional = { name: 'CA Anumula Jayavardhan Rao', designation: 'Chartered Accountant' } as const;

export { serviceDetails } from './service-details.ts';
export type PartnerProfile = { name: string; designation: string; biography?: string };
// A name and designation are confirmed, but partner status/biographies are not.
export const partnerProfiles: readonly PartnerProfile[] = [];
export const visitorNeeds = [
  ['Understand audit requirements', 'audit-assurance'],
  ['Discuss tax matters', 'taxation'],
  ['Navigate GST requirements', 'gst'],
  ['Organise financial records', 'accounting-bookkeeping'],
  ['Understand corporate obligations', 'corporate-compliance'],
  ['Discuss cross-border matters', 'transfer-pricing-fema'],
  ['Plan a new business', 'startup-advisory'],
  ['Improve financial decision-making', 'virtual-cfo-business-advisory'],
] as const;
