/* About page — 6 sections. Thesis + operator credibility. */

/* ---------------- Nav (About current) ---------------- */
const AboutNav = () => <SiteNav current="about" basePath="./" />;

const AboutBreadcrumb = () => (
  <div className="pl-breadcrumb">
    <a href="./home.html">OneClient</a>
    <span className="sep">/</span>
    <span className="cur">About</span>
  </div>
);

/* ---------------- 01 · Hero ---------------- */
const AboutHero = () => (
  <section className="ab-hero" data-net-section="hero" id="top">
    <div className="ab-hero-inner">
      <Reveal y={14}>
        <div className="pl-eyebrow" style={{ marginBottom: 36 }}>
          <span className="dot" />The thesis
        </div>
      </Reveal>
      <h1 className="pl-h1">
        <Reveal as="span" y={20} className="ab-line ab-line--1" delay={80}>
          Generic software is ending.
        </Reveal>
        <Reveal as="span" y={20} className="ab-line ab-line--2" delay={380}>
          Vertical AI is the next cycle.
        </Reveal>
      </h1>
      <Reveal y={18} delay={600}>
        <p className="pl-lead">
          OneClient exists because the shape of software is changing. Horizontal platforms served the last cycle. Vertical AI operations — built for specific markets, operated by specialists, powered by frontier models — win the next one. We build those operations.
        </p>
      </Reveal>
    </div>
  </section>
);

/* ---------------- Odometer for stat row ---------------- */
const AbOdo = ({ target, duration = 1400 }) => {
  const [ref, shown] = useReveal({ threshold: 0.4 });
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    if (!shown) return;
    let raf; const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, target, duration]);
  return <span ref={ref}>{value}</span>;
};

/* ---------------- 02 · The Shape ---------------- */
const AboutShape = () => (
  <section className="ab-sec" data-net-section="verticals">
    <div className="ab-sec-inner">
      <Reveal y={14}><div className="pl-eyebrow"><span className="dot" />The shape</div></Reveal>
      <Reveal y={20} delay={80}>
        <h2 className="ab-h2-triple">
          A factory of verticals.<br/>
          <span className="em">Not a software company.</span><br/>
          <span className="em">Not an agency.</span>
        </h2>
      </Reveal>
      <Reveal y={18} delay={180}>
        <p className="pl-lead" style={{ maxWidth: '68ch' }}>
          OneClient is a holding. Each vertical is an independent operation — some built with market operators who bring the audience, some built from thesis. All of them share one engine: multi-agent AI orchestration, conversation-first, shipped to production fast. The verticals are the product. The engine is the advantage.
        </p>
      </Reveal>
      <Reveal y={18} delay={260}>
        <div className="ab-stats">
          <div className="ab-stat">
            <div className="ab-stat-num"><AbOdo target={8} /></div>
            <div className="ab-stat-lbl">verticals, live or available</div>
          </div>
          <div className="ab-stat">
            <div className="ab-stat-num"><AbOdo target={1} /></div>
            <div className="ab-stat-lbl">engine, shared across all</div>
          </div>
          <div className="ab-stat">
            <div className="ab-stat-num ab-stat-num--text">A team</div>
            <div className="ab-stat-lbl">of operators, engineers, and specialists behind every vertical.</div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------------- 03 · The Operator ---------------- */
const AboutOperator = () => (
  <section className="ab-sec" id="operator" data-net-section="engine">
    <div className="ab-sec-inner">
      <Reveal y={14}><div className="pl-eyebrow"><span className="dot" />The operator</div></Reveal>
      <Reveal y={20} delay={80}>
        <h2 className="pl-h2" style={{ maxWidth: '22ch' }}>
          Built by someone who's done this before.
        </h2>
      </Reveal>
      <Reveal y={18} delay={180}>
        <p className="ab-operator-para">
          <b>João Augusto Campos</b> spent over a decade as an operator in one of the earliest CRM companies in Latin America — through the full arc of scaling a vertical SaaS business to multi-million dollar ARR. He started OneClient on a specific thesis: the next cycle of software won't reward generalists or horizontal tools. It rewards operators who go narrow, ship fast, and build infrastructure that fits the market it serves. OneClient is that thesis made operational.
        </p>
      </Reveal>
      <Reveal y={14} delay={280}>
        <div className="ab-attribution">
          <b>João Augusto Campos</b>
          <span className="sep">—</span>
          <span>Founder &amp; CEO, OneClient</span>
          <span className="sep">·</span>
          <span>Miami, Florida</span>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------------- 04 · Principles ---------------- */
const PRINCIPLES = [
  {
    n: '01',
    title: 'Ship to production, not to slides.',
    body: "A vertical that isn't live isn't a vertical. Every build in our portfolio reached production. Some in weeks, some in months — but they reached it. Decks don't compound.",
  },
  {
    n: '02',
    title: 'Frontier models. Boring operations.',
    body: "We use the most capable language models available, across multiple providers, with automatic failover. What's in front of the user is intelligent. What's behind it is boring — versioned prompts, observable traces, replayable conversations. Intelligence at the edge. Discipline at the core.",
  },
  {
    n: '03',
    title: 'WhatsApp is the operating system.',
    body: "In the markets we build for, the conversation doesn't happen on a dashboard. It happens on WhatsApp. We don't fight that — we build inside it. The operator's customers stay where they already are. The operator's team stops switching tools.",
  },
  {
    n: '04',
    title: 'Architecture, not templates.',
    body: "Off-the-shelf tools serve the middle of the market well. They don't serve the markets we build for — regulated, specialized, operator-grade. We architect each vertical around the specific constraints of its market. That's why what we ship lasts.",
  },
];

const PrincipleCard = ({ p, index }) => {
  const [ref, shown] = useReveal({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      className={`ab-principle ${shown ? 'is-in' : ''}`}
      style={{ transitionDelay: shown ? `${index * 120}ms` : '0ms' }}
    >
      <div className="ab-principle-num">{p.n}</div>
      <h3 className="ab-principle-title">{p.title}</h3>
      <p className="ab-principle-body">{p.body}</p>
    </div>
  );
};

const AboutPrinciples = () => (
  <section className="ab-sec" data-net-section="stack">
    <div className="ab-sec-inner">
      <Reveal y={14}><div className="pl-eyebrow"><span className="dot" />How we build</div></Reveal>
      <Reveal y={20} delay={80}>
        <h2 className="pl-h2" style={{ maxWidth: '22ch' }}>Principles, not methodology.</h2>
      </Reveal>
      <Reveal y={16} delay={180}>
        <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.55, maxWidth: '60ch', margin: 0 }}>
          We don't sell a process. We operate on principles. These are the non-negotiables behind every vertical we've shipped.
        </p>
      </Reveal>
      <div className="ab-principles">
        {PRINCIPLES.map((p, i) => <PrincipleCard key={p.n} p={p} index={i} />)}
      </div>
    </div>
  </section>
);

/* ---------------- 05 · The Line ---------------- */
const AboutLine = () => (
  <section className="ab-sec" data-net-section="verticals">
    <div className="ab-sec-inner">
      <Reveal y={14}><div className="pl-eyebrow"><span className="dot" />The line</div></Reveal>
      <h2 className="ab-line-headline">
        <Reveal as="span" y={18} className="ab-line ab-line--1" delay={0}>
          We build rarely.
        </Reveal>
        <Reveal as="span" y={18} className="ab-line ab-line--2" delay={260}>
          We build well.
        </Reveal>
      </h2>
      <Reveal y={18} delay={500}>
        <p className="pl-lead" style={{ maxWidth: '62ch' }}>
          Every vertical in our portfolio took real engineering. That's the only standard that compounds. We don't run dozens of projects in parallel. We take on new verticals when the operator is serious, the market is real, and the infrastructure deserves to exist. If we say we'll build it, it ships. If we're not sure we'll build it well, we don't start.
        </p>
      </Reveal>
    </div>
  </section>
);

/* ---------------- 06 · Conversation ---------------- */
const AboutConversation = () => {
  const [ref, shown] = useReveal({ threshold: 0.3 });
  return (
    <section className="ab-conv" data-net-section="final" ref={ref}>
      <div className={`ab-conv-inner ${shown ? 'is-in' : ''}`}>
        <div className="pl-eyebrow"><span className="dot" />Next</div>
        <h2>
          If your thesis needs infrastructure<br/>
          that actually ships.
        </h2>
        <p>The fastest way to find out if we're the right partner is a conversation.</p>
        <a className="pl-cta" href="./contact.html">
          Start a conversation <span className="arr">→</span>
        </a>
      </div>
    </section>
  );
};

/* ---------------- Footer ---------------- */
const AboutFooter = () => <SiteFooter basePath="./" />;


/* ---------------- Page ---------------- */
const AboutPage = () => (
  <>
    <PageNetwork />
    <ScrollProgress />
    <AboutNav />
    <AboutBreadcrumb />
    <AboutHero />
    <AboutShape />
    <AboutOperator />
    <AboutPrinciples />
    <AboutLine />
    <AboutConversation />
    <AboutFooter />
    <ChatWidget />
  </>
);
