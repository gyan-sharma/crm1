import { User } from '../../types';
import { AuditAction, AuditLog, EntityType } from '../../types/audit';
import db from '../db';

// Cache for sales rep names to reduce database queries
const salesRepCache = new Map<string, string>();

async function getSalesRepName(id: string | null): Promise<string> {
  if (!id) return 'Unassigned';
  
  // Check cache first
  if (salesRepCache.has(id)) {
    return salesRepCache.get(id)!;
  }

  // Query database and cache result
  const user = await db.users.get(id);
  const name = user ? user.name : 'Unknown';
  salesRepCache.set(id, name);
  return name;
}

async function enrichFieldValue(field: string, value: any): Promise<any> {
  // Special handling for sales rep changes
  if (field === 'sales_rep_id') {
    const name = await getSalesRepName(value);
    return name;
  }
  
  // Handle null/undefined values
  if (value === null || value === undefined) {
    return 'Unassigned';
  }
  
  return value;
}

export async function logChange(
  user: User,
  entityType: EntityType,
  entityId: string,
  oldData: Record<string, any>,
  newData: Record<string, any>
): Promise<void> {
  const changes: Record<string, { old: any; new: any }> = {};
  
  // Compare old and new data to identify changes
  for (const key of Object.keys(newData)) {
    if (key.startsWith('_')) continue; // Skip internal fields
    
    const oldValue = await enrichFieldValue(key, oldData[key]);
    const newValue = await enrichFieldValue(key, newData[key]);
    
    // Only log if values are different
    if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
      changes[key] = {
        old: oldValue,
        new: newValue
      };
    }
  }

  if (Object.keys(changes).length > 0) {
    await logAction(user, 'update', entityType, entityId, { changes });
  }
}

export async function logAction(
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
    details: {
      ...details,
      performed_by: user.name
    }
  };

  await db.auditLogs.add(auditLog);
}