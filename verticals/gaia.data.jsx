/* Gaia — vertical case study data */

const GAIA_DATA = {
  slug: 'gaia.html',
  breadcrumb: 'Gaia',
  variant: 'client',

  hero: {
    eyebrow: 'Case · Embedded AI infrastructure · In production',
    headline: {
      plain: 'The AI operating the member experience',
      em: 'of Giants.',
    },
    subhead: "G.A.I.A. — Grupo Acelerador Inteligência Artificial — is the conversational agent that serves the ~700 business-owner members of Mastermind Giants, one of Brazil's most respected entrepreneur communities, directly through WhatsApp.",
    meta: [
      '~700 members served daily',
      'Audio understood',
      'Operating since 2025',
    ],
  },

  partner: {
    eyebrow: 'The partner',
    headline: 'Giants. Grupo Acelerador Empresarial.',
    paragraph: "Giants is a mastermind of business owners operating across Brazil. The community is tight, the programming is dense, and the demand on the internal team scales with member count. At 700 members, responding to daily inquiries about events, immersions, enrollment, and member-to-member introductions became a full operation in itself.",
    credits: [
      { name: 'Marcus Marques', role: 'CEO and Founder' },
      { name: 'Lucas Amaral', role: 'CTO' },
    ],
  },

  before: {
    eyebrow: 'Before OneClient',
    headline: "Every inquiry went to a human. That doesn't scale.",
    paragraphs: [
      "Giants had the infrastructure to run events, accelerators, and community — but no layer to triage the daily conversational load. Every member question landed on a team member's desk. Most were routine. Some were urgent. Telling them apart consumed the team.",
    ],
  },

  build: {
    eyebrow: 'The build',
    headline: 'A conversational agent that handles the routine — and knows when to call a human.',
    paragraph: "G.A.I.A. operates inside WhatsApp, answering member questions about events, accelerator programs, and enrollment. She matches companies inside the community semantically — understanding not just what a company claims to do, but what it actually sells. She transcribes audio. She detects sensitive conversations and escalates cleanly. She never invents data. She never leaks another company's information.",
    capabilities: [
      ['01', 'Semantic company matching', "When a member asks for 'a marketing agency in São Paulo,' G.A.I.A. cross-references segment, geography, and what the company actually sells — not just the keyword."],
      ['02', 'Audio native', 'WhatsApp voice messages are transcribed and understood inline. No friction for the member.'],
      ['03', 'Intelligent escalation', 'Five triggers hand a conversation to the internal team — with a summary already written. G.A.I.A. knows when not to respond.'],
      ['04', 'Prompts versioned in production', 'The operating rules are editable by the internal team, without a deploy. One-click rollback. Every change audited.'],
    ],
  },

  today: {
    eyebrow: 'Today',
    headline: '700 members served daily. Zero basic-support queue.',
    paragraph: 'G.A.I.A. handles the routine so the team handles what matters. Members get responses in seconds. Escalations arrive pre-summarized. The system has been in production since 2025.',
    stats: [
      { val: '~700', label: 'members served daily through WhatsApp.' },
      { val: 9, label: 'quality checks before any response is sent.' },
      { val: 5, label: 'escalation triggers. She knows when to stop.' },
    ],
  },

  thesis: {
    eyebrow: 'Why OneClient',
    headline: "A community-grade agent isn't a chatbot.",
    paragraph: "You can plug an AI into WhatsApp in a day. Making it safe, auditable, self-escalating, and aware of 700 member companies is different work. Giants needed infrastructure that respected the seriousness of their community. That's what we built.",
  },

  conversation: {
    eyebrow: 'Next',
    headline: 'If your community has outgrown human-only support.',
    paragraph: 'We build this when the operation is serious and the audience deserves better than a form.',
  },

  other: [
    { name: 'Poli',           desc: 'Native AI layer for a WhatsApp platform.', href: './poli.html' },
    { name: 'Robot SaaS',     desc: 'Multi-agent digital coworkers for SMB operators.', href: './robot-saas.html' },
    { name: 'Clinik One',     desc: 'Dental and aesthetic clinics, operated by AI.', href: './clinik-one.html' },
  ],
};

window.GAIA_DATA = GAIA_DATA;
