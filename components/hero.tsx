import { Architecture } from '@/components/architecture';
import { ButtonLink, TextLink } from '@/components/ui';

export function Hero() {
  return (
    <section className="home-hero" aria-labelledby="hero-heading">
      <div className="shell home-hero-grid">
        <div className="hero-editorial">
          <p className="eyebrow">JAYAVARDHAN & CO</p>
          <h1 id="hero-heading">
            <span>Clarity in your numbers.</span>
            <em>Confidence in your <span className="keep-together">next step.</span></em>
          </h1>
          <p className="hero-description">Audit, tax, compliance, and financial advisory services to help you understand your obligations and make informed business decisions.</p>
          <div className="hero-actions">
            <ButtonLink href="/contact/" variant="light">Discuss Your Requirements</ButtonLink>
            <TextLink href="/services/">Explore Our Services</TextLink>
          </div>
          <p className="hero-location">Chartered Accountants <span aria-hidden="true">/</span> Hyderabad</p>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual-heading"><span>A clear perspective</span><span className="visual-accent"/></div>
          <div className="architecture-frame"><Architecture/></div>
          <div className="hero-visual-footer"><span>Precision in the detail.</span><span>Perspective for what’s next.</span></div>
        </div>
      </div>
    </section>
  );
}
