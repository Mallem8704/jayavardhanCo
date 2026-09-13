import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { firm } from '@/lib/content';
import './globals.css';
export const metadata: Metadata = { title: { default: 'Jayavardhan & Co | Chartered Accountants', template: '%s | Jayavardhan & Co' }, description: firm.introduction };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Header/>{children}<footer><div className="shell footer-top"><div><Link href="/" className="footer-brand">{firm.name}</Link><p>{firm.designation}</p></div><div className="footer-links"><Link href="/services/">Our services</Link><Link href="/#engagement">Engagement approach</Link></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} {firm.name}</span><span>Information on this website is general and is not professional advice.</span></div></footer></body></html>;
}
