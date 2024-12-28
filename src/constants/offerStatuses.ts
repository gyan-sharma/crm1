export const OFFER_STATUSES = {
  DRAFT: 'draft',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  SENT: 'sent',
  ACCEPTED: 'accepted',
  ORDER_BOOKED: 'order_booked',
  CONTRACT_LOST: 'contract_lost'
} as const;

export type OfferStatus = typeof OFFER_STATUSES[keyof typeof OFFER_STATUSES];