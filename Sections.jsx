import React from 'react';

export function Hero() {
  return (
    <section className="oc-hero">
      <div className="oc-hero-inner">
        <div className="oc-eyebrow oc-hero-eyebrow">Holding · Vertical AI SaaS</div>
        <h1 className="oc-display">
          AI infrastructure<br/>that knows your business.
        </h1>
        <p className="oc-lead">
          OneClient builds and operates vertical SaaS for specific industries.
          One operator per vertical. One system that runs it end to end.
        </p>
        <div className="oc-hero-cta">
          <button className="oc-btn oc-btn--primary">Book intro</button>
          <button className="oc-btn oc-btn--secondary">Read the thesis →</button>
        </div>
        <div className="oc-hero-meta">
          <span>·  Trusted by operators in</span>
          <span className="oc-meta-logo">ACME LOGISTICS</span>
          <span className="oc-meta-logo">NORTHBOUND LEGAL</span>
          <span className="oc-meta-logo">MERIDIAN FIELD</span>
          <span className="oc-meta-logo">VELA CARE</span>
        </div>
      </div>
      <div className="oc-hero-visual" aria-hidden="true">
        <div className="oc-chromatic">
          <svg viewBox="0 0 120 120" fill="currentColor" fillRule="evenodd">
            <path d="M 60 8 A 52 52 0 0 1 112 60 L 92 60 A 32 32 0 0 0 60 28 Z M 112 60 A 52 52 0 0 1 60 112 L 60 92 A 32 32 0 0 0 92 60 Z M 60 112 A 52 52 0 0 1 8 60 L 28 60 A 32 32 0 0 0 60 92 Z M 8 60 A 52 52 0 0 1 60 8 L 60 28 A 32 32 0 0 0 28 60 Z" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export function Verticals() {
  const items = [
    { name: 'Logistics', desc: 'Dispatch, route, settlement. One operator runs the fleet floor.', status: 'Live' },
    { name: 'Legal intake', desc: 'Screening to signed engagement. Compliant by construction.', status: 'Live' },
    { name: 'Insurance claims', desc: 'FNOL to payout, end to end. Carrier-grade auditability.', status: 'Q3 2026' },
    { name: 'Field service', desc: 'Work-orders, parts, billing. Operator in every truck.', status: 'Q4 2026' },
  ];
  return (
    <section id="verticals" className="oc-section">
      <div className="oc-section-head">
        <div className="oc-eyebrow">Verticals</div>
        <h2 className="oc-h2">One vertical at a time. Nothing in between.</h2>
      </div>
      <div className="oc-grid oc-grid--2">
        {items.map(v => (
          <article key={v.name} className="oc-card oc-vertical">
            <div className="oc-vertical-head">
              <span className="oc-card-title">{v.name}</span>
              <span className={`oc-badge ${v.status === 'Live' ? 'oc-badge--live' : 'oc-badge--soon'}`}>{v.status}</span>
            </div>
            <p>{v.desc}</p>
            <a className="oc-link-arrow">Read the operator brief →</a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Features() {
  const feats = [
    { t: 'One operator per vertical', d: 'A single accountable team builds, ships, and runs the system. No platform purgatory.' },
    { t: 'Domain model first', d: 'We encode the operating model of the industry before we write the first line of UI.' },
    { t: 'Owned infrastructure', d: 'Runtime, data plane, and observability under one roof. No vendor chain.' },
    { t: 'Audit-ready by default', d: 'Every action, every artifact. Signed, timestamped, immutable.' },
    { t: 'Priced to operate', d: 'We share revenue with our operators. Margins align with outcomes.' },
    { t: 'Humans in the loop', d: 'AI handles the mass. Operators handle the edges. Both in the same surface.' },
  ];
  return (
    <section id="platform" className="oc-section">
      <div className="oc-section-head">
        <div className="oc-eyebrow">Platform</div>
        <h2 className="oc-h2">The system underneath every product.</h2>
      </div>
      <div className="oc-grid oc-grid--3">
        {feats.map(f => (
          <div key={f.t} className="oc-feat">
            <div className="oc-feat-dot" />
            <h3 className="oc-h4">{f.t}</h3>
            <p>{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="oc-section">
      <div className="oc-section-head">
        <div className="oc-eyebrow">Engagement</div>
        <h2 className="oc-h2">Two ways to work with OneClient.</h2>
      </div>
      <div className="oc-grid oc-grid--2">
        <div className="oc-card oc-plan">
          <div className="oc-plan-head">
            <span className="oc-eyebrow">Operator partnership</span>
            <h3 className="oc-h3">We build, you operate</h3>
          </div>
          <p>A joint venture. OneClient provides the system; you bring the industry. Equity and revenue shared.</p>
          <ul className="oc-checklist">
            <li>Full vertical build-out</li>
            <li>Shared cap table</li>
            <li>Joint go-to-market</li>
            <li>5 – 8 year horizon</li>
          </ul>
          <button className="oc-btn oc-btn--secondary">Apply as operator</button>
        </div>
        <div className="oc-card oc-plan oc-plan--hero">
          <div className="oc-plan-head">
            <span className="oc-eyebrow">Direct</span>
            <h3 className="oc-h3">We build and we run</h3>
          </div>
          <p>OneClient ships the finished product into your industry. You get outcomes, not projects. We own the stack.</p>
          <ul className="oc-checklist">
            <li>Fixed vertical scope</li>
            <li>Outcome-based pricing</li>
            <li>End-to-end SLA</li>
            <li>90-day on-ramp</li>
          </ul>
          <button className="oc-btn oc-btn--primary">Book an intro</button>
        </div>
      </div>
    </section>
  );
}

export function Quote() {
  return (
    <section className="oc-section oc-section--quote">
      <blockquote className="oc-quote">
        <p>"OneClient doesn't sell us software. They run the business alongside us."</p>
        <footer>
          <span>Marta Silveira</span>
          <span className="oc-meta">COO · Northbound Legal</span>
        </footer>
      </blockquote>
    </section>
  );
}
