import { User } from './index';

export type AuditAction = 
  | 'create'
  | 'update'
  | 'delete'
  | 'restore'
  | 'view'
  | 'download_attachment'
  | 'upload_attachment'
  | 'delete_attachment';

export type EntityType = 
  | 'opportunity'
  | 'attachment'
  | 'user';

export interface AuditLog {
  id: string;
  timestamp: string;
  user_id: string;
  action: AuditAction;
  entity_type: EntityType;
  entity_id: string;
  details: {
    changes?: Record<string, any>;
    metadata?: Record<string, any>;
  };
}