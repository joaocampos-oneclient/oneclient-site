/* Signal article — "Generic software is ending." */

/* ---------------- Article-scoped scroll progress ---------------- */
const ArticleProgress = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const body = document.querySelector('[data-art-body]');
      if (!body) return;
      const r = body.getBoundingClientRect();
      const top = r.top + window.scrollY;
      const h = r.height;
      const vh = window.innerHeight;
      // Progress: 0 until body top enters viewport; reaches 1 when body bottom leaves.
      // We measure against scroll position where reading "starts" (body top at vh*0.9)
      // and "ends" (body bottom at vh*0.2).
      const start = top - vh * 0.85;
      const end = top + h - vh * 0.25;
      const y = window.scrollY;
      let p;
      if (y <= start) p = 0;
      else if (y >= end) p = 1;
      else p = (y - start) / (end - start);
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="art-progress"><div ref={ref} className="art-progress__bar" /></div>;
};

/* ---------------- Breadcrumb (three segments) ---------------- */
const ArticleBreadcrumb = () => (
  <div className="pl-breadcrumb">
    <a href="../home.html">OneClient</a>
    <span className="sep">/</span>
    <a href="./index.html">Signal</a>
    <span className="sep">/</span>
    <span className="cur">The essay</span>
  </div>
);

/* ---------------- 01 · Article header ---------------- */
const ArticleHeader = () => {
  const [ref, shown] = useReveal({ threshold: 0.1 });
  const cls = (d) => `art-anim ${shown ? 'is-in' : ''}`;
  const delay = (ms) => ({ transitionDelay: shown ? `${ms}ms` : '0ms' });
  return (
    <header className="art-hdr" data-net-section="article_header" ref={ref}>
      <div className="art-hdr-inner">
        <div className={cls()} style={delay(0)}>
          <div className="art-eyebrow">Essay · April 2026</div>
        </div>
        <h1 className={`art-title ${cls()}`} style={delay(60)}>
          Generic software is ending.
        </h1>
        <p className={`art-subtitle ${cls()}`} style={delay(200)}>
          What the next cycle rewards — and what it stops forgiving.
        </p>
        <div className={`art-hdr-rule ${cls()}`} style={delay(300)} aria-hidden="true" />
        <div className={cls()} style={delay(300)}>
          <p className="art-byline">João Augusto Campos</p>
          <p className="art-byline-role">Founder &amp; CEO, OneClient</p>
          <p className="art-meta">
            <span>8 min read</span>
            <span className="sep">·</span>
            <span>Published April 2026</span>
          </p>
        </div>
      </div>
    </header>
  );
};

/* ---------------- Section break ---------------- */
const SectionBreak = () => {
  const [ref, shown] = useReveal({ threshold: 0.1 });
  return (
    <div className={`art-break ${shown ? 'is-in' : ''}`} ref={ref} aria-hidden="true">
      <span />
    </div>
  );
};

/* ---------------- 02 · Article body ---------------- */
const ArticleBody = () => (
  <section className="art-body" data-net-section="article_body" data-art-body>
    <div className="art-body-inner">
      {/* Part 1 */}
      <p className="art-lead">
        For twenty years, software taught us to adapt.
      </p>
      <p>
        The CRM required you to shape your sales process to its pipeline. The ERP asked you to rewrite your accounting to fit its tables. The marketing platform demanded your campaigns speak its schema. We called this digital transformation. It was closer to conformity.
      </p>
      <p>
        I spent over a decade inside that logic. I built and scaled a horizontal SaaS to multi-million-dollar ARR, working with thousands of operators who contorted their businesses to fit software that was supposed to help them run those businesses. We were selling acceleration we didn't live ourselves. Our marketing wasn't automated. Our finance wasn't automated. Our sales weren't automated. We were a software company that sold a dream it couldn't inhabit.
      </p>
      <p>
        That's the part I don't see talked about honestly. Horizontal SaaS worked because it had no alternative. The cost of building something shaped exactly to your operation was higher than the cost of changing your operation to fit generic software. That math held for twenty years.
      </p>
      <p>
        It doesn't hold anymore.
      </p>

      <SectionBreak />

      {/* Part 2 */}
      <p><b>The direction of adaptation has reversed.</b></p>
      <p>
        Software is now cheap enough, specific enough, and fast enough to shape itself around the business instead of the other way around. AI didn't cause this — it finished it. It removed the last excuse generic platforms had for existing.
      </p>
      <p>
        Most operators haven't absorbed this yet. They still treat AI as a better search engine. They ask it to rewrite emails, summarize documents, draft copy. They replace Google with a more expensive Google and call it transformation. That's not the shift.
      </p>
      <p>
        <b>AI is labor.</b> Not a search bar. Not a productivity tool. Labor.
      </p>
      <p>
        When you operate from that premise, the questions change. You stop asking "how do I use AI in my workflow" and start asking "which roles inside my company should stop being human." The answer, for most operations, is: more than you're comfortable admitting.
      </p>
      <p>
        I run an 80% non-human marketing operation today. Senior-level output. One person reviews. The rest is infrastructure. This was not a technical breakthrough on our side. The tools have been available. The blocker was belief.
      </p>

      <SectionBreak />

      {/* Part 3 */}
      <p><b>Generalists are the ones who lose first.</b></p>
      <p>
        There's a line I've been repeating lately: <em>the good ones are replaceable.</em> The great ones become the pilots who replace the good ones and the bad ones. The mediocre professionals, the serviceable agencies, the competent-but-unremarkable operators — that entire middle layer is what vertical AI compresses out of existence. What remains is sharper, narrower, and operated by fewer people who know exactly what they're doing.
      </p>
      <p>
        The same logic applies to software companies.
      </p>
      <p>
        Horizontal SaaS served the middle. That's why it worked. Everyone was middle. The tool didn't need to be exceptional for any one market because it was acceptable across all of them.
      </p>
      <p>
        The middle is what's disappearing.
      </p>

      <SectionBreak />

      {/* Part 4 */}
      <p><b>What replaces it isn't better SaaS. It's the end of SaaS as a category.</b></p>
      <p>
        Within a cycle shorter than most incumbents expect, companies will stop buying generic software and start operating their own vertical AI stacks — shaped to their market, their regulations, their customers, their channels. The infrastructure to build that stack used to cost a year and a seven-figure engineering team. It now costs weeks and a partner who knows what they're doing.
      </p>
      <p>
        This is what OneClient exists to build.
      </p>
      <p>
        We don't sell a platform. We build vertical operations — shaped around specific markets, operated by specialists who bring audience and judgment, powered by frontier AI infrastructure that stays invisible to the end user. Each vertical is its own business. The engine underneath is shared. The advantage is that we've built it enough times to know where the work actually lives.
      </p>
      <p>
        The work lives in the integration layer generic SaaS can't touch — regulatory constraints no template can encode, conversational surfaces that don't fit inside dashboards, compliance architectures that have to be present from the first line of code because they can't be bolted on later. An off-the-shelf tool can't serve a regulated peptide e-commerce in the United States. It can't serve a trilingual real estate operation in Miami. It can't serve a medical education platform that has to stay inside regulatory boundaries in two languages. Those markets don't need better software. They need software that exists for them.
      </p>
      <p>
        That's what we build. Operations shaped with enough precision that the operator, after ninety days, can't imagine running the business any other way.
      </p>

      <SectionBreak />

      {/* Part 5 — final */}
      <p><b>The operators who feel this shift first will have a five-year head start on the ones who don't.</b></p>
      <p>
        The ones who still treat AI as a copilot for knowledge work will spend the next cycle incrementally improving processes that are about to be replaced wholesale. The ones who treat AI as labor — and restructure their operations around what that makes possible — will end the cycle running businesses that the first group can't catch.
      </p>
      <p>
        I don't think this is a prediction. I think it's already happening. The operators we work with aren't ahead of a trend. They're the ones who stopped waiting for generic tools to get good enough and went and built what they actually needed.
      </p>
      <p>
        If you run a serious operation and the tooling around it has been holding you back for longer than you want to admit — that's the conversation worth having.
      </p>
      <p>
        The next cycle doesn't reward patience.<span className="art-end-cursor" aria-hidden="true" />
      </p>
    </div>
  </section>
);

/* ---------------- 03 · Close ---------------- */
const ArticleClose = () => {
  const [ref, shown] = useReveal({ threshold: 0.15 });
  return (
    <section className="art-close" data-net-section="article_close" ref={ref}>
      <div
        className="art-close-inner"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 600ms var(--ease-out), transform 600ms var(--ease-out)',
        }}
      >
        <div className="art-close-rule" aria-hidden="true" />
        <p className="art-close-sig">— João Augusto Campos</p>
        <p className="art-close-role">Founder &amp; CEO, OneClient</p>
        <p className="art-close-loc">Miami, Florida</p>
      </div>
    </section>
  );
};

/* ---------------- 04 · Adjacent CTA ---------------- */
const ArticleCTA = () => {
  const [ref, shown] = useReveal({ threshold: 0.2 });
  return (
    <section className="art-cta" data-net-section="article_cta" ref={ref}>
      <div
        className="art-cta-inner"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 600ms var(--ease-out), transform 600ms var(--ease-out)',
        }}
      >
        <div className="pl-eyebrow"><span className="dot" />If this resonates</div>
        <h2 className="art-cta-head">Start a conversation.</h2>
        <a className="art-cta-link" href="mailto:info@1-client.com">
          info@1-client.com <span className="arr">→</span>
        </a>
      </div>
    </section>
  );
};

/* ---------------- 05 · Related (empty state) ---------------- */
const ArticleRelated = () => {
  const [ref, shown] = useReveal({ threshold: 0.2 });
  return (
    <section className="art-rel" data-net-section="article_related" ref={ref}>
      <div
        className="art-rel-inner"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 600ms var(--ease-out), transform 600ms var(--ease-out)',
        }}
      >
        <div className="pl-eyebrow"><span className="dot" />More from Signal</div>
        <h2 className="art-rel-head">One piece in. More when they deserve to exist.</h2>
        <a className="art-rel-link" href="./index.html">
          Back to Signal <span className="arr">→</span>
        </a>
      </div>
    </section>
  );
};

/* ---------------- Page ---------------- */
const ArticlePage = () => (
  <>
    <PageNetwork />
    <ArticleProgress />
    <SignalNav />
    <ArticleBreadcrumb />
    <ArticleHeader />
    <ArticleBody />
    <ArticleClose />
    <ArticleCTA />
    <ArticleRelated />
    <SignalFooter />
  </>
);
