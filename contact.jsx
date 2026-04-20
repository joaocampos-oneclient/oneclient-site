/* Contact page — filter, not a form. Four sections. */

/* ---------------- Nav (Contact current) ---------------- */
const ContactNav = () => <SiteNav current="contact" basePath="./" />;

const ContactBreadcrumb = () => (
  <div className="pl-breadcrumb">
    <a href="./home.html">OneClient</a>
    <span className="sep">/</span>
    <span className="cur">Contact</span>
  </div>
);

/* ---------------- 01 · Hero ---------------- */
const ContactHero = () => (
  <section className="ct-hero" data-net-section="capabilities">
    <div className="ct-hero-inner">
      <Reveal y={14}>
        <div className="pl-eyebrow">
          <span className="dot" />The conversation
        </div>
      </Reveal>
      <h1 className="pl-h1">
        <Reveal as="span" y={20} className="ab-line ab-line--1" delay={80}>
          Tell us what you're trying to build.
        </Reveal>
        <Reveal as="span" y={20} className="ab-line ab-line--2" delay={380}>
          We'll tell you if we can help.
        </Reveal>
      </h1>
      <Reveal y={18} delay={700}>
        <p className="pl-lead">
          OneClient works with a small number of operators per year. The fit matters. The thesis matters. The conversation is where we figure out both.
        </p>
      </Reveal>
    </div>
  </section>
);

/* ---------------- 02 · Form ---------------- */
const STAGE_OPTIONS = [
  'Still exploring the idea',
  'Thesis validated, need to build',
  "Already building, something isn't working",
  'Operation is live, scaling the infrastructure',
  'Other',
];

const FIELDS = [
  { n: '01', id: 'name',    label: 'Name',                   type: 'text',     required: true },
  { n: '02', id: 'email',   label: 'Email',                  type: 'email',    required: true },
  { n: '03', id: 'company', label: 'Company or operation',   type: 'text',     required: true },
  { n: '04', id: 'project', label: 'What are you building?', type: 'textarea', required: true,
    placeholder: 'The market, the thesis, the rough shape of what you\u2019re trying to ship. A few sentences is enough.' },
  { n: '05', id: 'stage',   label: 'What stage are you at?', type: 'select',   required: true },
];

const FieldRow = ({ f, idx, value, error, onChange }) => {
  const [ref, shown] = useReveal({ threshold: 0.1 });
  const delay = idx * 80;
  const commonProps = {
    id: f.id,
    name: f.id,
    value: value || '',
    onChange: (e) => onChange(f.id, e.target.value),
    'aria-invalid': !!error,
  };
  return (
    <div
      ref={ref}
      className={`ct-field ${shown ? 'is-in' : ''} ${error ? 'invalid' : ''}`}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
    >
      <label className="ct-label" htmlFor={f.id}>
        <span className="n">{f.n}</span>
        <span>{f.label}</span>
      </label>
      {f.type === 'textarea' ? (
        <textarea
          {...commonProps}
          className="ct-textarea"
          rows={4}
          placeholder={f.placeholder || ''}
        />
      ) : f.type === 'select' ? (
        <div className="ct-select-wrap">
          <select {...commonProps} className="ct-select" defaultValue="">
            <option value="" disabled>Select a stage…</option>
            {STAGE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      ) : (
        <input {...commonProps} type={f.type} className="ct-input" placeholder={f.placeholder || ''} />
      )}
      <div className="ct-error" role="alert">{error}</div>
    </div>
  );
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ContactForm = () => {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);

  const update = (id, v) => {
    setValues(p => ({ ...p, [id]: v }));
    if (errors[id]) setErrors(p => ({ ...p, [id]: null }));
  };

  const validate = () => {
    const e = {};
    for (const f of FIELDS) {
      const v = (values[f.id] || '').trim();
      if (f.required && !v) {
        e[f.id] = f.type === 'select' ? 'Select an option' : 'Required';
      } else if (f.id === 'email' && !EMAIL_RE.test(v)) {
        e[f.id] = 'Invalid email';
      }
    }
    return e;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      // eslint-disable-next-line no-console
      console.log('[OneClient · contact form submission]', values);
      setSent(true);
    }
  };

  return (
    <section className="ct-form-sec" data-net-section="thesis">
      <div className="ct-form-inner">
        <Reveal y={12}>
          <div className="ct-form-heading">
            <span className="dot" />
            The form
          </div>
        </Reveal>
        {!sent ? (
          <form className="ct-form" onSubmit={onSubmit} noValidate>
            {FIELDS.map((f, i) => (
              <FieldRow
                key={f.id}
                f={f}
                idx={i}
                value={values[f.id]}
                error={errors[f.id]}
                onChange={update}
              />
            ))}
            <div className="ct-form-foot">
              <p className="ct-disclaimer">
                We read every message. Responses come from a human, not an auto-reply. Expect a reply within two business days.
              </p>
              <button type="submit" className="ct-submit">
                Send the message <span className="arr">→</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="ct-success" role="status" aria-live="polite">
            <div className="check">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 12.5l5 5L20 6.5" />
              </svg>
            </div>
            <h3>Message received.</h3>
            <p>We'll be in touch within two business days. Responses come from a human, not an auto-reply.</p>
          </div>
        )}
      </div>
    </section>
  );
};

/* ---------------- 03 · Alternative channels ---------------- */
const ContactChannels = () => (
  <section className="ct-channels" data-net-section="verticals">
    <div className="ct-channels-inner">
      <Reveal y={14}>
        <div className="pl-eyebrow"><span className="dot" />Direct</div>
      </Reveal>
      <Reveal y={18} delay={120}>
        <div className="ct-channels-head">
          <h2>Or skip the form.</h2>
        </div>
      </Reveal>
      <div className="ct-channels-grid">
        <Reveal className="ct-channel" y={16} delay={200}>
          <div className="ct-channel-lbl">Write to</div>
          <a className="ct-channel-link" href="mailto:info@1-client.com">info@1-client.com</a>
        </Reveal>
        <div className="ct-channels-divider" aria-hidden="true" />
        <Reveal className="ct-channel" y={16} delay={280}>
          <div className="ct-channel-lbl">Call</div>
          <a className="ct-channel-link" href="tel:+15617650750">+1 (561) 765-0750</a>
          <div className="ct-channel-note">Miami, Florida — US business hours.</div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------------- 04 · The Line ---------------- */
const ContactLine = () => {
  const [ref, shown] = useReveal({ threshold: 0.35 });
  return (
    <section className="ct-line-sec" data-net-section="stack" ref={ref}>
      <div className={`ct-line-inner ${shown ? 'is-in' : ''}`}>
        <h2>
          If you're comparing vendors, we're probably not a fit.<br/>
          If you're looking for a partner, start the conversation.
        </h2>
      </div>
    </section>
  );
};

/* ---------------- Footer ---------------- */
const ContactFooter = () => <SiteFooter basePath="./" />;


/* ---------------- Page ---------------- */
const ContactPage = () => (
  <>
    <PageNetwork />
    <ScrollProgress />
    <ContactNav />
    <ContactBreadcrumb />
    <ContactHero />
    <ContactForm />
    <ContactChannels />
    <ContactLine />
    <ContactFooter />
    <ChatWidget />
  </>
);
