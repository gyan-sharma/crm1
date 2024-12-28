export const INDUSTRIES = [
  'Banking & Financial Services',
  'Insurance',
  'Healthcare',
  'Manufacturing',
  'Retail & E-commerce',
  'Supply Chain & Logistics',
  'Government',
  'Energy & Utilities',
  'Real Estate',
  'Technology',
  'Telecommunications',
  'Other'
] as const;

export const LEAD_SOURCES = [
  'Website',
  'Referral',
  'Trade Show',
  'Social Media',
  'Cold Call',
  'Partner',
  'Webinar',
  'Content Marketing',
  'Email Campaign',
  'Direct Mail',
  'Other'
] as const;

export const FORECAST_CATEGORIES = {
  pipeline: { name: 'Pipeline', probability: 20 },
  best_case: { name: 'Best Case', probability: 50 },
  commit: { name: 'Commit', probability: 80 },
  closed: { name: 'Closed', probability: 100 },
  omitted: { name: 'Omitted', probability: 0 }
} as const;

export const REGIONS = ['EMEA', 'JAPAC'] as const;

export const OFFER_STATUSES = {
  DRAFT: 'draft',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  SENT: 'sent',
  ACCEPTED: 'accepted',
  ORDER_BOOKED: 'order_booked',
  CONTRACT_LOST: 'contract_lost'
} as const;

export type Region = typeof REGIONS[number];
export type OfferStatus = typeof OFFER_STATUSES[keyof typeof OFFER_STATUSES];