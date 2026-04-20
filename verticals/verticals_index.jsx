/* Verticals Index page — 4 sections. Uses existing Reveal, PageNetwork, ChatWidget. */

const VIX_NAV = () => <SiteNav current="verticals" basePath="../" />;

const VIX_Breadcrumb = () => (
  <div className="pl-breadcrumb">
    <a href="../home.html">OneClient</a>
    <span className="sep">/</span>
    <span className="cur">Verticals</span>
  </div>
);

/* ---------------- Data ---------------- */
const VIX_CARDS = [
  {
    href: './poli.html',
    name: 'Poli',
    status: 'live',
    cat: 'White-label AI',
    desc: "The AI layer behind one of Brazil's leading WhatsApp platforms. Operated by Poli, invisible to the end user. Shipped in 30 days.",
    meta: ['Built in 30 days', 'Multi-provider', 'In production'],
  },
  {
    href: './gaia.html',
    name: 'Gaia',
    status: 'live',
    cat: 'Embedded AI infrastructure',
    desc: "The conversational AI serving ~700 business-owner members of Mastermind Giants. Built with Marcus Marques and Lucas Amaral. In production since 2025.",
    meta: ['~700 members served daily', 'Audio native', 'Since 2025'],
  },
  {
    href: './regenx-academy.html',
    name: 'RegenX Academy',
    status: 'live',
    cat: 'Medical education platform',
    desc: "A complete medical education platform for regenerative medicine. Built with Dra. Marcelly Achkar and Dr. Marcelo Gauche. Generated R$100k+ in the first month of operation.",
    meta: ['3 domains', 'R$100k+ first month', 'Bilingual'],
  },
  {
    href: './unlocked-miami.html',
    name: 'Unlocked Miami',
    status: 'live',
    cat: 'Luxury real estate operation',
    desc: "The complete digital operation of a luxury real estate broker serving international buyers. Trilingual, MLS-integrated, AI-enriched. Built with Thiago Costa in 1 month after 2 years of failed attempts elsewhere.",
    meta: ['3 languages', 'MLS-integrated', '1 month to launch'],
  },
  {
    href: './usx-peptides.html',
    name: 'USX Peptides',
    status: 'live',
    cat: 'Regulated e-commerce',
    desc: "Research peptides e-commerce built for the most regulated market in the world. Three integrated portals, compliance as architecture. Built with Marcio, Fred, Dra. Marcelly Achkar, and Dr. Marcelo Gauche.",
    meta: ['3 portals', 'Compliance-first', 'In production'],
  },
  {
    href: './robot-saas.html',
    name: 'Robot SaaS',
    status: 'live',
    cat: 'Multi-agent infrastructure',
    desc: "Multi-agent digital coworkers deployed inside Brazilian SMBs through WhatsApp. Multiple live operations across distinct markets.",
    meta: ['5 live operations', 'Multi-agent', 'WhatsApp-native'],
  },
  {
    href: './adpilot.html',
    name: 'AdPilot',
    status: 'available',
    cat: 'Paid media operations',
    desc: "Autonomous paid media operation — Meta, Google, and TikTok campaigns run end-to-end by AI. 80% of daily work without human intervention.",
    meta: ['80% autonomous', 'Multi-platform', 'Available'],
  },
  {
    href: './clinik-one.html',
    name: 'Clinik One',
    status: 'available',
    cat: 'Healthcare operations',
    desc: "Dental and aesthetic clinics, operated by AI. Three specialized agents running inside WhatsApp. Replaces the front-desk role entirely.",
    meta: ['3 specialized agents', 'WhatsApp-native', 'Available'],
  },
];

/* ---------------- 01 · Hero ---------------- */
const VIX_Hero = () => (
  <section className="vix-hero" id="top" data-net-section="hero">
    <div className="vix-hero-inner">
      <Reveal y={16}>
        <div className="pl-eyebrow"><span className="dot" />The portfolio</div>
      </Reveal>
      <Reveal y={20} delay={80}>
        <h1 className="pl-h1">Eight operations. <span className="em">One engine underneath.</span></h1>
      </Reveal>
      <Reveal y={18} delay={200}>
        <p className="pl-lead pl-lead--hero">
          Each vertical below is a live or available operation built on OneClient infrastructure. Some are ours. Some belong to partners. All of them share the same engine — multi-agent AI, conversation-first, shipped to production.
        </p>
      </Reveal>
    </div>
  </section>
);

/* ---------------- Individual card with IntersectionObserver for cascade reveal ---------------- */
const VIX_Card = ({ card, index }) => {
  const [ref, shown] = useReveal({ threshold: 0.12 });
  const delay = index * 80;
  return (
    <a
      ref={ref}
      className={`vix-card ${shown ? 'is-in' : ''}`}
      href={card.href}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
    >
      <span className={`vix-pill ${card.status === 'live' ? 'vix-pill--live' : ''}`}>
        <span className="dot" />
        {card.status === 'live' ? 'Live' : 'Available'}
      </span>
      <h3 className="vix-name">{card.name}</h3>
      <div className="vix-cat">{card.cat}</div>
      <p className="vix-desc">{card.desc}</p>
      <div className="vix-meta">
        {card.meta.map((m, i) => (
          <React.Fragment key={i}>
            <span>{m}</span>
            {i < card.meta.length - 1 && <span className="sep">·</span>}
          </React.Fragment>
        ))}
        <span className="arrow" aria-hidden="true">→</span>
      </div>
    </a>
  );
};

/* ---------------- 02 · Grid ---------------- */
const VIX_Grid = () => (
  <section className="vix-grid-sec" data-net-section="verticals">
    <div className="vix-grid-inner">
      <Reveal y={14}><div className="pl-eyebrow"><span className="dot" />All eight</div></Reveal>
      <Reveal y={20} delay={80}>
        <h2 className="pl-h2" style={{ maxWidth: '24ch' }}>Each vertical, end-to-end.</h2>
      </Reveal>
      <div className="vix-grid">
        {VIX_CARDS.map((c, i) => <VIX_Card key={c.name} card={c} index={i} />)}
      </div>
    </div>
  </section>
);

/* ---------------- 03 · Common layer ---------------- */
const VIX_Common = () => (
  <section className="vix-common" data-net-section="engine">
    <div className="vix-common-inner">
      <Reveal y={16}><div className="pl-eyebrow"><span className="dot" />Underneath</div></Reveal>
      <Reveal y={24} delay={80}>
        <h2 className="pl-h2">Different verticals. <span style={{ color: 'var(--fg-2)' }}>Same engine.</span></h2>
      </Reveal>
      <Reveal y={18} delay={180}>
        <p className="pl-lead">
          Every operation above runs on shared infrastructure — multi-agent orchestration, semantic retrieval, WhatsApp-native conversation, frontier language models with automatic failover, real-time observability. The surface changes per market. The engine doesn't.
        </p>
      </Reveal>
    </div>
  </section>
);

/* ---------------- 04 · Conversation ---------------- */
const VIX_Conversation = () => {
  const [ref, shown] = useReveal({ threshold: 0.3 });
  return (
    <section className="vix-conv" data-net-section="final" ref={ref}>
      <div className={`vix-conv-inner ${shown ? 'is-in' : ''}`}>
        <div className="pl-eyebrow"><span className="dot" />Next</div>
        <h2>If you've seen something here that resembles what you're trying to build.</h2>
        <p>The fastest way to evaluate whether we can build something similar for you is a conversation.</p>
        <a className="pl-cta" href="../contact.html">
          Start a conversation <span className="arr">→</span>
        </a>
      </div>
    </section>
  );
};

/* ---------------- Footer (uses shared SiteFooter) ---------------- */
const VIX_Footer = () => <SiteFooter basePath="../" />;


/* ---------------- Page ---------------- */
const VIX_Page = () => (
  <>
    <PageNetwork />
    <ScrollProgress />
    <VIX_NAV />
    <VIX_Breadcrumb />
    <VIX_Hero />
    <VIX_Grid />
    <VIX_Common />
    <VIX_Conversation />
    <VIX_Footer />
    <ChatWidget />
  </>
);

Object.assign(window, { VIX_NAV, VIX_Breadcrumb, VIX_Hero, VIX_Card, VIX_Grid, VIX_Common, VIX_Conversation, VIX_Footer, VIX_Page });
