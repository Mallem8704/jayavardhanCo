import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { firm, contact } from '@/lib/content';
import { isProductionSite, productionOrigin } from '@/lib/seo';
import './globals.css';
const inter = localFont({ src: [
  { path: '../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2', weight: '400' },
  { path: '../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2', weight: '500' },
  { path: '../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2', weight: '600' },
], variable: '--font-sans', display: 'swap' });
const serif = localFont({ src: [
  { path: '../node_modules/@fontsource/source-serif-4/files/source-serif-4-latin-400-normal.woff2', weight: '400' },
  { path: '../node_modules/@fontsource/source-serif-4/files/source-serif-4-latin-400-italic.woff2', weight: '400', style: 'italic' },
], variable: '--font-serif', display: 'swap' });
export const metadata: Metadata = { metadataBase: new URL(productionOrigin), title: { default: 'Jayavardhan & Co | Chartered Accountants', template: '%s | Jayavardhan & Co' }, description: firm.introduction, robots: isProductionSite() ? { index: true, follow: true } : { index: false, follow: false, noarchive: true } };
const structuredData = { '@context': 'https://schema.org', '@type': 'AccountingService', '@id': `${productionOrigin}/#firm`, name: firm.name, url: productionOrigin, email: contact.email, telephone: contact.phone?.display, address: { '@type': 'PostalAddress', streetAddress: '703, Manjeera Trinity Corporate, KPHB', addressLocality: 'Hyderabad', postalCode: '500072' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className={`${inter.variable} ${serif.variable}`}><body><a className="skip-link" href="#main">Skip to content</a><Header/>{children}<Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}/></body></html>; }
