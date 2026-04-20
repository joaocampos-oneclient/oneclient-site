/* OneClient homepage — sections, part 2 */

const VERTICALS = [
  { name: 'AdPilot',        desc: 'Autonomous paid media management. 80% AI, 20% human.' },
  { name: 'Clinik One',     desc: 'AI-native operating system for medical clinics.' },
  { name: 'Robot SaaS',     desc: 'Multi-agent digital coworkers for SMB operators.' },
  { name: 'RegenX Academy', desc: 'Bilingual education platform for regenerative medicine.' },
  { name: 'Unlocked Miami', desc: 'AI-driven real estate operation in Miami.' },
  { name: 'Gaia',           desc: 'AI infrastructure powering business accelerators.' },
  { name: 'USX Peptides',   desc: 'Research peptides e-commerce in the US.' },
  { name: 'Poli',           desc: 'White-labeled AI robots for WhatsApp omnichannel.' },
];

const Verticals = () => {
  const gridRef = useParallax({ speed: -0.06 });
  return (
    <section className="verticals wrap" id="verticals" data-net-section="verticals">
      <div className="verticals-head">
        <Reveal y={24}><div className="eyebrow">The portfolio</div></Reveal>
        <Reveal y={32} delay={80}><h2 className="h-lg" style={{ marginTop: 16 }}>Eight verticals.</h2></Reveal>
      </div>
      <div className="vert-grid" ref={gridRef}>
        {VERTICALS.map((v, i) => (
          <Reveal key={v.name} delay={i * 60} y={24} className="vert-card-wrap">
            <a className="vert-card" href={{
              AdPilot: '/verticals/adpilot.html',
              'Clinik One': '/verticals/clinik-one.html',
              'Robot SaaS': '/verticals/robot-saas.html',
              'RegenX Academy': '/verticals/regenx-academy.html',
              'Unlocked Miami': '/verticals/unlocked-miami.html',
              Gaia: '/verticals/gaia.html',
              'USX Peptides': '/verticals/usx-peptides.html',
              Poli: '/verticals/poli.html',
            }[v.name] || '#'}>
              <div className="name">{v.name}</div>
              <div className="desc">{v.desc}</div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const CAPS = [
  ['01', 'Frontier AI models',             'Anthropic, OpenAI, Google. We use whichever model wins each specific problem.'],
  ['02', 'Senior operators only',          'No junior layers. Every person building is a specialist. The leverage comes from AI, not from headcount.'],
  ['03', 'Continuous evolution',           'Every vertical is under constant review. We ship improvements weekly, not quarterly.'],
  ['04', 'Reliability over novelty',       'We optimize for reducing errors, reducing friction, and reducing operational noise — not for flashy demos.'],
  ['05', 'Domain-specialized infrastructure', 'Each vertical runs on infrastructure tuned for its market — medical, legal, real estate, e-commerce, education.'],
  ['06', 'AI as the foundation, not a feature', 'AI is not a layer we added. It’s the base we build on.'],
];

const Capabilities = () => (
  <section className="caps wrap" data-net-section="capabilities">
    <div className="caps-head">
      <Reveal y={24}><div className="eyebrow">How we build</div></Reveal>
      <Reveal y={32} delay={80}><h2 className="h-lg" style={{ marginTop: 16 }}>We use the best technology in the world — operated by a very small team of senior humans.</h2></Reveal>
      <Reveal y={28} delay={200}>
        <p className="p-lead">
          OneClient runs on frontier AI models, frontier infrastructure, and a compact team of operators, advisors, and specialists. We don’t scale by hiring. We scale by building leverage.
        </p>
      </Reveal>
    </div>
    <div className="cap-grid">
      {CAPS.map(([n, t, d], i) => (
        <Reveal key={n} delay={i * 100} y={24}>
          <div className="cap">
            <div className="num" style={{ animationDelay: `${i * 100}ms` }}>{n}</div>
            <div className="cap-body" style={{ animationDelay: `${i * 100 + 150}ms` }}>
              <div className="t">{t}</div>
              <div className="d">{d}</div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

const STACK = [
  'Anthropic', 'OpenAI', 'Google Gemini', 'Supabase', 'Vercel', 'Next.js',
  'Apify', 'Stripe', 'Twilio', 'Resend', 'EasyPost', 'Cloudflare',
  'Fal.ai', 'ElevenLabs', 'LangChain', 'Pinecone', 'PostgreSQL', 'Redis',
];

const Stack = () => {
  const wrapRef = useParallax({ speed: -0.12 });
  return (
    <section className="stack" data-net-section="stack" ref={wrapRef}>
      <div className="stack-head">
        <Reveal y={24}><div className="eyebrow">The stack</div></Reveal>
        <Reveal y={32} delay={80}><h2 className="h-lg" style={{ marginTop: 16 }}>Built on the best available infrastructure.</h2></Reveal>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {[...STACK, ...STACK].map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>
    </section>
  );
};

// Procedural monochrome cover art — one of 5 patterns per article
const ArticleCover = ({ variant, seed }) => {
  const s = (n) => Math.abs(Math.sin((seed + n) * 937.13) * 43758.5453) % 1;
  if (variant === 0) {
    // Concentric rings
    return (
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="225" fill="#0a0a0a" />
        {Array.from({ length: 14 }).map((_, i) => (
          <circle key={i} cx={200 + (s(i) - 0.5) * 80} cy={112} r={14 + i * 14} fill="none" stroke="#ffffff" strokeOpacity={0.06 + i * 0.015} />
        ))}
      </svg>
    );
  }
  if (variant === 1) {
    // Grid of dots with wave density
    const dots = [];
    for (let y = 0; y < 11; y++) for (let x = 0; x < 22; x++) {
      const d = Math.sin(x * 0.5 + y * 0.7) * 0.5 + 0.5;
      dots.push(<circle key={`${x}-${y}`} cx={18 + x * 17} cy={15 + y * 19} r={0.9 + d * 1.5} fill="#ffffff" fillOpacity={0.08 + d * 0.25} />);
    }
    return (
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="225" fill="#0a0a0a" />
        {dots}
      </svg>
    );
  }
  if (variant === 2) {
    // Diagonal hairlines
    return (
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="225" fill="#0a0a0a" />
        {Array.from({ length: 40 }).map((_, i) => (
          <line key={i} x1={-100 + i * 20} y1={-20} x2={-250 + i * 20} y2={250}
            stroke="#ffffff" strokeOpacity={0.04 + s(i) * 0.18} strokeWidth={0.6 + s(i + 3) * 1.6} />
        ))}
      </svg>
    );
  }
  if (variant === 3) {
    // Network constellation
    const pts = Array.from({ length: 24 }).map((_, i) => ({ x: s(i) * 400, y: s(i + 100) * 225 }));
    const lines = [];
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      if (Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y) < 90) lines.push([i, j]);
    }
    return (
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="225" fill="#0a0a0a" />
        {lines.map(([a, b], i) => (
          <line key={i} x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y} stroke="#ffffff" strokeOpacity="0.18" />
        ))}
        {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="1.6" fill="#ffffff" fillOpacity="0.7" />)}
      </svg>
    );
  }
  // variant 4 — large soft typographic glyph
  return (
    <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="225" fill="#0a0a0a" />
      <g fill="#ffffff" fillOpacity="0.08">
        <circle cx="120" cy="112" r="100" />
        <circle cx="120" cy="112" r="60" fill="#0a0a0a" />
      </g>
      <g stroke="#ffffff" strokeOpacity="0.14" fill="none">
        <path d="M260 30 L260 195 M200 30 L200 195 M320 30 L320 195" />
      </g>
    </svg>
  );
};

const ARTICLES = [
  { date: 'Mar 2026', title: 'Why we stopped calling it AI and started calling it infrastructure', read: '6 min read', cover: 0 },
  { date: 'Feb 2026', title: 'The partnership model: what we look for in a vertical', read: '8 min read', cover: 3 },
  { date: 'Jan 2026', title: 'What 12 years building a CRM taught me about building AI', read: '11 min read', cover: 1 },
  { date: 'Dec 2025', title: 'Complexity is a feature, not a bug', read: '5 min read', cover: 2 },
  { date: 'Nov 2025', title: 'The real reason most AI projects fail', read: '9 min read', cover: 4 },
];

const Signal = () => (
  <section className="signal" id="signal" data-net-section="signal">
    <div className="signal-head">
      <div>
        <Reveal y={24}><div className="eyebrow">Signal</div></Reveal>
        <Reveal y={32} delay={80}><h2 className="h-lg" style={{ marginTop: 16 }}>A point of view on AI and vertical markets.</h2></Reveal>
      </div>
      <Reveal y={20} delay={200}><a className="text-link" href="/signal/index.html">Read Signal <span className="arr">→</span></a></Reveal>
    </div>
    <div className="signal-viewport">
      <div className="signal-track">
        {[...ARTICLES, ...ARTICLES].map((a, i) => (
          <Reveal key={i} delay={(i % ARTICLES.length) * 80} y={24} className="article-wrap">
            <a className="article" href="/signal/generic-software-is-ending.html">
              <div className="article-cover">
                <ArticleCover variant={a.cover} seed={i + 1} />
              </div>
              <div className="article-body">
                <div className="date">{a.date}</div>
                <div className="title">{a.title}</div>
                <div className="read">{a.read}</div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// Final moment — uses the shared NetworkBg defined in home_parts_a.jsx
const FinalMoment = () => {
  const [ref, shown] = useReveal({ threshold: 0.3 });
  return (
    <section className="final" id="contact" data-net-section="final" ref={ref}>
      <div className={`final-text ${shown ? 'is-in' : ''}`} style={{ position: 'relative', zIndex: 2 }}>
        <h2>For operators who want to build beyond human limits.</h2>
        <a className="final-link" href="#" onClick={(e) => { e.preventDefault(); window.__openChat?.(); }}>
          Start a conversation <span className="arr">→</span>
        </a>
      </div>
    </section>
  );
};

const Footer = () => <SiteFooter basePath="./" />;


const ChatWidget = () => {
  const [open, setOpen] = React.useState(false);
  const [showBubble, setShowBubble] = React.useState(false);
  React.useEffect(() => {
    const seen = sessionStorage.getItem('oc_chat_bubble_shown');
    if (seen) return;
    const t1 = setTimeout(() => setShowBubble(true), 6000);
    const t2 = setTimeout(() => setShowBubble(false), 16000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  const openChat = () => {
    setOpen(true); setShowBubble(false);
    sessionStorage.setItem('oc_chat_bubble_shown', '1');
  };
  React.useEffect(() => { window.__openChat = openChat; }, []);
  return (
    <>
      {showBubble && (
        <div className="chat-bubble" onClick={openChat}>
          Third page already. If you want to go deeper on anything, I’m here.
        </div>
      )}
      <button className="chat-btn" onClick={openChat} aria-label="Open chat">
        <span className="dot" />
      </button>
      <aside className={`chat-panel ${open ? 'open' : ''}`} role="dialog" aria-label="OneClient chat">
        <div className="chat-head">
          <div className="t">OneClient</div>
          <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
        </div>
        <div className="chat-body">
          <div className="chat-msg">Ask anything about the verticals, the engine, or how a partnership works.</div>
          <div className="chat-msg me">Tell me about Clinik One.</div>
          <div className="chat-msg">Clinik One is an AI-native operating system for medical clinics. Operators, scheduling, and patient intake are all AI-mediated. Want the technical architecture or the partnership terms?</div>
        </div>
        <div className="chat-foot">
          <input className="chat-input" placeholder="Message OneClient…" />
        </div>
      </aside>
    </>
  );
};

Object.assign(window, { Verticals, Capabilities, Stack, Signal, FinalMoment, Footer, ChatWidget });
