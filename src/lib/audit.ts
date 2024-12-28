import { AuditAction, AuditLog, EntityType } from '../types/audit';
import { User } from '../types';
import db from './db';

export async function createAuditLog(
  user: User,
  action: AuditAction,
  entityType: EntityType,
  entityId: string,
  details?: Record<string, any>
): Promise<void> {
  const auditLog: AuditLog = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    user_id: user.id,
    action,
    entity_type: entityType,
    entity_id: entityId,
    details: details || {}
  };

  await db.auditLogs.add(auditLog);
}

export async function getEntityAuditLogs(entityType: EntityType, entityId: string): Promise<AuditLog[]> {
  return db.auditLogs
    .where(['entity_type', 'entity_id'])
    .equals([entityType, entityId])
    .reverse()
    .sortBy('timestamp');
}

export async function getUserAuditLogs(userId: string): Promise<AuditLog[]> {
  return db.auditLogs
    .where('user_id')
    .equals(userId)
    .reverse()
    .sortBy('timestamp');
}