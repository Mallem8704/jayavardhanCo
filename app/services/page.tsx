import type { Metadata } from 'next';
import { ServiceGrid } from '@/components/service-grid';
import { engagement } from '@/lib/content';
export const metadata: Metadata = { title: 'Our services', description: 'Explore eight areas of practice at Jayavardhan & Co, from audit and taxation to business advisory.' };
export default function Services() { return <main id="main"><section className="page-intro"><div className="shell"><p className="eyebrow">Our services</p><h1>A clear place to start.</h1><p>Explore our areas of practice to find the subject relevant to your business.</p></div></section><section className="shell section"><ServiceGrid/><aside className="scope-note"><h2>{engagement.title}</h2><p>{engagement.description}</p></aside></section></main>; }
