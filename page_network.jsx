/* PageNetwork — single fixed-position animated canvas for the entire site.
 *
 * - 3 parallax layers (far/mid/near) at 25% / 45% / 65% scroll speed
 * - Section orchestrator listens to which section is most-in-view and
 *   smoothly transitions a global { opacity, density, activity } target
 * - Density controls how many nodes are visible (nodes fade in/out individually)
 * - Activity controls packet + flash cadence
 * - requestAnimationFrame driven; pauses when tab is hidden;
 *   reduced-motion disables animation entirely; mobile throttles to 30fps + halves density
 */

(function () {
  const isMobile = () => window.innerWidth < 768;
  const reducedMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- section profile registry (set by <PageNetwork />; read by Home sections) ----
  // Each section registers: id (DOM element), opacity, density, activity
  // activity: 0..1 (0 = none, 1 = hero-level)
  const DEFAULTS = {
    hero:         { opacity: 0.90, density: 1.00, activity: 1.00 },
    thesis:       { opacity: 0.15, density: 0.30, activity: 0.15 },
    engine:       { opacity: 0.25, density: 0.45, activity: 0.10 },
    verticals:    { opacity: 0.35, density: 0.50, activity: 0.10 },
    capabilities: { opacity: 0.55, density: 0.65, activity: 0.45 },
    stack:        { opacity: 0.70, density: 0.80, activity: 0.55 },
    signal:       { opacity: 0.20, density: 0.35, activity: 0.15 },
    final:        { opacity: 0.95, density: 1.00, activity: 1.00 },
    footer:       { opacity: 0.10, density: 0.20, activity: 0.05 },
    article_header: { opacity: 0.40, density: 0.55, activity: 0.25 },
    article_body:   { opacity: 0.15, density: 0.30, activity: 0.08 },
    article_close:  { opacity: 0.20, density: 0.35, activity: 0.12 },
    article_cta:    { opacity: 0.30, density: 0.45, activity: 0.20 },
    article_related:{ opacity: 0.40, density: 0.55, activity: 0.30 },
  };

  // Seeded PRNG for stable layouts
  const seed = (s0) => (n) => Math.abs(Math.sin((n + s0) * 937.13) * 43758.5453) % 1;

  // Build the geometry for one layer (nodes + links + packet paths)
  const buildLayer = ({ count, linkDist, rBase, s0, width, height, packetCount }) => {
    const rnd = seed(s0);
    const pts = [];
    for (let i = 0; i < count; i++) {
      pts.push({
        x: rnd(i) * width,
        y: rnd(i + 100) * height,
        r: rBase + rnd(i + 200) * rBase * 0.6,
        // Each node has a phase for breathing, and an "opacity target" controlled by density
        phase: rnd(i + 300) * Math.PI * 2,
        breathSpeed: 0.6 + rnd(i + 400) * 0.8,
        // Rank determines the density threshold — nodes with lower rank stay visible at lower density
        rank: rnd(i + 500),
      });
    }
    const links = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d = Math.hypot(dx, dy);
        if (d < linkDist) {
          links.push({
            a: i,
            b: j,
            // Strength: closer links stay more visible at low density
            strength: 1 - d / linkDist,
            phase: rnd(i + j * 17 + 600) * Math.PI * 2,
          });
        }
      }
    }
    // Packets: precomputed list of links we might animate along
    const packetLinks = [];
    for (let k = 0; k < Math.min(packetCount * 2, links.length); k++) {
      const linkIdx = Math.floor((k * 7 + 3) * links.length / (packetCount * 2 + 2)) % links.length;
      packetLinks.push(linkIdx);
    }
    // Flashes: ~30% of nodes can host a flash event
    const flashNodes = [];
    const flashCount = Math.max(3, Math.floor(pts.length * 0.4));
    for (let k = 0; k < flashCount; k++) {
      flashNodes.push(Math.floor(rnd(k + 900) * pts.length));
    }
    return { pts, links, packetLinks, flashNodes };
  };

  class Network {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = 0;
      this.h = 0;
      this.scrollY = 0;
      this.targetScrollY = 0;
      this.t0 = performance.now();
      this.raf = 0;
      this.lastFrame = 0;
      this.frameInterval = isMobile() ? 1000 / 30 : 0; // 30fps on mobile

      // Current state (smoothed toward target)
      this.cur = { opacity: 0.9, density: 1.0, activity: 1.0 };
      this.target = { ...this.cur };
      this.packets = []; // active packets { layerIdx, linkIdx, t0, dur }
      this.flashes = []; // active flash events { layerIdx, nodeIdx, t0, dur }
      this.nextPacketT = 0;
      this.nextFlashT = 0;

      this.paused = false;

      this.handleResize = this.handleResize.bind(this);
      this.tick = this.tick.bind(this);
      this.handleVisibility = this.handleVisibility.bind(this);
      this.handleScroll = this.handleScroll.bind(this);

      this.handleResize();
      window.addEventListener('resize', this.handleResize);
      window.addEventListener('scroll', this.handleScroll, { passive: true });
      document.addEventListener('visibilitychange', this.handleVisibility);

      if (!reducedMotion()) this.raf = requestAnimationFrame(this.tick);
    }

    handleVisibility() {
      if (document.visibilityState === 'hidden') {
        this.paused = true;
        if (this.raf) cancelAnimationFrame(this.raf);
        this.raf = 0;
      } else if (this.paused) {
        this.paused = false;
        this.lastFrame = 0;
        this.raf = requestAnimationFrame(this.tick);
      }
    }

    handleScroll() {
      this.targetScrollY = window.scrollY;
    }

    handleResize() {
      const rect = { w: window.innerWidth, h: window.innerHeight };
      this.w = rect.w;
      this.h = rect.h;
      this.canvas.width = this.w * this.dpr;
      this.canvas.height = this.h * this.dpr;
      this.canvas.style.width = this.w + 'px';
      this.canvas.style.height = this.h + 'px';

      // Rebuild layers sized to the viewport + generous bleed so parallax never exposes edges.
      const bleedX = 200;
      // tileH defines the vertical wrap period — nodes repeat every tileH pixels as you scroll
      const tileH = Math.max(1200, this.h * 1.5);
      const W = this.w + bleedX * 2;
      const H = tileH;
      const densityScale = isMobile() ? 0.5 : 1.0;

      this.tileH = tileH;

      this.layers = [
        {
          ...buildLayer({
            count: Math.round(32 * densityScale),
            linkDist: Math.min(W, H) * 0.25,
            rBase: 1.5,
            s0: 11,
            width: W,
            height: H,
            packetCount: 4,
          }),
          speed: 0.25,
          rScale: 1.0,
          lineAlpha: 0.45,
          dotAlpha: 0.85,
          packetColor: '255,255,255',
          offX: -bleedX,
          offY: 0,
        },
        {
          ...buildLayer({
            count: Math.round(40 * densityScale),
            linkDist: Math.min(W, H) * 0.20,
            rBase: 2.0,
            s0: 77,
            width: W,
            height: H,
            packetCount: 6,
          }),
          speed: 0.45,
          rScale: 1.0,
          lineAlpha: 0.55,
          dotAlpha: 1.0,
          packetColor: '255,255,255',
          offX: -bleedX,
          offY: 0,
        },
        {
          ...buildLayer({
            count: Math.round(24 * densityScale),
            linkDist: Math.min(W, H) * 0.25,
            rBase: 2.8,
            s0: 203,
            width: W,
            height: H,
            packetCount: 8,
          }),
          speed: 0.65,
          rScale: 1.0,
          lineAlpha: 0.70,
          dotAlpha: 1.0,
          packetColor: '255,255,255',
          offX: -bleedX,
          offY: 0,
        },
      ];
    }

    setTarget(t) {
      this.target.opacity = t.opacity;
      this.target.density = t.density;
      this.target.activity = t.activity;
    }

    spawnPacket() {
      // Weight near layer more than mid more than far
      const r = Math.random();
      const layerIdx = r < 0.2 ? 0 : r < 0.55 ? 1 : 2;
      const L = this.layers[layerIdx];
      if (!L.packetLinks.length) return;
      const linkIdx = L.packetLinks[Math.floor(Math.random() * L.packetLinks.length)];
      this.packets.push({ layerIdx, linkIdx, t0: performance.now(), dur: 1800 + Math.random() * 1800 });
    }

    spawnFlash() {
      const r = Math.random();
      const layerIdx = r < 0.25 ? 0 : r < 0.6 ? 1 : 2;
      const L = this.layers[layerIdx];
      if (!L.flashNodes.length) return;
      const nodeIdx = L.flashNodes[Math.floor(Math.random() * L.flashNodes.length)];
      this.flashes.push({ layerIdx, nodeIdx, t0: performance.now(), dur: 1400 + Math.random() * 800 });
    }

    tick(now) {
      if (this.paused) return;
      if (this.frameInterval > 0 && now - this.lastFrame < this.frameInterval) {
        this.raf = requestAnimationFrame(this.tick);
        return;
      }
      this.lastFrame = now;

      // Smooth-interpolate state toward target
      const k = 0.04; // ~800ms-feeling ease
      this.cur.opacity = lerp(this.cur.opacity, this.target.opacity, k);
      this.cur.density = lerp(this.cur.density, this.target.density, k);
      this.cur.activity = lerp(this.cur.activity, this.target.activity, k);
      window.__net_state = { cur: {...this.cur}, target: {...this.target}, packets: this.packets.length, flashes: this.flashes.length };

      // Smooth-interpolate scrollY (keeps parallax buttery even during fast scrolls)
      this.scrollY = lerp(this.scrollY, this.targetScrollY, 0.15);

      // Spawn packets / flashes based on activity
      // activity 1.0 -> packet every ~2000ms, flash every ~1500ms
      // activity 0.1 -> packet every ~20000ms, flash every ~15000ms
      if (this.cur.activity > 0.02 && this.cur.opacity > 0.04) {
        if (now >= this.nextPacketT) {
          this.spawnPacket();
          const base = 2000;
          const interval = base + (1 - this.cur.activity) * 18000;
          this.nextPacketT = now + interval * (0.7 + Math.random() * 0.6);
        }
        if (now >= this.nextFlashT) {
          this.spawnFlash();
          const base = 1500;
          const interval = base + (1 - this.cur.activity) * 13500;
          this.nextFlashT = now + interval * (0.7 + Math.random() * 0.6);
        }
      }

      this.draw(now);
      this.raf = requestAnimationFrame(this.tick);
    }

    draw(now) {
      const { ctx, w, h, dpr } = this;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const globalAlpha = this.cur.opacity;
      if (globalAlpha < 0.005) return;

      const t = (now - this.t0) / 1000;

      for (let li = 0; li < this.layers.length; li++) {
        const L = this.layers[li];
        // Parallax + vertical tiling: the layer scrolls at its own speed,
        // but its Y content wraps every tileH px so the field is always populated.
        const rawY = -this.scrollY * L.speed;
        const tileH = this.tileH;
        // We'll draw each node in up to 2 positions (current tile + adjacent tile)
        // to avoid seams at the wrap boundary.
        const baseOy = ((rawY % tileH) + tileH) % tileH - tileH; // a value in [-tileH, 0]
        // Slow horizontal drift for life
        const driftX = Math.sin(t * 0.03 + li) * 30;
        const ox = L.offX + driftX;

        // Density threshold — nodes whose rank > density are hidden, with a soft falloff
        const dens = this.cur.density;

        // Helper: is y-coord within visible viewport (with a little margin)?
        const yInView = (y) => y > -100 && y < this.h + 100;

        // --- Draw links ---
        ctx.lineCap = 'round';
        for (let k = 0; k < L.links.length; k++) {
          const link = L.links[k];
          const A = L.pts[link.a];
          const B = L.pts[link.b];
          const endpointVis = Math.min(
            smoothstep(dens, A.rank, 0.15),
            smoothstep(dens, B.rank, 0.15)
          );
          if (endpointVis < 0.02) continue;
          const breathe = 0.6 + 0.4 * Math.sin(t * 0.7 + link.phase);
          const a = L.lineAlpha * breathe * endpointVis * link.strength * globalAlpha;
          if (a < 0.008) continue;
          ctx.strokeStyle = `rgba(255,255,255,${a})`;
          ctx.lineWidth = li === 2 ? 0.9 : li === 1 ? 0.7 : 0.5;
          // Draw at both tile positions (baseOy and baseOy + tileH)
          for (let tile = 0; tile < 2; tile++) {
            const oy = baseOy + tile * tileH;
            const ay = A.y + oy;
            const by = B.y + oy;
            if (!yInView(ay) && !yInView(by)) continue;
            ctx.beginPath();
            ctx.moveTo(A.x + ox, ay);
            ctx.lineTo(B.x + ox, by);
            ctx.stroke();
          }
        }

        // --- Draw nodes ---
        for (let i = 0; i < L.pts.length; i++) {
          const p = L.pts[i];
          const vis = smoothstep(dens, p.rank, 0.15);
          if (vis < 0.02) continue;
          const breathe = 0.6 + 0.4 * Math.sin(t * p.breathSpeed + p.phase);
          const a = L.dotAlpha * vis * breathe * globalAlpha;
          if (a < 0.01) continue;
          ctx.fillStyle = `rgba(255,255,255,${a})`;
          for (let tile = 0; tile < 2; tile++) {
            const oy = baseOy + tile * tileH;
            const py = p.y + oy;
            if (!yInView(py)) continue;
            ctx.beginPath();
            ctx.arc(p.x + ox, py, p.r * L.rScale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // --- Draw packets ---
      this.packets = this.packets.filter((pk) => {
        const elapsed = now - pk.t0;
        if (elapsed > pk.dur) return false;
        const L = this.layers[pk.layerIdx];
        const link = L.links[pk.linkIdx];
        if (!link) return false;
        const A = L.pts[link.a];
        const B = L.pts[link.b];
        const driftX = Math.sin(t * 0.03 + pk.layerIdx) * 30;
        const ox = L.offX + driftX;
        const rawY = -this.scrollY * L.speed;
        const baseOy = ((rawY % this.tileH) + this.tileH) % this.tileH - this.tileH;
        const u = elapsed / pk.dur;
        const x = A.x + (B.x - A.x) * u;
        const y = A.y + (B.y - A.y) * u;
        const env = Math.sin(u * Math.PI);
        const rBase = A.r * (pk.layerIdx === 2 ? 1.2 : 0.9);
        for (let tile = 0; tile < 2; tile++) {
          const oy = baseOy + tile * this.tileH;
          const yy = y + oy;
          if (yy < -50 || yy > this.h + 50) continue;
          // Halo
          ctx.fillStyle = `rgba(255,255,255,${0.35 * env * globalAlpha})`;
          ctx.beginPath();
          ctx.arc(x + ox, yy, rBase * 2.4, 0, Math.PI * 2);
          ctx.fill();
          // Core
          ctx.fillStyle = `rgba(255,255,255,${1.0 * env * globalAlpha})`;
          ctx.beginPath();
          ctx.arc(x + ox, yy, rBase * 1.0, 0, Math.PI * 2);
          ctx.fill();
        }
        return true;
      });

      // --- Draw flashes ---
      this.flashes = this.flashes.filter((fl) => {
        const elapsed = now - fl.t0;
        if (elapsed > fl.dur) return false;
        const L = this.layers[fl.layerIdx];
        const p = L.pts[fl.nodeIdx];
        if (!p) return false;
        const ox = L.offX + Math.sin(t * 0.03 + fl.layerIdx) * 30;
        const rawY = -this.scrollY * L.speed;
        const baseOy = ((rawY % this.tileH) + this.tileH) % this.tileH - this.tileH;
        const u = elapsed / fl.dur;
        const env = u < 0.12 ? u / 0.12 : Math.max(0, 1 - (u - 0.12) / 0.88);
        const r = p.r * (1.5 + u * 4.0);
        for (let tile = 0; tile < 2; tile++) {
          const oy = baseOy + tile * this.tileH;
          const yy = p.y + oy;
          if (yy < -r || yy > this.h + r) continue;
          ctx.fillStyle = `rgba(255,255,255,${0.65 * env * globalAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x + ox, yy, r, 0, Math.PI * 2);
          ctx.fill();
        }
        return true;
      });
    }

    destroy() {
      if (this.raf) cancelAnimationFrame(this.raf);
      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('scroll', this.handleScroll);
      document.removeEventListener('visibilitychange', this.handleVisibility);
    }
  }

  function lerp(a, b, k) { return a + (b - a) * k; }
  // Smoothstep — returns 0..1 based on whether x is below threshold, with `width` for soft edge
  // We want: if density is HIGH, most nodes visible; as density falls, nodes with high rank disappear first
  // So: visible = smoothstep(density, rank)  — 1 when density > rank + width, 0 when density < rank
  function smoothstep(density, rank, width) {
    const t = (density - rank) / width;
    const c = Math.max(0, Math.min(1, t + 0.5));
    return c * c * (3 - 2 * c);
  }

  // ------------------- React wrapper -------------------
  const PageNetwork = () => {
    const canvasRef = React.useRef(null);
    const netRef = React.useRef(null);

    React.useEffect(() => {
      if (reducedMotion()) return;
      const net = new Network(canvasRef.current);
      netRef.current = net;

      // Set up a section orchestrator based on viewport center
      let sections = [];
      const collect = () => {
        sections = Array.from(document.querySelectorAll('[data-net-section]')).map((el) => ({
          el,
          key: el.getAttribute('data-net-section'),
        }));
      };
      collect();

      const onUpdate = () => {
        if (!sections.length) return;
        const vpCenter = window.scrollY + window.innerHeight * 0.5;
        // Find section whose bounds contain viewport center; if between, blend the two nearest
        let active = null;
        let next = null;
        for (let i = 0; i < sections.length; i++) {
          const s = sections[i];
          const r = s.el.getBoundingClientRect();
          const top = r.top + window.scrollY;
          const bottom = top + r.height;
          if (vpCenter >= top && vpCenter <= bottom) {
            active = { s, top, bottom };
            next = sections[i + 1] ? (() => {
              const r2 = sections[i + 1].el.getBoundingClientRect();
              const t2 = r2.top + window.scrollY;
              return { s: sections[i + 1], top: t2, bottom: t2 + r2.height };
            })() : null;
            break;
          }
        }

        let profile;
        if (!active) {
          // Before first or after last section
          const first = sections[0];
          const last = sections[sections.length - 1];
          const firstTop = first.el.getBoundingClientRect().top + window.scrollY;
          if (vpCenter < firstTop) profile = DEFAULTS[first.key];
          else profile = DEFAULTS[last.key];
        } else {
          profile = DEFAULTS[active.s.key] || DEFAULTS.hero;
          // Smooth blend: in the last 30% of a section, blend toward the next one
          if (next && DEFAULTS[next.s.key]) {
            const progress = (vpCenter - active.top) / (active.bottom - active.top);
            if (progress > 0.7) {
              const blend = (progress - 0.7) / 0.3; // 0..1
              const n = DEFAULTS[next.s.key];
              profile = {
                opacity: lerp(profile.opacity, n.opacity, blend),
                density: lerp(profile.density, n.density, blend),
                activity: lerp(profile.activity, n.activity, blend),
              };
            }
          }
        }
        net.setTarget(profile);
      };

      onUpdate();
      const onScroll = () => onUpdate();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', () => { collect(); onUpdate(); });

      // Also re-collect after a tick in case sections render asynchronously
      setTimeout(() => { collect(); onUpdate(); }, 100);
      setTimeout(() => { collect(); onUpdate(); }, 800);

      return () => {
        window.removeEventListener('scroll', onScroll);
        net.destroy();
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className="page-network"
        aria-hidden="true"
      />
    );
  };

  window.PageNetwork = PageNetwork;
})();
