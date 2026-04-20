/* Reveal + parallax primitives for the OneClient homepage.
 * Respects prefers-reduced-motion; everything degrades to an instant fade.
 */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Trigger when the element enters viewport (once).
const useReveal = (opts = {}) => {
  const { threshold = 0.18, rootMargin = '0px 0px -8% 0px' } = opts;
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    if (prefersReducedMotion()) { setShown(true); return; }
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold, rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return [ref, shown];
};

// Reveal a block — fade + translateY. Children render always; wrapper toggles class.
const Reveal = ({ children, delay = 0, y = 40, as: Tag = 'div', className = '', style, ...rest }) => {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'is-in' : ''} ${className}`}
      style={{
        transitionDelay: shown ? `${delay}ms` : '0ms',
        '--reveal-y': `${y}px`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Cascade wrapper — gives each child an index-based delay.
const RevealCascade = ({ children, step = 60, baseDelay = 0, y = 24, className = '' }) => {
  const kids = React.Children.toArray(children);
  return (
    <>
      {kids.map((child, i) =>
        React.cloneElement(
          <Reveal delay={baseDelay + i * step} y={y} className={className}>{child}</Reveal>,
          { key: i }
        )
      )}
    </>
  );
};

// Scroll-driven parallax — subscribes to a single scroll listener.
// Usage: const ref = useParallax({ speed: 0.15 }); <div ref={ref}/>
const _subs = new Set();
let _scrollWired = false;
const _wireScroll = () => {
  if (_scrollWired) return; _scrollWired = true;
  let raf = 0;
  const tick = () => {
    raf = 0;
    const y = window.scrollY;
    for (const fn of _subs) fn(y);
  };
  window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
  window.addEventListener('resize', () => { if (!raf) raf = requestAnimationFrame(tick); });
  tick();
};

const useParallax = ({ speed = 0.15, axis = 'y', scale = 0 } = {}) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (prefersReducedMotion()) return;
    _wireScroll();
    const el = ref.current; if (!el) return;
    // Anchor: offsetTop of the element relative to document
    const getAnchor = () => {
      const r = el.getBoundingClientRect();
      return window.scrollY + r.top;
    };
    let anchor = getAnchor();
    const onResize = () => { anchor = getAnchor(); };
    window.addEventListener('resize', onResize);
    const cb = (y) => {
      const delta = y - anchor;
      const offset = -delta * speed; // negative = moves up less than scroll
      const s = scale ? 1 + scale * (delta / window.innerHeight) : 1;
      el.style.transform = axis === 'y'
        ? `translate3d(0, ${offset.toFixed(2)}px, 0)${scale ? ` scale(${s.toFixed(4)})` : ''}`
        : `translate3d(${offset.toFixed(2)}px, 0, 0)`;
    };
    _subs.add(cb); cb(window.scrollY);
    return () => { _subs.delete(cb); window.removeEventListener('resize', onResize); };
  }, [speed, axis, scale]);
  return ref;
};

// Scroll progress bar (top of viewport).
const ScrollProgress = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    _wireScroll();
    const cb = (y) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    _subs.add(cb); cb(window.scrollY);
    return () => { _subs.delete(cb); };
  }, []);
  return <div className="scroll-progress"><div ref={ref} className="scroll-progress__bar" /></div>;
};

Object.assign(window, { Reveal, RevealCascade, useReveal, useParallax, ScrollProgress, prefersReducedMotion });
