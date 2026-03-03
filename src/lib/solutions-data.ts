// src/lib/solutions-data.ts

export interface SolutionCardData {
  /** Unique identifier for the card */
  id: string
  /** Translation key for display name */
  nameKey: string
  /** Translation key for category tag badge */
  tag: string
  /** Card status: live or in-development */
  status: 'live' | 'in-development'
  /** Translation key for description */
  descriptionKey: string
}

export const solutions: SolutionCardData[] = [
  {
    id: 'giants',
    nameKey: 'solutions.names.giants',
    tag: 'solutions.tags.enterpriseAi',
    status: 'live',
    descriptionKey: 'solutions.cards.giants',
  },
  {
    id: 'poli',
    nameKey: 'solutions.names.poli',
    tag: 'solutions.tags.communications',
    status: 'live',
    descriptionKey: 'solutions.cards.poli',
  },
  {
    id: 'thiago-costa',
    nameKey: 'solutions.names.thiagoCosta',
    tag: 'solutions.tags.realEstate',
    status: 'live',
    descriptionKey: 'solutions.cards.thiagoCosta',
  },
  {
    id: 'oneclient',
    nameKey: 'solutions.names.oneclient',
    tag: 'solutions.tags.b2bSaas',
    status: 'live',
    descriptionKey: 'solutions.cards.oneclient',
  },
  {
    id: 'one-clinic',
    nameKey: 'solutions.names.oneClinic',
    tag: 'solutions.tags.healthcare',
    status: 'in-development',
    descriptionKey: 'solutions.cards.oneClinic',
  },
  {
    id: 'one-imob',
    nameKey: 'solutions.names.oneImob',
    tag: 'solutions.tags.realEstateBr',
    status: 'in-development',
    descriptionKey: 'solutions.cards.oneImob',
  },
]
