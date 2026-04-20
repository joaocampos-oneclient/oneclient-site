/* OneClient — canonical site chrome.
 *
 * Single source of truth for top nav and footer. Every page on the site
 * imports this and renders <SiteNav current="..." basePath="..." /> and
 * <SiteFooter basePath="..." />.
 *
 *   basePath — relative prefix from the page's location to the marketing
 *              root (./ for pages in the root like home.html, about.html;
 *              ../ for pages one level deep like verticals/adpilot.html).
 *
 *   current  — one of "verticals" | "signal" | "about" | "contact" | null.
 *              Marks the corresponding nav item as active.
 */

/* ---------------- SiteNav ---------------- */
const SiteNav = ({ current = null, basePath = './' }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const bp = basePath;
  const isCur = (k) => current === k;
  return (
    <nav className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="brand" href={`${bp}home.html`} aria-label="OneClient — home">
          <svg width="22" height="22" viewBox="0 0 120 120" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M60 8A52 52 0 0 1 112 60L92 60A32 32 0 0 0 60 28ZM112 60A52 52 0 0 1 60 112L60 92A32 32 0 0 0 92 60ZM60 112A52 52 0 0 1 8 60L28 60A32 32 0 0 0 60 92ZM8 60A52 52 0 0 1 60 8L60 28A32 32 0 0 0 28 60Z" />
          </svg>
          <span className="wm"><b>One</b><span>Client</span></span>
        </a>
        <div className="nav-links" role="navigation">
          <a href={`${bp}verticals/index.html`} className={isCur('verticals') ? 'is-active' : ''} aria-current={isCur('verticals') ? 'page' : undefined}>Verticals</a>
          <a href={`${bp}signal/index.html`} className={isCur('signal') ? 'is-active' : ''} aria-current={isCur('signal') ? 'page' : undefined}>Signal</a>
          <a href={`${bp}about.html`} className={isCur('about') ? 'is-active' : ''} aria-current={isCur('about') ? 'page' : undefined}>About</a>
        </div>
        <div className="nav-right">
          <span className="lang" title="Portuguese coming soon" aria-label="Language: English (Portuguese coming soon)">
            <b>EN</b><span>/</span><em className="lang-ghost">PT</em>
          </span>
          <a
            className={`nav-contact ${isCur('contact') ? 'is-active' : ''}`}
            aria-current={isCur('contact') ? 'page' : undefined}
            href={`${bp}contact.html`}
          >
            Contact
          </a>
        </div>
        <button className="menu-btn" aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 7h16M4 12h16M4 17h16"/>
          </svg>
        </button>
      </div>
    </nav>
  );
};

/* ---------------- SiteFooter ---------------- */
const SITE_VERTICALS = [
  ['AdPilot',        'verticals/adpilot.html'],
  ['Clinik One',     'verticals/clinik-one.html'],
  ['Robot SaaS',     'verticals/robot-saas.html'],
  ['RegenX Academy', 'verticals/regenx-academy.html'],
  ['Unlocked Miami', 'verticals/unlocked-miami.html'],
  ['Gaia',           'verticals/gaia.html'],
  ['USX Peptides',   'verticals/usx-peptides.html'],
  ['Poli',           'verticals/poli.html'],
];

const SiteFooter = ({ basePath = './' }) => {
  const bp = basePath;
  return (
    <Reveal as="footer" className="footer" y={16} data-net-section="footer">
      <div className="footer-inner">
        <div className="footer-cols">
          <div>
            <h4>OneClient</h4>
            <a href={`${bp}verticals/index.html`}>Verticals</a>
            <a href={`${bp}signal/index.html`}>Signal</a>
            <a href={`${bp}about.html`}>About</a>
            <a href={`${bp}contact.html`}>Contact</a>
          </div>
          <div>
            <h4>Verticals</h4>
            {SITE_VERTICALS.map(([name, href]) => (
              <a key={name} href={`${bp}${href}`}>{name}</a>
            ))}
          </div>
          <div>
            <h4>Elsewhere</h4>
            <a href="#">LinkedIn</a>
            <a href="#">X</a>
            <a href="#">YouTube</a>
            <a href={`${bp}signal/index.html`}>Signal</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 OneClient</div>
          <div className="right">
            <span style={{ fontFamily: 'var(--font-mono)' }}>
              <b style={{ color: 'var(--fg-0)' }}>EN</b> / <em className="lang-ghost">PT</em>
            </span>
            <a href="#">LinkedIn</a>
            <a href="#">X</a>
            <a href="#">YouTube</a>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

Object.assign(window, { SiteNav, SiteFooter, SITE_VERTICALS });
