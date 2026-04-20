/* Generic vertical case-study page renderer.
 * Pass a data object (see verticals/*.data.js) — component composes the 8 sections.
 * Two variants: 'client' (default) and 'market' (no credits; different eyebrow tone).
 */

/* ---------------- Local Nav ---------------- */
const VerticalNav = () => <SiteNav current="verticals" basePath="../" />;

/* ---------------- Breadcrumb ---------------- */
const VerticalBreadcrumb = ({ current }) => (
  <div className="pl-breadcrumb">
    <a href="../home.html">OneClient</a>
    <span className="sep">/</span>
    <a href="./index.html">Verticals</a>
    <span className="sep">/</span>
    <span className="cur">{current}</span>
  </div>
);

/* ---------------- Headline with inline <em> support ----------
 * Pass plain string, or object { plain, em, trailing } to soften last phrase.
 */
const HeadlineText = ({ value }) => {
  if (typeof value === 'string') return <>{value}</>;
  const { plain, em, trailing = '' } = value;
  return (
    <>
      {plain}{plain ? ' ' : ''}<span className="em">{em}</span>{trailing}
    </>
  );
};

/* ---------------- 01 · Hero ---------------- */
const VHero = ({ data }) => (
  <section className="pl-sec pl-sec--first" id="top" data-net-section="verticals">
    <div className="pl-sec-inner">
      <Reveal y={16}>
        <div className="pl-eyebrow pl-eyebrow--live">
          <span className="dot" />{data.eyebrow}
        </div>
      </Reveal>
      <Reveal y={32} delay={80}>
        <h1 className="pl-h1"><HeadlineText value={data.headline} /></h1>
      </Reveal>
      <Reveal y={20} delay={180}>
        <p className="pl-lead pl-lead--hero">{data.subhead}</p>
      </Reveal>
      {data.customWidget && (
        <Reveal y={28} delay={240}>
          <div className="pl-hero-widget">{data.customWidget}</div>
        </Reveal>
      )}
      <Reveal y={16} delay={280}>
        <div className="pl-hero-meta">
          {data.meta.map((m, i) => (
            <React.Fragment key={i}>
              <span>{m}</span>
              {i < data.meta.length - 1 && <span className="dot">·</span>}
            </React.Fragment>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------------- 02 · Partner (client-case only) ---------------- */
const VPartner = ({ data }) => (
  <section className="pl-sec" data-net-section="engine">
    <div className="pl-sec-inner">
      <Reveal y={16}><div className="pl-eyebrow"><span className="dot" />{data.eyebrow}</div></Reveal>
      <Reveal y={24} delay={80}>
        <h2 className="pl-h2"><HeadlineText value={data.headline} /></h2>
      </Reveal>
      <Reveal y={18} delay={180}>
        <p className="pl-lead">{data.paragraph}</p>
      </Reveal>
      {data.credits && data.credits.length > 0 && (
        <Reveal y={14} delay={260}>
          <div className="pl-credits">
            {data.credits.map((c, i) => (
              <div className="pl-credit" key={i}>
                <span className="name">{c.name}</span>
                <span className="sep">—</span>
                <span className="role">{c.role}</span>
              </div>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  </section>
);

/* ---------------- 02 · Market (market-case variant) ---------------- */
const VMarket = ({ data }) => (
  <section className="pl-sec pl-sec--prose" data-net-section="engine">
    <div className="pl-sec-inner">
      <Reveal y={16}><div className="pl-eyebrow"><span className="dot" />{data.eyebrow}</div></Reveal>
      <Reveal y={24} delay={80}>
        <h2 className="pl-h2"><HeadlineText value={data.headline} /></h2>
      </Reveal>
      <Reveal y={18} delay={180}>
        <p className="pl-lead">{data.paragraph}</p>
      </Reveal>
    </div>
  </section>
);

/* ---------------- 03 · Before (client) / Product-intro (market) ---------------- */
const VBefore = ({ data }) => (
  <section className="pl-sec pl-sec--prose" data-net-section="thesis">
    <div className="pl-sec-inner">
      <Reveal y={16}><div className="pl-eyebrow"><span className="dot" />{data.eyebrow}</div></Reveal>
      <Reveal y={28} delay={80}>
        <h2 className="pl-h2"><HeadlineText value={data.headline} /></h2>
      </Reveal>
      {data.paragraphs.map((p, i) => (
        <Reveal key={i} y={18} delay={160 + i * 80}>
          <p className="pl-lead">{p}</p>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ---------------- 04 · Build (with 4-cell capability grid) ---------------- */
const VBuild = ({ data }) => (
  <section className="pl-sec" data-net-section="verticals">
    <div className="pl-sec-inner pl-sec-inner--wide">
      <Reveal y={16}><div className="pl-eyebrow"><span className="dot" />{data.eyebrow}</div></Reveal>
      <Reveal y={28} delay={80}>
        <h2 className="pl-h2"><HeadlineText value={data.headline} /></h2>
      </Reveal>
      <Reveal y={18} delay={160}>
        <p className="pl-lead">{data.paragraph}</p>
      </Reveal>
      <div className="pl-caps">
        {data.capabilities.map(([n, t, d], i) => (
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

/* ---------------- Odometer: supports numeric or literal string ---------------- */
const VOdo = ({ target, duration = 1400 }) => {
  const [ref, shown] = useReveal({ threshold: 0.4 });
  const isNumeric = typeof target === 'number';
  const [value, setValue] = React.useState(isNumeric ? 0 : target);
  React.useEffect(() => {
    if (!isNumeric) { setValue(target); return; }
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
  }, [shown, target, duration, isNumeric]);
  if (!isNumeric) {
    return <span ref={ref} className="pl-odo-static">{target}</span>;
  }
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
const VToday = ({ data }) => (
  <section className="pl-sec" data-net-section="capabilities">
    <div className="pl-sec-inner pl-sec-inner--wide">
      <Reveal y={16}><div className="pl-eyebrow pl-eyebrow--live"><span className="dot" />{data.eyebrow}</div></Reveal>
      <Reveal y={28} delay={80}>
        <h2 className="pl-h2"><HeadlineText value={data.headline} /></h2>
      </Reveal>
      <Reveal y={18} delay={160}>
        <p className="pl-lead">{data.paragraph}</p>
      </Reveal>
      <div className="pl-stats">
        {data.stats.map((s, i) => (
          <Reveal key={i} y={24} delay={i * 100}>
            <div className="pl-stat">
              <div className="val">
                <VOdo target={s.val} />
                {s.suffix && <span className="suffix">{s.suffix}</span>}
              </div>
              <div className="label">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- 06 · Thesis ---------------- */
const VThesis = ({ data }) => (
  <section className="pl-sec pl-sec--thesis" data-net-section="signal">
    <div className="pl-sec-inner">
      <Reveal y={16}><div className="pl-eyebrow"><span className="dot" />{data.eyebrow}</div></Reveal>
      <Reveal y={28} delay={80}>
        <h2 className="pl-h2"><HeadlineText value={data.headline} /></h2>
      </Reveal>
      <Reveal y={18} delay={160}>
        <p className="pl-lead">{data.paragraph}</p>
      </Reveal>
    </div>
  </section>
);

/* ---------------- 07 · Conversation ---------------- */
const VConversation = ({ data }) => {
  const [ref, shown] = useReveal({ threshold: 0.3 });
  return (
    <section className="pl-sec pl-sec--conv" data-net-section="verticals" ref={ref}>
      <div className={`pl-sec-inner final-text ${shown ? 'is-in' : ''}`}>
        <div className="pl-eyebrow"><span className="dot" />{data.eyebrow}</div>
        <h2 className="pl-h2"><HeadlineText value={data.headline} /></h2>
        <p className="pl-lead">{data.paragraph}</p>
        <a className="final-link pl-cta" href="../contact.html">
          Start a conversation <span className="arr">→</span>
        </a>
      </div>
    </section>
  );
};

/* ---------------- 08 · Portfolio (others) ---------------- */
const VOther = ({ others }) => (
  <section className="pl-port" data-net-section="engine">
    <div className="pl-port-inner">
      <div className="pl-port-head">
        <div>
          <Reveal y={14}><div className="pl-eyebrow"><span className="dot" />Portfolio</div></Reveal>
          <Reveal y={20} delay={80}><h2 className="pl-h2">Other things we've built.</h2></Reveal>
        </div>
      </div>
      <div className="pl-port-grid">
        {others.map((v, i) => (
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

/* ---------------- Footer ---------------- */
const VERTICALS_FOOTER_LIST = [
  ['AdPilot',       './adpilot.html'],
  ['Clinik One',    './clinik-one.html'],
  ['Robot SaaS',    './robot-saas.html'],
  ['RegenX Academy',    './regenx-academy.html'],
  ['Unlocked Miami',    './unlocked-miami.html'],
  ['Gaia',          './gaia.html'],
  ['USX Peptides',  './usx-peptides.html'],
  ['Poli',          './poli.html'],
];
const VFooter = ({ currentSlug }) => <SiteFooter basePath="../" />;

/* ---------------- Full page composer ---------------- */
const VerticalPage = ({ data }) => (
  <>
    <PageNetwork />
    <ScrollProgress />
    <VerticalNav />
    <VerticalBreadcrumb current={data.breadcrumb} />
    <VHero data={data.hero} />
    {data.variant === 'market'
      ? <VMarket data={data.partner} />
      : <VPartner data={data.partner} />}
    <VBefore data={data.before} />
    <VBuild data={data.build} />
    <VToday data={data.today} />
    <VThesis data={data.thesis} />
    <VConversation data={data.conversation} />
    <VOther others={data.other} />
    <VFooter currentSlug={data.slug} />
    <ChatWidget />
  </>
);

Object.assign(window, {
  VerticalNav, VerticalBreadcrumb, HeadlineText,
  VHero, VPartner, VMarket, VBefore, VBuild, VToday, VThesis, VConversation, VOther, VFooter,
  VOdo, VerticalPage,
});
