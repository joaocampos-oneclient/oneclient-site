/* Robot SaaS — vertical case study data (market-case variant) */

const ROBOT_DATA = {
  slug: 'robot-saas.html',
  breadcrumb: 'Robot SaaS',
  variant: 'market',

  hero: {
    eyebrow: 'Vertical · Multi-agent AI infrastructure · In production',
    headline: {
      plain: 'Digital coworkers.',
      em: 'For operators who can\'t keep hiring.',
    },
    subhead: "Robot SaaS deploys specialized AI agents — each one responsible for a specific role inside a company — into small and medium businesses through WhatsApp, the operating system of SMB Brazil.",
    meta: [
      '5 live operations',
      'WhatsApp-native',
      'Multi-agent architecture',
    ],
  },

  // Rendered as VMarket (no credits). Field name kept as `partner` to match template.
  partner: {
    eyebrow: 'The market',
    headline: 'SMB operators run the business by hand.',
    paragraph: "Brazilian small and medium businesses operate on WhatsApp. The owner answers messages, qualifies leads, publishes content, books meetings, follows up, and collects payments — often all at once. Scaling means hiring. Hiring is expensive and slow. The real leverage isn't more people. It's agents that work alongside the ones who are already there.",
  },

  before: {
    eyebrow: 'The approach',
    headline: 'Narrow roles. Real orchestration. One channel.',
    paragraphs: [
      "A chatbot is one thing. A team of digital coworkers who share context, hand off cleanly, and stay inside their lane is different engineering. Each agent owns one role. An orchestrator decides whose turn it is. The conversation surface never changes.",
    ],
  },

  build: {
    eyebrow: 'The build',
    headline: 'One orchestration engine. Many specialized agents. One channel.',
    paragraph: "A multi-agent platform where each role — sales, support, scheduling, follow-up, document intake — runs as a dedicated agent with its own prompt, tools, and guardrails, coordinated by an orchestrator. The conversation surface is WhatsApp. The operator configures the agents their business needs.",
    capabilities: [
      ['01', 'Per-role specialization', 'Each agent is a narrow expert — not a generalist. Cheaper, safer, better-behaved.'],
      ['02', 'Orchestrated, not scripted', "The orchestrator decides which agent takes which turn. No brittle flow charts."],
      ['03', 'WhatsApp-native', "The operator doesn't learn a new tool. Their customers stay where they already are."],
      ['04', 'Built for the channel that runs SMB', "WhatsApp is where the business already happens. The agents operate there natively — no new tool for the customer, no new habit for the team."],
    ],
  },

  today: {
    eyebrow: 'Today',
    headline: 'Shipped. In production. Scaling with operator demand.',
    paragraph: 'The platform is live across multiple active operations. Each operator configures the agents their business needs. The infrastructure scales with them.',
    stats: [
      { val: '5', label: 'live operations across distinct businesses.' },
      { val: 'Multi-agent', label: 'architecture. Each role runs independently.' },
      { val: '24/7', label: 'coverage on the channel the market already uses.' },
    ],
  },

  thesis: {
    eyebrow: 'Why OneClient',
    headline: "Multi-agent orchestration isn't a prompt. It's infrastructure.",
    paragraph: "Stitching together SDR, content, support, and scheduling agents that share context, respect boundaries, and don't step on each other is different work from building a chatbot. That's the engineering we ship.",
  },

  conversation: {
    eyebrow: 'Next',
    headline: "If hiring isn't the answer. Deploy coworkers instead.",
    paragraph: "The infrastructure is live. The conversation about whether it fits your operation is the next step.",
  },

  other: [
    { name: 'Poli',           desc: 'Native AI layer for a WhatsApp platform.', href: './poli.html' },
    { name: 'Gaia',           desc: 'AI agent for a 700-member community.',     href: './gaia.html' },
    { name: 'USX Peptides',   desc: 'Regulated research-grade peptide commerce.', href: './usx-peptides.html' },
  ],
};

window.ROBOT_DATA = ROBOT_DATA;
