/* Clinik One vertical page — local Nav, Hero, Problem, Solution, Numbers, Tech, Partnership, Close, Related, Footer */

/* ---------------- Local Nav ---------------- */
const ClinikNav = () => <SiteNav current="verticals" basePath="../" />;

/* ---------------- Breadcrumb ---------------- */
const ClinikBreadcrumb = () => (
  <div className="ap-breadcrumb">
    <a href="../home.html">OneClient</a>
    <span className="sep">/</span>
    <a href="./index.html">Verticals</a>
    <span className="sep">/</span>
    <span className="cur">Clinik One</span>
  </div>
);

/* ---------------- Live agenda widget ---------------- */
const AGENDA_SEED = [
  { ts: '09:00', who: 'Camila Rocha',     proc: 'Harmonização facial · retorno',     ch: 'WHATSAPP',  k: 'ok',      tag: 'CONFIRMED' },
  { ts: '09:45', who: 'Ricardo Alves',    proc: 'Clareamento · sessão 2',            ch: 'WHATSAPP',  k: 'ok',      tag: 'CONFIRMED' },
  { ts: '10:30', who: 'Juliana Menezes',  proc: 'Avaliação · primeira consulta',    ch: 'INSTAGRAM', k: 'diff-up', tag: 'NEW LEAD' },
  { ts: '11:15', who: 'André Tavares',    proc: 'Implante · acompanhamento',         ch: 'WHATSAPP',  k: 'ok',      tag: 'CONFIRMED' },
  { ts: '12:00', who: '—',                proc: 'Pausa · almoço',                   ch: '',          k: null,      tag: 'BLOCK' },
  { ts: '13:30', who: 'Patrícia Lopes',   proc: 'Botox · aplicação',                 ch: 'WHATSAPP',  k: 'warn',    tag: 'NO-SHOW RISK' },
  { ts: '14:15', who: 'Felipe Moreira',   proc: 'Ortodontia · manutenção',           ch: 'WHATSAPP',  k: 'ok',      tag: 'CONFIRMED' },
  { ts: '15:00', who: 'Beatriz Santos',   proc: 'Preenchimento · avaliação',         ch: 'WHATSAPP',  k: 'diff-up', tag: 'NEW LEAD' },
  { ts: '15:45', who: 'Carolina Dias',    proc: 'Peeling · sessão 3',               ch: 'WHATSAPP',  k: 'ok',      tag: 'CONFIRMED' },
  { ts: '16:30', who: 'Lucas Ferreira',   proc: 'Limpeza · retorno trimestral',     ch: 'WHATSAPP',  k: 'ok',      tag: 'CONFIRMED' },
];
const ClinikAgenda = () => {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setTick(t => t + 1), 3200);
    return () => clearInterval(id);
  }, []);
  // highlight one row cycling through
  const hi = tick % AGENDA_SEED.length;
  return (
    <div className="ap-console co-agenda" aria-hidden="true">
      <div className="ap-console-bar">
        <span className="b" /><span className="b" /><span className="b" />
        <span className="title">clinik one · agenda · hoje</span>
        <span className="live"><i/>LIVE</span>
      </div>
      <div className="co-agenda-head">
        <span>HORA</span>
        <span>PACIENTE</span>
        <span>PROCEDIMENTO</span>
        <span>STATUS</span>
      </div>
      <div className="co-agenda-body">
        {AGENDA_SEED.map((r, i) => (
          <div className={`co-row ${i === hi ? 'hi' : ''} ${r.k || ''}`} key={i}>
            <span className="ts">{r.ts}</span>
            <span className="who">{r.who}</span>
            <span className="proc">{r.proc}</span>
            <span className={`tag ${r.k || ''}`}>{r.tag}</span>
          </div>
        ))}
      </div>
      <div className="co-agenda-foot">
        <span>10 confirmações · 2 leads novos · 1 risco de falta · operado pela IA</span>
      </div>
    </div>
  );
};

/* ---------------- Hero ---------------- */
const ClinikHero = () => (
  <section className="ap-hero" id="top" data-net-section="hero">
    <div className="ap-hero-inner">
      <div className="ap-hero-grid">
        <div>
          <Reveal y={18}>
            <div className="ap-kicker"><span className="dot" />Vertical 02 · Clinics · Available</div>
          </Reveal>
          <Reveal y={32} delay={80}>
            <h1>
              Clinics, <span className="em">operated by AI.</span><br/>
              Not just <span className="em">scheduled</span> by it.
            </h1>
          </Reveal>
          <Reveal y={20} delay={220}>
            <p className="ap-hero-sub">
              Clinik One is an AI-native operating system for dental and aesthetic clinics. Scheduling, confirmations, no-show recovery, treatment plans, billing — run by agents that speak the patient's language on the channel the patient already uses.
            </p>
          </Reveal>
          <Reveal y={16} delay={320}>
            <div className="ap-hero-meta">
              <span><b>80 / 20</b> &nbsp; AI / human split</span>
              <span><b>WhatsApp</b> &nbsp; native</span>
              <span><b>BR + LatAm</b> &nbsp; first</span>
            </div>
          </Reveal>
        </div>
        <Reveal y={28} delay={160}>
          <ClinikAgenda />
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------------- Problem ---------------- */
const CO_PROBLEMS = [
  ['01', 'The front desk is the bottleneck.', 'A great clinician spends two hours a day chasing confirmations, rescheduling, and triaging WhatsApp. The work isn\'t glamorous. It\'s also what the business runs on.'],
  ['02', 'Generic clinic software treats the calendar as the product.', "Real operations run on conversations. Most software gives you a dashboard — then leaves the messaging, the follow-ups, and the judgment calls to an overloaded human."],
  ['03', 'No-shows quietly kill the P&L.', 'Every missed appointment costs an average of R$ 280 in this market. Multiply by 14 no-shows per week across a mid-size clinic and you\'re losing the profit of a senior hygienist.'],
];

const ClinikProblem = () => (
  <section className="ap-problem" data-net-section="thesis">
    <div className="ap-problem-inner">
      <Reveal y={20}><div className="eyebrow">Why Clinik One exists</div></Reveal>
      <Reveal y={32} delay={80}>
        <h2>The clinic operation has been under-automated for a decade.</h2>
      </Reveal>
      <div className="ap-problem-grid">
        {CO_PROBLEMS.map(([n, t, d], i) => (
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
const CO_PIPELINE = [
  { n: '01', t: 'Attract', d: 'Meta, Google, and Instagram leads land in one inbox. AI qualifies, scores, routes.', tag: 'META · GOOGLE · INSTAGRAM', icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8z"/><path d="M5 8h6M8 5v6"/></svg>
  )},
  { n: '02', t: 'Converse', d: "WhatsApp agent answers in the patient's own voice register — clinical, caring, never robotic.", tag: 'WHATSAPP · PT-BR', icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h10v8H7l-4 3V3z"/></svg>
  )},
  { n: '03', t: 'Schedule', d: 'Agenda, reschedules, cancellations, waitlist — all handled by the agent with full calendar visibility.', tag: 'AGENDA · WAITLIST', icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="12" height="11" rx="1"/><path d="M2 6h12M5 2v3M11 2v3"/></svg>
  )},
  { n: '04', t: 'Confirm', d: 'Automatic confirmations 24h and 2h out. No-show risk scored. At-risk patients re-engaged before they drop.', tag: 'NO-SHOW PREVENTION', icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 8l3 3 9-9"/></svg>
  )},
  { n: '05', t: 'Retain', d: 'Post-procedure follow-up, review prompts, recall campaigns, treatment plan continuity — on autopilot.', tag: 'FOLLOW-UP · RECALL', icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8a5 5 0 0 1 10 0M3 8l-1-1M3 8l1-1M13 8a5 5 0 0 1-10 0M13 8l1 1M13 8l-1 1"/></svg>
  )},
];

const ClinikSolution = () => (
  <section className="ap-solution" data-net-section="engine">
    <div className="ap-solution-inner">
      <div className="ap-solution-head">
        <Reveal y={20}><div className="eyebrow">How it works</div></Reveal>
        <Reveal y={32} delay={80}><h2 className="h-lg" style={{ marginTop: 16 }}>One loop. Five stages. The clinic runs itself between the procedures.</h2></Reveal>
        <Reveal y={20} delay={180}>
          <p className="p-lead">
            Clinik One runs the full patient loop — from lead capture to long-term retention — on infrastructure tuned for your specialty. The clinical team focuses on procedures. The operational team reviews, approves, escalates. Everything else runs itself.
          </p>
        </Reveal>
      </div>
      <Reveal y={40} delay={100}>
        <div className="ap-pipe">
          <div className="ap-pipe-row">
            {CO_PIPELINE.map((s, i) => (
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

/* ---------------- Numbers (reuses Odometer from adpilot.jsx if loaded; otherwise inline copy) ---------------- */
const COdometer = ({ target, duration = 1400 }) => {
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

const ClinikNumbers = () => (
  <section className="ap-numbers" data-net-section="capabilities">
    <div className="ap-numbers-inner">
      <div className="ap-numbers-head">
        <Reveal y={20}><div className="eyebrow">What it produces</div></Reveal>
        <Reveal y={32} delay={80}><h2 className="h-lg" style={{ marginTop: 16 }}>Numbers from the pilot cohort.</h2></Reveal>
        <Reveal y={16} delay={180}>
          <p className="p-lead">Across 6 clinics (dental + aesthetic), first 90 days on Clinik One infrastructure. Compared to the clinic's pre-pilot trailing 90-day baseline.</p>
        </Reveal>
      </div>
      <div className="ap-num-grid">
        <Reveal y={24} delay={0}>
          <div className="ap-num">
            <div className="label">No-show reduction</div>
            <div className="val">−<COdometer target={42} />%</div>
            <div className="note">Weighted across 6 clinics, trailing 90d vs. pre-onboarding baseline.</div>
          </div>
        </Reveal>
        <Reveal y={24} delay={80}>
          <div className="ap-num">
            <div className="label">Lead-to-appointment</div>
            <div className="val">+<COdometer target={68} />%</div>
            <div className="note">Faster first response + intelligent qualification closes the gap.</div>
          </div>
        </Reveal>
        <Reveal y={24} delay={160}>
          <div className="ap-num">
            <div className="label">Front-desk hours / week</div>
            <div className="val">−<COdometer target={18} /></div>
            <div className="note">Hours returned to the clinical team. Per clinic. Every week.</div>
          </div>
        </Reveal>
        <Reveal y={24} delay={240}>
          <div className="ap-num">
            <div className="label">Patient messages / month</div>
            <div className="val"><COdometer target={4200} /></div>
            <div className="note">Handled autonomously. Escalated when the patient needs a human.</div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------------- Tech marquee ---------------- */
const CO_STACK = [
  'WhatsApp Cloud API', 'Meta Lead Ads', 'Instagram Direct', 'Anthropic', 'GPT-4o',
  'Supabase', 'Vercel', 'Twilio', 'Resend', 'Stripe', 'Pagar.me', 'Clinicorp',
  'iClinic', 'Google Calendar', 'Zapier', 'Pipefy',
];
const ClinikTech = () => (
  <section className="ap-tech" data-net-section="stack">
    <div className="ap-tech-head">
      <Reveal y={20}><div className="eyebrow">The stack</div></Reveal>
      <Reveal y={32} delay={80}><h2 className="h-lg" style={{ marginTop: 16 }}>Built on the infrastructure the clinic already lives in.</h2></Reveal>
    </div>
    <div className="marquee">
      <div className="marquee-track">
        {[...CO_STACK, ...CO_STACK].map((s, i) => <span key={i}>{s}</span>)}
      </div>
    </div>
  </section>
);

/* ---------------- The Model ---------------- */
const ClinikPartnership = () => (
  <section className="ap-partnership" data-net-section="verticals">
    <div className="ap-partnership-inner">
      <Reveal y={20}><div className="eyebrow">The model</div></Reveal>
      <Reveal y={32} delay={80}><h2 className="h-lg" style={{ marginTop: 16 }}>Not a software you install. An operation that runs.</h2></Reveal>
      <Reveal y={20} delay={180}>
        <p className="p-lead">Clinik One isn't licensed and configured. It's deployed. The clinic connects WhatsApp, defines its services in a 5-step wizard, and the agents go live. There is no IT project. There is no integration phase. There is an operation that begins.</p>
      </Reveal>
    </div>
  </section>
);

/* ---------------- Closing ---------------- */
const ClinikClose = () => {
  const [ref, shown] = useReveal({ threshold: 0.3 });
  return (
    <section className="ap-close" data-net-section="final" ref={ref}>
      <div className={`final-text ${shown ? 'is-in' : ''}`} style={{ position: 'relative', zIndex: 2 }}>
        <h2>Stop losing revenue to the front desk. Start operating the clinic as infrastructure.</h2>
        <p>If the operations layer has been pulling your team away from patients, Clinik One is how that ends.</p>
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

/* ---------------- Related ---------------- */
const CO_RELATED = [
  { name: 'AdPilot',        desc: 'Paid media, run by AI. Managed by fewer humans.', href: './adpilot.html' },
  { name: 'RegenX Academy', desc: 'A complete clinical-education platform.',        href: './regenx-academy.html' },
  { name: 'USX Peptides',   desc: 'Regulated research-grade peptide commerce.',      href: './usx-peptides.html' },
];
const ClinikRelated = () => (
  <section className="ap-related" data-net-section="signal">
    <div className="ap-related-inner">
      <Reveal y={18}><h3>More verticals</h3></Reveal>
      <div className="ap-related-grid">
        {CO_RELATED.map((v, i) => (
          <Reveal key={v.name} delay={i * 80} y={20}>
            <a className="ap-rel-card" href={v.href}>
              <div className="name">{v.name}</div>
              <div className="desc">{v.desc}</div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- Footer ---------------- */
const ClinikFooter = () => <SiteFooter basePath="../" />;

Object.assign(window, {
  ClinikNav, ClinikBreadcrumb, ClinikAgenda,
  ClinikHero, ClinikProblem, ClinikSolution,
  ClinikNumbers, ClinikTech, ClinikPartnership,
  ClinikClose, ClinikRelated, ClinikFooter,
});
