export type OfferStatus = 
  | 'draft'
  | 'under_review'
  | 'approved'
  | 'sent'
  | 'accepted'
  | 'order_booked'
  | 'contract_lost';

export interface Offer {
  id: string;
  offerId?: string;
  opportunityId: string;
  salesRepId: string;
  region: string;
  customerName: string;
  projectName: string;
  status: OfferStatus;
  overview?: string;
  environments: Environment[];
  services: ServiceComponent[];
  licensePeriod: number;
  licensePaymentTerms: string;
  deliveryDuration: number;
  servicesPaymentTerms: string;
  created_at: string;
  updated_at: string;
  totalValue: number;
}

export interface Environment {
  id: string;
  name: string;
  licensePeriod: number;
  components: EnvironmentComponent[];
}

export interface EnvironmentComponent {
  id: string;
  pricingComponentId: string;
  type: string;
  size: string;
  quantity: number;
  monthlyPrice: number;
}

export interface ServiceComponent {
  id: string;
  name: string;
  mandays: number;
  ratePerDay: number;
  total: number;
}