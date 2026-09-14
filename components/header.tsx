'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { firm, navigation, services } from '@/lib/content';
import { ButtonLink } from '@/components/ui';
export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const servicesToggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const path = usePathname();
  const close = () => { setOpen(false); setServicesOpen(false); };
  useEffect(() => {
    const onPointer = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) { setOpen(false); setServicesOpen(false); } };
    const query = window.matchMedia('(min-width: 1100px)');
    const reset = () => { setOpen(false); setServicesOpen(false); };
    document.addEventListener('pointerdown', onPointer); query.addEventListener('change', reset);
    return () => { document.removeEventListener('pointerdown', onPointer); query.removeEventListener('change', reset); };
  }, []);
  const current = (href: string) => href === '/' ? path === '/' : path.startsWith(href.replace(/\/$/, ''));
  return <header className="header" ref={header} onKeyDown={event => { if (event.key === 'Escape') { if (servicesOpen) { setServicesOpen(false); servicesToggle.current?.focus(); } else if (open) { setOpen(false); toggle.current?.focus(); } } }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) close(); }}><div className="shell header-inner">
    <Link href="/" className="brand" onClick={close} aria-label={`${firm.name}, home`}><span className="header-logo"><Image src="/ca-india.png" width={1280} height={905} sizes="240px" alt="CA India" loading="eager" /></span><span className="brand-name">{firm.name}<small>{firm.designation}</small></span></Link>
    <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => { setOpen(!open); setServicesOpen(false); }}>{open ? <X aria-hidden="true"/> : <Menu aria-hidden="true"/>}</button>
    <nav id="navigation" className={`navigation${open ? ' is-open' : ''}`} aria-label="Main navigation">
      {navigation.map(item => item.href === '/services/' ? <div className="services-disclosure" key={item.href}><div className="services-nav-label"><Link href={item.href} aria-current={current(item.href) ? 'page' : undefined} onClick={close}>{item.label}</Link><button ref={servicesToggle} className="services-toggle" aria-label="Browse service categories" aria-expanded={servicesOpen} aria-controls="services-navigation" onClick={() => setServicesOpen(!servicesOpen)}><ChevronDown size={16} aria-hidden="true"/></button></div><div className="services-dropdown" id="services-navigation" hidden={!servicesOpen}><p className="eyebrow">Areas of practice</p><ul>{services.map(service => <li key={service.slug}><Link href={`/services/${service.slug}/`} onClick={close}>{service.title}</Link></li>)}</ul></div></div> : <Link key={item.href} href={item.href} aria-current={current(item.href) ? 'page' : undefined} onClick={close}>{item.label}</Link>)}
      <ButtonLink className="nav-cta" href="/contact/" onClick={close}>Discuss Your Requirements</ButtonLink>
    </nav>
  </div></header>;
}
