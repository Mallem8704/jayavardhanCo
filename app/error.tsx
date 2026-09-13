'use client';
import { Button, ButtonLink, SectionHeading } from '@/components/ui';
export default function ErrorPage({ reset }: { reset: () => void }) { return <main id="main" tabIndex={-1} className="shell section"><SectionHeading as="h1" eyebrow="Something went wrong" title="This page could not be loaded." description="Please try again. You can also return home or contact info@cajvr.com."/><div className="hero-actions"><Button onClick={reset}>Try again</Button><ButtonLink href="/" variant="secondary">Return home</ButtonLink></div></main>; }
