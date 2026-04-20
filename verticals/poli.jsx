/* Poli — case study page. 8 sections + local nav/footer. */

/* ---------------- Local Nav (POLI under portfolio/verticals) ---------------- */
const PoliNav = () => <SiteNav current="verticals" basePath="../" />;

/* ---------------- Breadcrumb ---------------- */
const PoliBreadcrumb = () => (
  <div className="pl-breadcrumb">
    <a href="../home.html">OneClient</a>
    <span className="sep">/</span>
    <a href="./index.html">Verticals</a>
    <span className="sep">/</span>
    <span className="cur">Poli AI</span>
  </div>
);

/* ---------------- 01 · Hero ---------------- */
const PoliHero = () => (
  <section className="pl-sec pl-sec--first" id="top" data-net-section="verticals">
    <div className="pl-sec-inner">
      <Reveal y={16}>
        <div className="pl-eyebrow pl-eyebrow--live">
          <span className="dot" />Case · White-label AI · In production
        </div>
      </Reveal>
      <Reveal y={32} delay={80}>
        <h1 className="pl-h1">
          The AI layer behind one of Brazil's leading <span className="em">WhatsApp platforms.</span>
        </h1>
      </Reveal>
      <Reveal y={20} delay={180}>
        <p className="pl-lead pl-lead--hero">
          Poli Digital is among the category leaders in WhatsApp omnichannel in Brazil. Thousands of businesses run their customer conversations through Poli every day. What was missing was intelligence — not a chatbot bolted on, but a real AI layer Poli could operate, evolve, and sell as their own. That's what we built.
        </p>
      </Reveal>
      <Reveal y={16} delay={280}>
        <div className="pl-hero-meta">
          <span>Built in 1 month</span>
          <span className="dot">·</span>
          <span>Live in production</span>
          <span className="dot">·</span>
          <span>Expanding Poli's upsell</span>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------------- 02 · Who they are ---------------- */
const PoliPartner = () => (
  <section className="pl-sec" data-net-section="engine">
    <div className="pl-sec-inner">
      <Reveal y={16}><div className="pl-eyebrow"><span className="dot" />The partner</div></Reveal>
      <Reveal y={24} delay={80}>
        <h2 className="pl-h2">Poli Digital. Category leader in WhatsApp omnichannel.</h2>
      </Reveal>
      <Reveal y={18} delay={180}>
        <p className="pl-lead">
          Poli operates the infrastructure that powers WhatsApp for thousands of Brazilian businesses — inboxes, contacts, agents, omnichannel routing. Their platform is already mature. Their team ships fast. Their position in the market is earned, not bought.
        </p>
      </Reveal>
      <Reveal y={14} delay={260}>
        <div className="pl-credits">
          <div className="pl-credit">
            <span className="name">Alberto Filho</span>
            <span className="sep">—</span>
            <span className="role">CEO</span>
          </div>
          <div className="pl-credit">
            <span className="name">Timóteo Rocha</span>
            <span className="sep">—</span>
            <span className="role">CRO</span>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------------- 03 · What they tried before ---------------- */
const PoliBefore = () => (
  <section className="pl-sec pl-sec--prose" data-net-section="thesis">
    <div className="pl-sec-inner">
      <Reveal y={16}><div className="pl-eyebrow"><span className="dot" />Before OneClient</div></Reveal>
      <Reveal y={28} delay={80}>
        <h2 className="pl-h2">They'd tried. More than once.</h2>
      </Reveal>
      <Reveal y={18} delay={160}>
        <p className="pl-lead">
          Poli knew AI was the next layer. They tested external providers. Evaluated partners. Built prototypes. What they found was consistent: either the vendors delivered a generic chatbot that didn't fit Poli's architecture, or they delivered something that worked in a demo and broke in production.
        </p>
      </Reveal>
      <Reveal y={18} delay={240}>
        <p className="pl-lead">
          The platform needed AI that could be operated by Poli's team directly — versioned, monitored, controlled. Something Poli could treat as product, not as a black box.
        </p>
      </Reveal>
    </div>
  </section>
);

/* ---------------- 04 · What we built ---------------- */
const CAPS = [
  ['01', 'Visual robot builder', "Poli's team configures bots without engineering. 3 steps. Live in minutes."],
  ['02', 'Multi-provider intelligence', 'Four language model providers. Automatic failover. No downtime visible to end users.'],
  ['03', 'Semantic knowledge retrieval', 'Each bot has its own knowledge base. Understands meaning, not just keywords.'],
  ['04', 'Operator-grade observability', 'Live dashboards of usage, cost, quality, and escalation — built into the platform, not bolted on.'],
];

const PoliBuild = () => (
  <section className="pl-sec" data-net-section="verticals">
    <div className="pl-sec-inner pl-sec-inner--wide">
      <Reveal y={16}><div className="pl-eyebrow"><span className="dot" />The build</div></Reveal>
      <Reveal y={28} delay={80}>
        <h2 className="pl-h2">A native AI layer — operated by Poli, invisible to the end user.</h2>
      </Reveal>
      <Reveal y={18} delay={160}>
        <p className="pl-lead">
          In 30 days we shipped the first production version. Poli's team creates new AI bots through a 3-step wizard. Configures personality, mission, knowledge base, escalation rules — without touching code. The bots run on frontier language models, with automatic failover between providers when any one is unavailable. Poli monitors every conversation, every cost, every handover in real time.
        </p>
      </Reveal>
      <div className="pl-caps">
        {CAPS.map(([n, t, d], i) => (
          <Reveal key={n} y={24} delay={i * 80}>
            <div className="pl-cap">
              <div className="n">{n}</div>
              <div className="t">{t}</div>
              <div className="d">{d}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- Odometer (shared with AdPilot pattern) ---------------- */
const PoliOdo = ({ target, duration = 1400 }) => {
  const [ref, shown] = useReveal({ threshold: 0.4 });
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    if (!shown) return;
    if (prefersReducedMotion()) { setValue(target); return; }
    const t0 = performance.now();
    let raf = 0;
    const step = (now) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [shown, target, duration]);
  const str = String(value).padStart(String(target).length, '0').split('');
  return (
    <span ref={ref} className="pl-odo">
      {str.map((d, i) => (
        <span className="digit" key={i}>
          <span style={{ transform: `translateY(-${parseInt(d, 10)}em)` }}>
            {Array.from({ length: 10 }).map((_, n) => <span key={n}>{n}</span>)}
          </span>
        </span>
      ))}
    </span>
  );
};

/* ---------------- 05 · Today ---------------- */
const PoliToday = () => (
  <section className="pl-sec" data-net-section="capabilities">
    <div className="pl-sec-inner pl-sec-inner--wide">
      <Reveal y={16}><div className="pl-eyebrow pl-eyebrow--live"><span className="dot" />Today</div></Reveal>
      <Reveal y={28} delay={80}>
        <h2 className="pl-h2">Poli sells it as their own. Their clients never know we exist.</h2>
      </Reveal>
      <Reveal y={18} delay={160}>
        <p className="pl-lead">
          The first live client is in production. The upsell motion is working. Poli controls the operation end to end — the architecture is theirs to evolve. OneClient remains quiet infrastructure, where we're supposed to be.
        </p>
      </Reveal>
      <div className="pl-stats">
        <Reveal y={24} delay={0}>
          <div className="pl-stat">
            <div className="val"><PoliOdo target={30} /></div>
            <div className="label">days from zero to production.</div>
          </div>
        </Reveal>
        <Reveal y={24} delay={100}>
          <div className="pl-stat">
            <div className="val"><PoliOdo target={4} /></div>
            <div className="label">language model providers with automatic failover.</div>
          </div>
        </Reveal>
        <Reveal y={24} delay={200}>
          <div className="pl-stat">
            <div className="val"><PoliOdo target={1} /><span className="suffix">st</span></div>
            <div className="label">client live. Pipeline expanding monthly.</div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------------- 06 · Why it worked ---------------- */
const PoliThesis = () => (
  <section className="pl-sec pl-sec--thesis" data-net-section="signal">
    <div className="pl-sec-inner">
      <Reveal y={16}><div className="pl-eyebrow"><span className="dot" />Why OneClient</div></Reveal>
      <Reveal y={28} delay={80}>
        <h2 className="pl-h2">Poli didn't need a vendor. They needed a partner who'd build for their architecture.</h2>
      </Reveal>
      <Reveal y={18} delay={160}>
        <p className="pl-lead">
          Generic AI products don't fit mature platforms. What Poli needed was AI infrastructure shaped to their operation — their data model, their permissions, their UX, their pricing logic. Not a bolt-on. A native layer. That's what we ship.
        </p>
      </Reveal>
    </div>
  </section>
);

/* ---------------- 07 · Conversation ---------------- */
const PoliConversation = () => {
  const [ref, shown] = useReveal({ threshold: 0.3 });
  return (
    <section className="pl-sec pl-sec--conv" data-net-section="verticals" ref={ref}>
      <div className={`pl-sec-inner final-text ${shown ? 'is-in' : ''}`}>
        <div className="pl-eyebrow"><span className="dot" />Next</div>
        <h2 className="pl-h2">If your platform is mature and AI is the missing layer.</h2>
        <p className="pl-lead">
          We build this kind of infrastructure rarely, and only where the partner is serious.
        </p>
        <a className="final-link pl-cta" href="../contact.html">
          Start a conversation <span className="arr">→</span>
        </a>
      </div>
    </section>
  );
};

/* ---------------- 08 · Other portfolio ---------------- */
const OTHERS = [
  { name: 'RegenX Academy', desc: 'Category-defining education platform in regenerative medicine.', href: './regenx-academy.html' },
  { name: 'Unlocked Miami', desc: 'AI-driven real estate operation in Miami.',                       href: './unlocked-miami.html' },
  { name: 'USX Peptides',   desc: 'Direct-to-clinician peptide commerce with built-in compliance.',  href: './usx-peptides.html' },
];
const PoliOther = () => (
  <section className="pl-port" data-net-section="engine">
    <div className="pl-port-inner">
      <div className="pl-port-head">
        <div>
          <Reveal y={14}><div className="pl-eyebrow"><span className="dot" />Portfolio</div></Reveal>
          <Reveal y={20} delay={80}><h2 className="pl-h2">Other things we've built.</h2></Reveal>
        </div>
      </div>
      <div className="pl-port-grid">
        {OTHERS.map((v, i) => (
          <Reveal key={v.name} delay={i * 80} y={20}>
            <a className="pl-port-card" href={v.href || './index.html'}>
              <div className="name">{v.name}</div>
              <div className="desc">{v.desc}</div>
            </a>
          </Reveal>
        ))}
      </div>
      <Reveal y={12} delay={240}>
        <a className="pl-port-more" href="./index.html">See all verticals →</a>
      </Reveal>
    </div>
  </section>
);

/* ---------------- Footer (identical structure to AdPilot) ---------------- */
const PoliFooter = () => <SiteFooter basePath="../" />;


Object.assign(window, {
  PoliNav, PoliBreadcrumb,
  PoliHero, PoliPartner, PoliBefore, PoliBuild, PoliToday, PoliThesis, PoliConversation, PoliOther,
  PoliFooter,
});
