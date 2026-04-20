/* RegenX Academy — vertical case study data */

const REGENX_DATA = {
  slug: 'regenx-academy.html',
  breadcrumb: 'RegenX Academy',
  variant: 'client',

  hero: {
    eyebrow: 'Case · Medical education platform · In production',
    headline: {
      plain: 'Premium medical education — built from scratch,',
      em: 'not rented from Hotmart.',
    },
    subhead: "RegenX Academy teaches doctors to use advanced protocols in regenerative medicine, longevity, and anti-aging. The education is rare. The platform that sustains it had to be built rare too.",
    meta: [
      'Built in weeks',
      'R$100k+ revenue in first month',
      'In production',
    ],
  },

  partner: {
    eyebrow: 'The partners',
    headline: 'Two specialists. A growing market. A demand for something more serious than a course platform.',
    paragraph: "Dra. Marcelly Achkar Teixeira and Dr. Marcelo Gauche Silva lead regenerative medicine education for practitioners across Brazil, the US, and Latin America. Their methodology is respected. Their audience is professional. What they needed was a platform that matched the seriousness of the content.",
    credits: [
      { name: 'Dra. Marcelly Achkar Teixeira', role: 'Co-founder' },
      { name: 'Dr. Marcelo Gauche Silva', role: 'Co-founder' },
    ],
  },

  before: {
    eyebrow: 'Before OneClient',
    headline: "The shortcuts were available. They didn't fit.",
    paragraphs: [
      "Every infoproduct coach recommends the same path — Hotmart, Kajabi, Notion templates, plug-and-play communities. The shortcuts work for most. They didn't work for a bilingual, multi-module education in a regulated medical field, with research assistance, a peptide library, curated news, and a closed community of specialists.",
      "Renting a platform meant giving up 20% in commissions, adapting the product to someone else's algorithm, and waiting for features that would never come. They needed to own their operation.",
    ],
  },

  build: {
    eyebrow: 'The build',
    headline: 'A complete platform, not a hosted page.',
    paragraph: "We shipped a complete platform: a members area with progress tracking, an AI that generates clinical protocols from the approved knowledge base with zero hallucination, a research assistant that compiles scientific papers into branded PDFs, a navigable peptide library, an AI-curated news portal, a closed specialist community, and an admin dashboard that functions as a command center — financial metrics, engagement, health score, proactive alerts.",
    capabilities: [
      ['01', 'Clinical protocol AI', "Generates personalized protocols from the approved knowledge base. No hallucinations — if the answer isn't there, the AI says so."],
      ['02', 'Research assistant', 'Doctors submit a topic. The AI sweeps scientific literature, publishes live progress, delivers a branded PDF.'],
      ['03', 'Navigable peptide library', 'Compounds, dosages, administration protocols, scientific references — structured as a clinical encyclopedia inside the platform.'],
      ['04', 'Operator command center', 'Not a CRUD. Financial metrics, engagement rankings, platform health score, proactive alerts. Everything the founders need to run the business.'],
    ],
  },

  today: {
    eyebrow: 'Today',
    headline: 'Operating. Growing.',
    paragraph: "The platform is live in three domains. The sales site, the members area, and the admin panel all run as a single operation. The business generated more than R$100,000 in its first month. The founders control every aspect — no commissions, no algorithms, no gatekeepers.",
    stats: [
      { val: 'R$100k+', label: 'generated in the first month of operation.' },
      { val: 3, label: 'domains, one unified operation.' },
      { val: 0, label: 'hallucinations in clinical output.' },
    ],
  },

  thesis: {
    eyebrow: 'Why OneClient',
    headline: 'A regulated field needs architecture, not templates.',
    paragraph: "Medical education isn't a Notion doc. It's a product that has to respect regulatory boundaries, bilingual audiences, and the expectation of doctors who won't tolerate amateur software. The only way to serve that audience well was to build for it specifically. That's what we did.",
  },

  conversation: {
    eyebrow: 'Next',
    headline: "If you're serious about your audience.",
    paragraph: 'We build this kind of platform only when the founders understand the cost — and the value — of owning their infrastructure.',
  },

  other: [
    { name: 'USX Peptides',   desc: 'Regulated research-grade peptide commerce.',   href: './usx-peptides.html' },
    { name: 'Unlocked Miami', desc: 'Trilingual luxury real estate operation.',     href: './unlocked-miami.html' },
    { name: 'Poli',           desc: 'Native AI layer for a WhatsApp platform.',     href: './poli.html' },
  ],
};

window.REGENX_DATA = REGENX_DATA;
