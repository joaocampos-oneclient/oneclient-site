/* OneClient homepage — sections, part 1: Nav, Hero, Thesis, Engine */

const Nav = () => <SiteNav current={null} basePath="./" />;

// Shared animated network — used by hero and final. Seeded so both
// frames are stable but independent (different seeds = different layouts).
// Three parallax layers: far / mid / near. Each layer has its own nodes,
// links, packets, and activation flashes. Scrolls at 20% / 50% / 80%.
const NetworkBg = ({
  className = '',
  seedOffset = 0,
  viewW = 1800,
  viewH = 900,
  parallax = true,
}) => {
  // Three-layer composition. Near layer gets the bright packets.
  const layers = React.useMemo(() => {
    const seedFn = (s0) => (n) => Math.abs(Math.sin((n + seedOffset + s0) * 937.13) * 43758.5453) % 1;
    const build = ({ count, linkDist, rBase, s0, packetCount, packetDur }) => {
      const seed = seedFn(s0);
      const pts = [];
      for (let i = 0; i < count; i++) pts.push({ x: seed(i) * viewW, y: seed(i + 100) * viewH, r: rBase + seed(i + 200) * rBase * 0.6 });
      const links = [];
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          if (Math.hypot(dx, dy) < linkDist) links.push([i, j]);
        }
      }
      const packets = [];
      for (let k = 0; k < packetCount && k < links.length; k++) {
        const idx = Math.floor((k * 7 + 3) * links.length / (packetCount + 2)) % links.length;
        const [a, b] = links[idx];
        packets.push({ from: pts[a], to: pts[b], dur: packetDur + (k % 4) * 0.4, delay: k * 0.55 });
      }
      // Activation flashes — choose ~30% of nodes on a long staggered cycle
      const flashes = [];
      const flashCount = Math.max(4, Math.floor(pts.length * 0.35));
      for (let k = 0; k < flashCount; k++) {
        const idx = Math.floor(seed(k + 900) * pts.length);
        flashes.push({ pt: pts[idx], begin: seed(k + 1200) * 8, cycle: 6 + seed(k + 1500) * 4 });
      }
      return { pts, links, packets, flashes };
    };

    return {
      far: build({ count: 28, linkDist: 300, rBase: 2.0, s0: 0,    packetCount: 3, packetDur: 4.0 }),
      mid: build({ count: 36, linkDist: 240, rBase: 2.6, s0: 77,   packetCount: 5, packetDur: 3.0 }),
      near:build({ count: 22, linkDist: 280, rBase: 3.6, s0: 203,  packetCount: 6, packetDur: 2.3 }),
    };
  }, [seedOffset, viewW, viewH]);

  const farRef = useParallax({ speed: 0.08 });   // moves slower than scroll
  const midRef = useParallax({ speed: 0.18 });
  const nearRef = useParallax({ speed: 0.32 });

  const renderLayer = (layer, cfg) => {
    const { pts, links, packets, flashes } = layer;
    return (
      <svg viewBox={`0 0 ${viewW} ${viewH}`} preserveAspectRatio="xMidYMid slice" className="drift" style={{ animationDuration: `${cfg.driftDur}s` }}>
        {links.map(([a, b], i) => (
          <line key={'l'+i} className="net-line" x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y}
            style={{ stroke: '#ffffff', strokeWidth: cfg.lineW }}>
            <animate attributeName="opacity" values={`${cfg.lineMin};${cfg.lineMax};${cfg.lineMin}`} dur={`${5 + (i % 4) * 0.7}s`} begin={`${(i % 9) * 0.4}s`} repeatCount="indefinite" />
          </line>
        ))}
        {pts.map((p, i) => (
          <circle key={'d'+i} className="net-dot" cx={p.x} cy={p.y} r={p.r} style={{ fill: '#ffffff' }}>
            <animate attributeName="opacity" values={`${cfg.dotMin};${cfg.dotMax};${cfg.dotMin}`} dur={`${3.5 + (i % 5) * 0.8}s`} begin={`${(i % 7) * 0.35}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {flashes.map((f, i) => (
          <circle key={'fl'+i} cx={f.pt.x} cy={f.pt.y} r={f.pt.r * 2.8} fill="#ffffff" opacity="0">
            <animate attributeName="opacity" values={`0;${cfg.flashMax};0`} keyTimes="0;0.06;0.3" dur={`${f.cycle}s`} begin={`${f.begin}s`} repeatCount="indefinite" />
            <animate attributeName="r" values={`${f.pt.r};${f.pt.r * 3.4};${f.pt.r * 4.2}`} keyTimes="0;0.06;0.3" dur={`${f.cycle}s`} begin={`${f.begin}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {packets.map((p, i) => (
          <g key={'pk'+i}>
            {/* Bright halo */}
            <circle r={cfg.packetR * 2.4} fill="#ffffff" opacity="0">
              <animate attributeName="cx" values={`${p.from.x};${p.to.x}`} dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${p.from.y};${p.to.y}`} dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values={`0;${cfg.packetHalo};${cfg.packetHalo};0`} keyTimes="0;0.1;0.9;1" dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
            </circle>
            <circle r={cfg.packetR} fill="#ffffff" opacity="0">
              <animate attributeName="cx" values={`${p.from.x};${p.to.x}`} dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${p.from.y};${p.to.y}`} dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>
    );
  };

  // Per-layer visual config — far is faintest, near is brightest.
  const farCfg  = { lineW: 0.5, lineMin: 0.06, lineMax: 0.14, dotMin: 0.15, dotMax: 0.35, flashMax: 0.35, packetR: 1.8, packetHalo: 0.18, driftDur: 160 };
  const midCfg  = { lineW: 0.7, lineMin: 0.10, lineMax: 0.24, dotMin: 0.22, dotMax: 0.55, flashMax: 0.65, packetR: 2.4, packetHalo: 0.28, driftDur: 120 };
  const nearCfg = { lineW: 1.0, lineMin: 0.14, lineMax: 0.34, dotMin: 0.30, dotMax: 0.80, flashMax: 0.95, packetR: 3.0, packetHalo: 0.45, driftDur: 85  };

  return (
    <div className={className} aria-hidden="true">
      <div className="net-layer net-layer--far"  ref={parallax ? farRef  : null}>{renderLayer(layers.far,  farCfg)}</div>
      <div className="net-layer net-layer--mid"  ref={parallax ? midRef  : null}>{renderLayer(layers.mid,  midCfg)}</div>
      <div className="net-layer net-layer--near" ref={parallax ? nearRef : null}>{renderLayer(layers.near, nearCfg)}</div>
    </div>
  );
};

const TypingHero = () => {
  const lines = ['You bring the market.', 'We bring the engine.'];
  const [l0, setL0] = React.useState('');
  const [l1, setL1] = React.useState('');
  // phases: 'typing0' -> 'pause0' -> 'typing1' -> 'done'
  const [phase, setPhase] = React.useState('typing0');
  React.useEffect(() => {
    let t; let i = 0;
    const typeL0 = () => {
      if (i <= lines[0].length) { setL0(lines[0].slice(0, i)); i++; t = setTimeout(typeL0, 55); }
      else { setPhase('pause0'); t = setTimeout(typeL1, 800); }
    };
    const typeL1 = () => {
      setPhase('typing1');
      let j = 0;
      const step = () => {
        if (j <= lines[1].length) { setL1(lines[1].slice(0, j)); j++; t = setTimeout(step, 55); }
        else { setPhase('done'); }
      };
      step();
    };
    typeL0();
    return () => clearTimeout(t);
  }, []);
  // Caret placement:
  //  - typing0: solid caret on line 1 (no blink while typing)
  //  - pause0:  blinking caret on line 1 (800ms pause between lines)
  //  - typing1: solid caret on line 2 (no blink while typing)
  //  - done:    blinking caret on line 2 forever
  const caret0 = phase === 'typing0' ? <span className="caret caret--solid" />
              : phase === 'pause0'  ? <span className="caret" />
              : null;
  const caret1 = phase === 'typing1' ? <span className="caret caret--solid" />
              : phase === 'done'    ? <span className="caret" />
              : null;
  const done = phase === 'done';
  return (
    <section className="hero" id="top" data-net-section="hero">
      <div className="hero-inner">
        <div className="hero-mark" aria-hidden="true">
          {['ch-r','ch-g','ch-b','ch-w'].map(cls => (
            <div className={`ch ${cls}`} key={cls}>
              <svg viewBox="0 0 120 120" fill="currentColor">
                <path fillRule="evenodd" d="M60 8A52 52 0 0 1 112 60L92 60A32 32 0 0 0 60 28ZM112 60A52 52 0 0 1 60 112L60 92A32 32 0 0 0 92 60ZM60 112A52 52 0 0 1 8 60L28 60A32 32 0 0 0 60 92ZM8 60A52 52 0 0 1 60 8L60 28A32 32 0 0 0 28 60Z" />
              </svg>
            </div>
          ))}
        </div>
        <h1 className="type-line">
          {l0}{caret0}
        </h1>
        <h1 className="type-line">
          {l1}{caret1}
        </h1>
        <p className={`hero-sub ${done ? 'show' : ''}`}>
          AI infrastructure for companies with big markets and hard problems.
        </p>
      </div>
    </section>
  );
};

const Thesis = () => {
  const text = 'Generic software is ending. The next cycle belongs to vertical products where AI replaces the repetitive work that was never supposed to be human in the first place.';
  const [first, second] = React.useMemo(() => {
    const parts = text.split('. ');
    return [parts[0] + '.', parts.slice(1).join('. ')];
  }, []);
  return (
    <section className="thesis" data-net-section="thesis">
      <div className="thesis-inner">
        <Reveal y={24}><div className="eyebrow">Why OneClient exists</div></Reveal>
        <h2>
          <Reveal y={32} delay={120} as="span" className="thesis-part">{first}</Reveal>{' '}
          <Reveal y={32} delay={420} as="span" className="thesis-part">{second}</Reveal>
        </h2>
      </div>
    </section>
  );
};

const ENGINE_NODES = [
  'AdPilot', 'Clinik One', 'Robot SaaS', 'RegenX Academy',
  'Gaia', 'Unlocked Miami', 'USX Peptides', 'Poli'
];

const Engine = () => {
  const cx = 520, cy = 330;
  const rings = [195, 270];
  const nodes = ENGINE_NODES.map((name, i) => {
    const angle = (i / ENGINE_NODES.length) * Math.PI * 2 - Math.PI / 2;
    const r = rings[i % 2];
    return { name, x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
  });

  // Assembly trigger: re-renders once the section enters viewport.
  const [sectionRef, assembled] = useReveal({ threshold: 0.25 });
  const parallaxRef = useParallax({ speed: -0.04 }); // slightly slower than scroll

  return (
    <section className="engine wrap" id="about" data-net-section="engine" ref={sectionRef}>
      <div className="engine-head">
        <Reveal y={24}><div className="eyebrow">How it works</div></Reveal>
        <Reveal y={32} delay={80}><h2 className="h-lg" style={{ marginTop: 16 }}>A factory of verticals.</h2></Reveal>
        <Reveal y={32} delay={180}>
          <p className="p-lead">
            A shared AI and WhatsApp engine at the center. Independent businesses built on top of it, each with its own operators, clients, and ownership. OneClient runs the infrastructure that makes it possible.
          </p>
        </Reveal>
      </div>
      <div className="diagram" ref={parallaxRef}>
        <svg viewBox="0 0 1040 660" aria-hidden="true" className={`engine-svg ${assembled ? 'is-assembled' : ''}`}>
          <defs>
            <radialGradient id="emberGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffb37a" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#c27a45" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#c27a45" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Orbital rings — draw in after center (800ms) */}
          {rings.map((r, i) => (
            <circle key={'o'+i} className="orbit engine-orbit" cx={cx} cy={cy} r={r}
              style={{ strokeDasharray: `${2 * Math.PI * r}`, animationDelay: `${400 + i * 120}ms` }} />
          ))}

          {/* Static links — draw from center outward (once) */}
          {nodes.map((n, i) => {
            const len = Math.hypot(n.x - cx, n.y - cy);
            return (
              <line key={'l'+i} className="link engine-link" x1={cx} y1={cy} x2={n.x} y2={n.y}
                style={{ strokeDasharray: `${len}`, animationDelay: `${1200 + i * 80}ms` }} />
            );
          })}

          {/* Idle-loop pulses — only after assembly */}
          {assembled && nodes.map((n, i) => (
            <line key={'p'+i} className="pulse" x1={cx} y1={cy} x2={n.x} y2={n.y}
              strokeDasharray="12 260" strokeDashoffset="0" opacity="0.95"
              style={{ animation: `dash 3.2s ${i * 0.4}s linear infinite` }} />
          ))}
          {assembled && nodes.map((n, i) => (
            <line key={'p2'+i} className="pulse" x1={cx} y1={cy} x2={n.x} y2={n.y}
              strokeDasharray="5 280" strokeDashoffset="0" opacity="0.55"
              style={{ animation: `dash 3.2s ${i * 0.4 + 1.6}s linear infinite` }} />
          ))}

          {/* Center — ember glow, rings, solid core */}
          <g className="engine-center">
            <circle className="node-center-glow" cx={cx} cy={cy} r="110" />
            <circle className="node-center-ring" cx={cx} cy={cy} r="74" />
            <circle className="node-center-ring" cx={cx} cy={cy} r="58" style={{ strokeOpacity: 0.6 }}>
              {assembled && <animate attributeName="r" values="58;66;58" dur="3.2s" repeatCount="indefinite" />}
              {assembled && <animate attributeName="stroke-opacity" values="0.6;0.1;0.6" dur="3.2s" repeatCount="indefinite" />}
            </circle>
            <circle className="node-center" cx={cx} cy={cy} r="40" />
            <text x={cx} y={cy + 4} textAnchor="middle" className="engine-label">ENGINE</text>
          </g>

          {/* Orbital nodes — pop in sequentially */}
          {nodes.map((n, i) => (
            <g key={'n'+i} className="engine-node" style={{ animationDelay: `${900 + i * 80}ms`, transformOrigin: `${n.x}px ${n.y}px` }}>
              <circle className="node-dot" cx={n.x} cy={n.y} r="7" />
              <text
                className="node-label"
                x={n.x + (n.x > cx ? 16 : -16)}
                y={n.y + 4}
                textAnchor={n.x > cx ? 'start' : 'end'}
              >{n.name}</text>
            </g>
          ))}
        </svg>
      </div>
      <style>{`@keyframes dash { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -280; } }`}</style>
    </section>
  );
};

Object.assign(window, { Nav, TypingHero, Thesis, Engine });
