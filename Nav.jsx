import React from 'react';

export function Nav() {
  return (
    <header className="oc-nav">
      <a href="#" className="oc-brand">
        <svg viewBox="0 0 120 120" width="22" height="22" fill="currentColor" fillRule="evenodd" aria-hidden="true">
          <path d="M 60 8 A 52 52 0 0 1 112 60 L 92 60 A 32 32 0 0 0 60 28 Z M 112 60 A 52 52 0 0 1 60 112 L 60 92 A 32 32 0 0 0 92 60 Z M 60 112 A 52 52 0 0 1 8 60 L 28 60 A 32 32 0 0 0 60 92 Z M 8 60 A 52 52 0 0 1 60 8 L 60 28 A 32 32 0 0 0 28 60 Z" />
        </svg>
        <span className="oc-wordmark"><b>one</b><span>client</span></span>
      </a>
      <nav className="oc-nav-links">
        <a href="#verticals" className="is-active">Verticals</a>
        <a href="#platform">Platform</a>
        <a href="#customers">Customers</a>
        <a href="#docs">Docs</a>
      </nav>
      <div className="oc-nav-actions">
        <a href="#signin" className="oc-link-muted">Sign in</a>
        <button className="oc-btn oc-btn--primary oc-btn--sm">Book intro</button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="oc-footer">
      <div className="oc-footer-top">
        <div className="oc-footer-brand">
          <svg viewBox="0 0 120 120" width="28" height="28" fill="currentColor" fillRule="evenodd" aria-hidden="true">
            <path d="M 60 8 A 52 52 0 0 1 112 60 L 92 60 A 32 32 0 0 0 60 28 Z M 112 60 A 52 52 0 0 1 60 112 L 60 92 A 32 32 0 0 0 92 60 Z M 60 112 A 52 52 0 0 1 8 60 L 28 60 A 32 32 0 0 0 60 92 Z M 8 60 A 52 52 0 0 1 60 8 L 60 28 A 32 32 0 0 0 28 60 Z" />
          </svg>
          <span className="oc-wordmark"><b>one</b><span>client</span></span>
          <p className="oc-footer-tag">AI infrastructure that knows your business.</p>
        </div>
        <div className="oc-footer-cols">
          <div>
            <div className="oc-eyebrow">Verticals</div>
            <a>Logistics</a><a>Legal intake</a><a>Insurance</a><a>Field service</a>
          </div>
          <div>
            <div className="oc-eyebrow">Platform</div>
            <a>Operators</a><a>Runtime</a><a>Data plane</a><a>Changelog</a>
          </div>
          <div>
            <div className="oc-eyebrow">Company</div>
            <a>About</a><a>Customers</a><a>Careers</a><a>Contact</a>
          </div>
        </div>
      </div>
      <div className="oc-footer-bottom">
        <span>© 2026 OneClient Holdings</span>
        <span>São Paulo · London · New York</span>
      </div>
    </footer>
  );
}
