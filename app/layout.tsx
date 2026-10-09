import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FloatingContactBar } from '@/components/floating-contact-bar';
import { firm, contact, services } from '@/lib/content';
import { isProductionSite, productionOrigin } from '@/lib/seo';
import './globals.css';

const inter = localFont({
  src: [
    { path: '../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2', weight: '400' },
    { path: '../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2', weight: '500' },
    { path: '../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2', weight: '600' },
  ],
  variable: '--font-sans',
  display: 'swap',
});

const serif = localFont({
  src: [
    { path: '../node_modules/@fontsource/source-serif-4/files/source-serif-4-latin-400-normal.woff2', weight: '400' },
    { path: '../node_modules/@fontsource/source-serif-4/files/source-serif-4-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(productionOrigin),
  title: {
    default: 'Jayavardhan & Co | Chartered Accountants in Hyderabad',
    template: '%s | Jayavardhan & Co',
  },
  description: `${firm.introduction} Located at KPHB, Hyderabad.`,
  robots: isProductionSite()
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true },
  other: {
    'geo.region': 'IN-TG',
    'geo.placename': 'Hyderabad',
    'geo.position': '17.4947;78.3880',
    'ICBM': '17.4947, 78.3880',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  '@id': `${productionOrigin}/#firm`,
  name: firm.name,
  alternateName: 'CA Jayavardhan & Co',
  legalName: 'Jayavardhan & Co Chartered Accountants',
  url: productionOrigin,
  logo: `${productionOrigin}/opengraph-image`,
  image: `${productionOrigin}/opengraph-image`,
  description: 'Chartered Accountants firm in KPHB, Hyderabad providing Audit, Taxation, GST, Corporate Compliance, Transfer Pricing, FEMA, and Business Advisory services.',
  telephone: contact.phone?.display,
  email: contact.email,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '703, Manjeera Trinity Corporate, KPHB',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500072',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 17.4947,
    longitude: 78.3880,
  },
  areaServed: [
    { '@type': 'City', name: 'Hyderabad' },
    { '@type': 'AdministrativeArea', name: 'Telangana' },
    { '@type': 'Country', name: 'India' },
  ],
  founder: {
    '@type': 'Person',
    name: 'CA Anumula Jayavardhan Rao',
    jobTitle: 'Chartered Accountant',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Chartered Accountancy & Business Advisory Services',
    itemListElement: services.map(s => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.title,
        description: s.summary,
        url: `${productionOrigin}/services/${s.slug}/`,
      },
    })),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        {children}
        <Footer />
        <FloatingContactBar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
      </body>
    </html>
  );
}

