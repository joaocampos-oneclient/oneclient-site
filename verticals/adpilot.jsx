/* AdPilot vertical page — local Nav, Hero, Problem, Solution, Numbers, Tech, Partnership, Close, Related, Footer */

/* ---------------- Local Nav (AdPilot highlighted, links point back to home) ---------------- */
const AdPilotNav = () => <SiteNav current="verticals" basePath="../" />;

/* ---------------- Breadcrumb ---------------- */
const Breadcrumb = () => (
  <div className="ap-breadcrumb">
    <a href="../home.html">OneClient</a>
    <span className="sep">/</span>
    <a href="./index.html">Verticals</a>
    <span className="sep">/</span>
    <span className="cur">AdPilot</span>
  </div>
);

/* ---------------- Live console (auto-appending lines) ---------------- */
const CONSOLE_SEED = [
  { ts: '14:02:11', ch: 'META/GOOGLE', msg: 'Analyzing 1,284 creatives · top quartile CTR +34%', k: 'ok' },
  { ts: '14:02:14', ch: 'BID ENGINE',  msg: 'Reallocated $2,840 → Campaign GX-14 (ROAS 4.7×)', k: 'ok' },
  { ts: '14:02:19', ch: 'ANOMALY',     msg: 'CPL drift detected · Audience 22 · pausing', k: 'warn' },
  { ts: '14:02:22', ch: 'GENERATIVE',  msg: 'Drafted 6 variants · sent to review', k: null },
  { ts: '14:02:27', ch: 'ATTRIBUTION', msg: 'MTA model updated · conversions +127 last 24h', k: 'diff-up' },
  { ts: '14:02:33', ch: 'BUDGET',      msg: 'Daily pace on target · 92.4% utilization', k: null },
  { ts: '14:02:38', ch: 'CREATIVE',    msg: 'Fatigue ≥ 0.72 · rotated 4 ads off Campaign M-08', k: 'ok' },
  { ts: '14:02:44', ch: 'AUDIENCE',    msg: 'Lookalike refresh · seed set 18,402 → 1.2M', k: null },
  { ts: '14:02:51', ch: 'META/GOOGLE', msg: 'Google Performance Max · ROAS 5.2× (7d)', k: 'diff-up' },
  { ts: '14:02:58', ch: 'PACING',      msg: 'Underdelivery on LS-04 · reallocating 12% of budget', k: 'warn' },
  { ts: '14:03:04', ch: 'REPORT',      msg: 'Weekly summary ready · 14 campaigns · 3 alerts', k: null },
  { ts: '14:03:11', ch: 'BID ENGINE',  msg: 'Auction win-rate 68% · avg CPM −8.4%', k: 'diff-up' },
];
const LiveConsole = () => {
  const [lines, setLines] = React.useState(CONSOLE_SEED.slice(0, 7));
  const [idx, setIdx] = React.useState(7);
  React.useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => {
      setLines(prev => {
        const next = CONSOLE_SEED[idx % CONSOLE_SEED.length];
        const copy = [...prev.slice(1), { ...next, _k: Date.now() }];
        return copy;
      });
      setIdx(i => i + 1);
    }, 2400);
    return () => clearInterval(id);
  }, [idx]);
  return (
    <div className="ap-console" aria-hidden="true">
      <div className="ap-console-bar">
        <span className="b" /><span className="b" /><span className="b" />
        <span className="title">adpilot · control plane</span>
        <span className="live"><i/>LIVE</span>
      </div>
      <div className="ap-console-body">
        {lines.map((l, i) => (
          <div className={`ap-log ${l._k ? 'in' : ''}`} key={(l._k || 'seed' + i)}>
            <span className="ts">{l.ts}</span>
            <span className="ch">{l.ch}</span>
            <span className={`msg ${l.k || ''}`}>{l.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------- Hero ---------------- */
const AdPilotHero = () => (
  <section className="ap-hero" id="top" data-net-section="hero">
    <div className="ap-hero-inner">
      <div className="ap-hero-grid">
        <div>
          <Reveal y={18}>
            <div className="ap-kicker"><span className="dot" />Vertical 01 · Paid media · Available</div>
          </Reveal>
          <Reveal y={32} delay={80}>
            <h1>
              Paid media, <span className="em">run by AI.</span><br/>
              Managed by <span className="em">fewer</span> humans than it deserves.
            </h1>
          </Reveal>
          <Reveal y={20} delay={220}>
            <p className="ap-hero-sub">
              AdPilot is autonomous paid media infrastructure — Meta and Google campaigns operated 80% by AI and 20% by senior operators. No account managers. No agency layers. Just performance.
            </p>
          </Reveal>
          <Reveal y={16} delay={320}>
            <div className="ap-hero-meta">
              <span><b>80 / 20</b> &nbsp; AI / human split</span>
              <span><b>4–9 days</b> &nbsp; to launch</span>
              <span><b>Multi-platform</b> &nbsp; Meta · Google · TikTok</span>
            </div>
          </Reveal>
        </div>
        <Reveal y={28} delay={160}>
          <LiveConsole />
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------------- Problem ---------------- */
const PROBLEMS = [
  ['01', 'Agencies charge for attention.', 'You pay retainers for account managers who spend 90% of their time on status updates and 10% on the work that moves numbers.'],
  ['02', 'Platforms optimize for themselves.', 'Meta and Google auto-bidding is built to spend your budget, not to grow your business. You need a layer on top that actually represents your interests.'],
  ['03', 'Talent is the bottleneck.', 'Senior media buyers are rare, expensive, and can only manage a handful of accounts before quality degrades. Scaling the traditional way scales the problem.'],
];

const AdPilotProblem = () => (
  <section className="ap-problem" data-net-section="thesis">
    <div className="ap-problem-inner">
      <Reveal y={20}><div className="eyebrow">Why AdPilot exists</div></Reveal>
      <Reveal y={32} delay={80}>
        <h2>The paid media industry is structurally wrong.</h2>
      </Reveal>
      <div className="ap-problem-grid">
        {PROBLEMS.map(([n, t, d], i) => (
          <Reveal key={n} delay={i * 100} y={24}>
            <div className="ap-prob-cell">
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

/* ---------------- Solution / pipeline ---------------- */
const PIPELINE = [
  { n: '01', t: 'Ingest',     d: 'Ad accounts, CRM, product catalog, historical performance. Unified in hours, not weeks.', tag: 'META · GOOGLE · HUBSPOT', icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h12M2 8h12M2 13h8"/></svg>
  )},
  { n: '02', t: 'Model',      d: 'Account-specific attribution and bid models. Retrained nightly on your conversions.', tag: 'ATTRIBUTION · MTA', icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 4v4l2.5 2.5"/></svg>
  )},
  { n: '03', t: 'Generate',   d: 'Ad variants, audiences, landing pages drafted by AI — reviewed by a senior operator before launch.', tag: 'CREATIVE · COPY · AUDIENCE', icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h10v10H3z"/><path d="M3 7h10M7 3v10"/></svg>
  )},
  { n: '04', t: 'Operate',    d: 'Autonomous bidding, budget pacing, creative rotation, anomaly detection. 24 / 7.', tag: 'AUTONOMOUS · 24/7', icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8z"/><path d="M8 4v4l3 2"/></svg>
  )},
  { n: '05', t: 'Report',     d: 'Weekly business review, delivered in plain English. Not dashboards. Decisions.', tag: 'WEEKLY REVIEW', icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v10h10"/><path d="M6 10l2-3 2 2 3-4"/></svg>
  )},
];

const AdPilotSolution = () => (
  <section className="ap-solution" data-net-section="engine">
    <div className="ap-solution-inner">
      <div className="ap-solution-head">
        <Reveal y={20}><div className="eyebrow">How it works</div></Reveal>
        <Reveal y={32} delay={80}><h2 className="h-lg" style={{ marginTop: 16 }}>One pipeline. Five stages. Zero agency overhead.</h2></Reveal>
        <Reveal y={20} delay={180}>
          <p className="p-lead">
            AdPilot runs the full paid media loop — from data ingestion to weekly business review — on infrastructure tuned for your account. The operator layer reviews, approves, and escalates. Everything else runs itself.
          </p>
        </Reveal>
      </div>
      <Reveal y={40} delay={100}>
        <div className="ap-pipe">
          <div className="ap-pipe-row">
            {PIPELINE.map((s, i) => (
              <div className="ap-pipe-step" key={s.n} style={{ animationDelay: `${i * 60}ms` }}>
                <div className="ico">{s.icon}</div>
                <div className="n">STEP {s.n}</div>
                <div className="t">{s.t}</div>
                <div className="d">{s.d}</div>
                <div className="tag">{s.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------------- Odometer ---------------- */
const Odometer = ({ target, duration = 1400 }) => {
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
    <span ref={ref} className="ap-odo">
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

const AdPilotNumbers = () => (
  <section className="ap-numbers" data-net-section="capabilities">
    <div className="ap-numbers-inner">
      <div className="ap-numbers-head">
        <Reveal y={20}><div className="eyebrow">What it produces</div></Reveal>
        <Reveal y={32} delay={80}><h2 className="h-lg" style={{ marginTop: 16 }}>Autonomy at operational scale.</h2></Reveal>
      </div>
      <div className="ap-num-grid ap-num-grid--3">
        <Reveal y={24} delay={0}>
          <div className="ap-num">
            <div className="label">Autonomous operation</div>
            <div className="val"><Odometer target={80} />%</div>
            <div className="note">of daily work runs without human intervention.</div>
          </div>
        </Reveal>
        <Reveal y={24} delay={80}>
          <div className="ap-num">
            <div className="label">Always on</div>
            <div className="val">24<span style={{ opacity: 0.5, margin: '0 0.1em' }}>/</span>7</div>
            <div className="note">continuous optimization across every campaign.</div>
          </div>
        </Reveal>
        <Reveal y={24} delay={160}>
          <div className="ap-num">
            <div className="label">Multi-platform</div>
            <div className="val" style={{ fontSize: 'clamp(2.4rem, 3.6vw, 3.6rem)' }}>Meta · Google · TikTok</div>
            <div className="note">orchestrated as one operation.</div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------------- Tech marquee (AdPilot-specific stack) ---------------- */
const AP_STACK = [
  'Google Ads API', 'Meta Marketing API', 'Anthropic', 'TikTok Business', 'GA4',
  'Supabase', 'Vercel', 'Segment', 'Stripe', 'HubSpot', 'Snowflake', 'dbt',
  'Twilio', 'Resend', 'Cloudflare', 'BigQuery',
];
const AdPilotTech = () => (
  <section className="ap-tech" data-net-section="stack">
    <div className="ap-tech-head">
      <Reveal y={20}><div className="eyebrow">The stack</div></Reveal>
      <Reveal y={32} delay={80}><h2 className="h-lg" style={{ marginTop: 16 }}>Built on the platforms your ad dollars already run on.</h2></Reveal>
    </div>
    <div className="marquee">
      <div className="marquee-track">
        {[...AP_STACK, ...AP_STACK].map((s, i) => <span key={i}>{s}</span>)}
      </div>
    </div>
  </section>
);

/* ---------------- Partnership ---------------- */
/* ---------------- Partnership (removed — deliberate) ---------------- */
const AdPilotPartnership = () => null;

/* ---------------- Closing moment ---------------- */
const AdPilotClose = () => {
  const [ref, shown] = useReveal({ threshold: 0.3 });
  return (
    <section className="ap-close" data-net-section="final" ref={ref}>
      <div className={`final-text ${shown ? 'is-in' : ''}`} style={{ position: 'relative', zIndex: 2 }}>
        <h2>Stop renting an agency. Start running infrastructure.</h2>
        <p>If you're willing to let AI run most of it, AdPilot is how you get out from under the retainer model.</p>
        <div className="row">
          <a className="final-link" href="../contact.html">
            Start a conversation <span className="arr">→</span>
          </a>
          <a className="final-link" href="./index.html" style={{ color: 'var(--fg-2)' }}>
            See all verticals <span className="arr">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Related verticals ---------------- */
const RELATED = [
  { name: 'Robot SaaS',     desc: 'Multi-agent digital coworkers for SMB operators.', href: './robot-saas.html' },
  { name: 'Clinik One',     desc: 'AI-native operating system for medical clinics.',  href: './clinik-one.html' },
  { name: 'Unlocked Miami', desc: 'AI-driven real estate operation in Miami.',        href: './unlocked-miami.html' },
];
const AdPilotRelated = () => (
  <section className="ap-related" data-net-section="signal">
    <div className="ap-related-inner">
      <Reveal y={18}><h3>More verticals</h3></Reveal>
      <div className="ap-related-grid">
        {RELATED.map((v, i) => (
          <Reveal key={v.name} delay={i * 80} y={20}>
            <a className="ap-rel-card" href={v.href || './index.html'}>
              <div className="name">{v.name}</div>
              <div className="desc">{v.desc}</div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- Local Footer (links back to home) ---------------- */
const AdPilotFooter = () => <SiteFooter basePath="../" />;

Object.assign(window, { AdPilotNav, Breadcrumb, AdPilotHero, AdPilotProblem, AdPilotSolution, AdPilotNumbers, AdPilotTech, AdPilotPartnership, AdPilotClose, AdPilotRelated, AdPilotFooter });
