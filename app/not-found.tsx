import { ButtonLink, SectionHeading } from '@/components/ui';
export default function NotFound() { return <main id="main" tabIndex={-1} className="shell section"><SectionHeading as="h1" eyebrow="Page not found" title="Let’s find your way back." description="The page you requested is unavailable."/><ButtonLink href="/">Return home</ButtonLink></main>; }
