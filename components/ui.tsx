import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
type Variant = 'primary' | 'secondary' | 'light';
export function Button({ variant = 'primary', className = '', type = 'button', ...props }: ComponentProps<'button'> & { variant?: Variant }) { return <button type={type} className={`button button-${variant} ${className}`} {...props}/>; }
export function ButtonLink({ variant = 'primary', className = '', children, ...props }: ComponentProps<typeof Link> & { variant?: Variant }) { return <Link className={`button button-${variant} ${className}`} {...props}>{children}<ArrowUpRight size={18} aria-hidden="true"/></Link>; }
export function TextLink({ className = '', children, ...props }: ComponentProps<typeof Link>) { return <Link className={`text-link ${className}`} {...props}>{children}<ArrowUpRight size={17} aria-hidden="true"/></Link>; }
export function SectionHeading({ eyebrow, title, description, as: Tag = 'h2' }: { eyebrow?: string; title: ReactNode; description?: ReactNode; as?: 'h1' | 'h2' }) { return <div className="section-heading"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<Tag>{title}</Tag></div>{description && <p className="section-description">{description}</p>}</div>; }
export type BreadcrumbItem = { label: string; href?: string };
export function Breadcrumbs({ items }: { items: readonly BreadcrumbItem[] }) { return <nav aria-label="Breadcrumb" className="breadcrumbs"><ol>{[{ label: 'Home', href: '/' }, ...items].map((item, index, all) => <li key={`${item.label}-${index}`}>{index > 0 && <ChevronRight size={13} aria-hidden="true"/>}{index === all.length - 1 ? <span aria-current="page">{item.label}</span> : <Link href={item.href ?? '/'}>{item.label}</Link>}</li>)}</ol></nav>; }
