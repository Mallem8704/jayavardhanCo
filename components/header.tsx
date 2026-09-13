'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { firm } from '@/lib/content';

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return <header className="header"><div className="shell header-inner">
    <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label={`${firm.name} home`}><span className="monogram" aria-hidden="true">J<span>&</span>C</span><span className="brand-name">{firm.name}<small>{firm.designation}</small></span></Link>
    <button className="menu-toggle" aria-expanded={open} aria-controls="navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    <nav id="navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
      <Link href="/" aria-current={path === '/' ? 'page' : undefined} onClick={() => setOpen(false)}>Home</Link>
      <Link href="/services/" aria-current={path.startsWith('/services') ? 'page' : undefined} onClick={() => setOpen(false)}>Our services</Link>
      <Link href="/#engagement" onClick={() => setOpen(false)}>Engagement approach</Link>
      <Link className="nav-cta" href="/services/" onClick={() => setOpen(false)}>Explore our practice <ArrowUpRight size={16}/></Link>
    </nav>
  </div></header>;
}
