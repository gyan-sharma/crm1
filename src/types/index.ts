import { FORECAST_CATEGORIES, INDUSTRIES, LEAD_SOURCES, REGIONS } from './constants';
import type { AuditLog, AuditAction, EntityType } from './audit';

export interface BaseEntity {
  id: string;
  created_at: string;
  deleted_at?: string | null;
  deleted_by?: string | null;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  role: 'admin' | 'sales_rep';
}

export interface BlockchainOpportunity extends BaseEntity {
  title: string;
  customer_name: string;
  contact_info?: string;
  sales_rep_id: string;
  stage: 'new' | 'qualification' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  priority: 'low' | 'medium' | 'high';
  industry: string;
  lead_source: string;
  forecast_category: keyof typeof FORECAST_CATEGORIES;
  estimated_value: number;
  close_date: string;
  interaction_log?: string;
  reason_lost?: string;
  platform_type?: string;
  deployment_type?: string;
  license_type?: string;
  country?: string;
  region: typeof REGIONS[number];
  use_case?: string;
  notes?: string;
  target_countries?: string[];
  technical_requirements?: {
    nodes: number;
  };
  stakeholders?: {
    name: string;
    role: string;
    contact: string;
  }[];
  budget?: {
    license: number;
    services: number;
    maintenance: number;
    total: number;
  };
}

export interface Attachment extends BaseEntity {
  opportunity_id: string;
  filename: string;
  mime_type: string;
  file_size: number;
  data: Blob;
}

export type { AuditLog, AuditAction, EntityType };
export { FORECAST_CATEGORIES, INDUSTRIES, LEAD_SOURCES, REGIONS };