import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ServiceGrid } from '@/components/service-grid';
import { engagement, firm } from '@/lib/content';
export default function Home() {
  return <main id="main">
    <section className="hero"><div className="shell hero-grid"><div className="hero-copy"><p className="eyebrow"><span/> {firm.designation}</p><h1>Clarity for the<br/>decisions <em>ahead.</em></h1><p className="hero-description">{firm.introduction}</p><Link className="button button-light" href="/services/">Discover our services <ArrowUpRight size={19}/></Link><div className="hero-footnote">Independent thinking. Informed decisions.</div></div><div className="hero-panel"><div className="panel-heading">A financial perspective</div><div className="editorial-mark" aria-hidden="true">J<span>&</span>C</div><div className="panel-bottom"><span>For your business.<br/>For what comes next.</span><ArrowUpRight size={30} strokeWidth={1}/></div></div></div><div className="hero-strip shell"><span>Audit & assurance</span><span>Tax & compliance</span><span>Business advisory</span></div></section>
    <section className="section shell" id="services"><div className="section-heading"><div><p className="eyebrow">Our areas of practice</p><h2>Expertise, with perspective.</h2></div><p>Eight service areas.<br/>A place to start your next conversation.</p></div><ServiceGrid/></section>
    <section className="engagement-section" id="engagement"><div className="shell engagement-grid"><div><p className="eyebrow">Before an engagement</p><h2>{engagement.title}</h2></div><div><p className="engagement-description">{engagement.description}</p><ol className="steps"><li><span>01</span><div><h3>Define the need</h3><p>Identify the business context and the questions that need attention.</p></div></li><li><span>02</span><div><h3>Establish the scope</h3><p>Confirm suitability, responsibilities and relevant professional requirements.</p></div></li><li><span>03</span><div><h3>Agree the engagement</h3><p>Document the scope and terms before work begins.</p></div></li></ol></div></div></section>
    <section className="shell closing"><p className="eyebrow">Find your starting point</p><h2>What’s next for your business?</h2><Link href="/services/">Explore the areas of practice <ArrowRight size={20}/></Link></section>
  </main>;
}
