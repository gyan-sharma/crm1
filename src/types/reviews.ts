export interface RiskRating {
  technical: number;
  commercial: number;
  timeline: number;
  scopeIncrease: number;
  delivery: number;
}

export interface Review {
  id: string;
  offerId: string;
  reviewerId: string;
  comments: string;
  riskRating?: RiskRating;
  status: 'pending' | 'completed';
  created_at: string;
  completed_at?: string;
}

export interface ReviewRequest {
  id: string;
  offerId: string;
  reviewerIds: string[];
  status: 'in_progress' | 'completed';
  created_at: string;
  completed_at?: string;
}

export interface OfferDocument {
  id: string;
  offerId: string;
  type: 'proposal' | 'rfp' | 'other';
  name: string;
  url?: string;
  file?: File;
  created_at: string;
}