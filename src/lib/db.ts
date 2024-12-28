import Dexie, { Table } from 'dexie';
import { User, Opportunity, Attachment, AuditLog, PricingComponent, Offer } from '../types';
import { Review, ReviewRequest, OfferDocument } from '../types/reviews';

export class CrmDatabase extends Dexie {
  users!: Table<User>;
  opportunities!: Table<Opportunity>;
  attachments!: Table<Attachment>;
  auditLogs!: Table<AuditLog>;
  pricingComponents!: Table<PricingComponent>;
  offers!: Table<Offer>;
  reviews!: Table<Review>;
  reviewRequests!: Table<ReviewRequest>;
  offerDocuments!: Table<OfferDocument>;

  constructor() {
    super('CrmDatabase');
    
    this.version(5).stores({
      users: 'id, email, role, deleted_at',
      opportunities: 'id, title, sales_rep_id, stage, priority, created_at, deleted_at',
      attachments: 'id, opportunity_id, filename',
      auditLogs: 'id, timestamp, user_id, action, entity_type, entity_id',
      pricingComponents: 'id, prettyName, type, size, created_at',
      offers: 'id, opportunityId, salesRepId, status, created_at',
      reviews: 'id, offerId, reviewerId, status',
      reviewRequests: 'id, offerId, status',
      offerDocuments: 'id, offerId, type'
    });
  }
}

const db = new CrmDatabase();
export default db;