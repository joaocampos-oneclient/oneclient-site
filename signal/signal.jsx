/* Signal — editorial landing. 4 sections. */

/* ---------------- Nav (Signal current) ---------------- */
const SignalNav = () => <SiteNav current="signal" basePath="../" />;

const SignalBreadcrumb = () => (
  <div className="pl-breadcrumb">
    <a href="../home.html">OneClient</a>
    <span className="sep">/</span>
    <span className="cur">Signal</span>
  </div>
);

/* ---------------- 01 · Hero ---------------- */
const SignalHero = () => (
  <section className="sg-hero" data-net-section="capabilities">
    <div className="sg-hero-inner">
      <Reveal y={14}>
        <div className="pl-eyebrow">
          <span className="dot" />The publication
        </div>
      </Reveal>
      <h1 className="pl-h1">
        <Reveal as="span" y={20} className="ab-line ab-line--1" delay={80}>
          Signal is where we write down what we've
        </Reveal>
        <Reveal as="span" y={20} className="ab-line ab-line--2" delay={320}>
          learned building vertical AI.
        </Reveal>
      </h1>
      <Reveal y={18} delay={620}>
        <p className="pl-lead">
          No cadence. No editorial calendar. Pieces go up when there's something worth saying — thesis, post-mortem, observation from inside a live operation. Read when one lands. Ignore when one doesn't.
        </p>
      </Reveal>
    </div>
  </section>
);

/* ---------------- 02 · Featured piece ---------------- */
const SignalFeatured = () => (
  <section className="sg-feat" data-net-section="thesis">
    <div className="sg-feat-inner">
      <a
        className="sg-feat-block"
        href="./generic-software-is-ending.html"
      >
        <Reveal y={10}>
          <div className="sg-feat-eyebrow">Latest · Essay</div>
        </Reveal>
        <Reveal y={8} delay={100}>
          <div className="sg-feat-rule" aria-hidden="true" />
        </Reveal>
        <Reveal y={20} delay={220}>
          <h2 className="sg-feat-title">Generic software is ending.</h2>
        </Reveal>
        <Reveal y={18} delay={340}>
          <p className="sg-feat-subtitle">
            What the next cycle rewards — and what it stops forgiving.
          </p>
        </Reveal>
        <Reveal y={14} delay={460}>
          <div className="sg-feat-meta">
            <b>João Augusto Campos</b>
            <span className="sep" />
            <span>8 min read</span>
            <span className="sep" />
            <span>April 2026</span>
          </div>
        </Reveal>
        <Reveal y={16} delay={580}>
          <div className="sg-feat-excerpt">
            <p>
              For twenty years, software taught us to adapt. The CRM required you to shape your sales process to its pipeline. The ERP asked you to rewrite your accounting to fit its tables. We called this digital transformation. It was closer to conformity.
            </p>
            <p>
              That math held for twenty years. It doesn't hold anymore.
            </p>
          </div>
        </Reveal>
        <Reveal y={12} delay={720}>
          <span className="sg-feat-link">
            Read the full piece <span className="arr">→</span>
          </span>
        </Reveal>
      </a>
    </div>
  </section>
);

/* ---------------- 03 · Editorial line ---------------- */
const SignalEditorial = () => (
  <section className="sg-edit" data-net-section="verticals">
    <div className="sg-edit-inner">
      <Reveal y={14}>
        <div className="pl-eyebrow"><span className="dot" />What Signal is</div>
      </Reveal>
      <h2 className="sg-edit-head">
        <Reveal as="span" y={18} className="ln" delay={60}>
          Arguments we believe in.
        </Reveal>
        <Reveal as="span" y={18} className="ln" delay={260}>
          Observations we can prove.
        </Reveal>
        <Reveal as="span" y={18} className="ln ln--last" delay={460}>
          Nothing else.
        </Reveal>
      </h2>
      <Reveal y={16} delay={680}>
        <p className="sg-edit-body">
          Every piece on Signal comes from inside a live operation. We write about what we've seen shipped, what we've watched fail, what we believe the next cycle rewards. There is no editorial team. There is no content strategy. There is a founder who writes when something is worth writing down.
        </p>
      </Reveal>
      <Reveal y={8} delay={820}>
        <div className="sg-edit-divider" aria-hidden="true" />
      </Reveal>
      <Reveal y={14} delay={880}>
        <p className="sg-edit-small">
          New pieces are shared through the OneClient LinkedIn. No newsletter. No subscription form. If you want to be notified when something lands, follow the account.
        </p>
      </Reveal>
      <Reveal y={10} delay={980}>
        <a className="sg-edit-li" href="#linkedin">
          Follow OneClient on LinkedIn <span className="arr">→</span>
        </a>
      </Reveal>
    </div>
  </section>
);

/* ---------------- 04 · Archive (deliberate empty state) ---------------- */
const SignalArchive = () => {
  const [ref, shown] = useReveal({ threshold: 0.15 });
  return (
    <section className="sg-arc" data-net-section="stack" ref={ref}>
      <div className="sg-arc-inner">
        <div style={{ opacity: shown ? 1 : 0, transform: shown ? 'translateY(0)' : 'translateY(14px)', transition: 'opacity 700ms var(--ease-out), transform 700ms var(--ease-out)' }}>
          <div className="pl-eyebrow"><span className="dot" />Archive</div>
          <h2 className="sg-arc-head">One piece in. More when they deserve to exist.</h2>
          <p className="sg-arc-sub">
            Signal will add pieces rarely — only when the argument is worth the reader's time. The archive will grow slowly on purpose.
          </p>
          <div className="sg-arc-ledger sg-arc-ledger--head" aria-hidden="true">
            <span>#</span><span>Title</span><span className="d">Published</span>
          </div>
          <a className="sg-arc-ledger" href="./generic-software-is-ending.html">
            <span className="n">001</span>
            <span className="t">Generic software is ending.</span>
            <span className="d">Apr 2026</span>
          </a>
          <div className="sg-arc-ledger sg-arc-ledger--ghost">
            <span className="n">002</span>
            <span className="t">— awaiting —</span>
            <span className="d">—</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Footer ---------------- */
const SignalFooter = () => <SiteFooter basePath="../" />;


/* ---------------- Page ---------------- */
const SignalPage = () => (
  <>
    <PageNetwork />
    <ScrollProgress />
    <SignalNav />
    <SignalBreadcrumb />
    <SignalHero />
    <SignalFeatured />
    <SignalEditorial />
    <SignalArchive />
    <SignalFooter />
    <ChatWidget />
  </>
);
