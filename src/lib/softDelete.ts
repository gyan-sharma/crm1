import { User } from '../types';
import { createAuditLog } from './audit';
import db from './db';

export async function softDeleteEntity(
  table: 'opportunities' | 'users',
  id: string,
  user: User
): Promise<void> {
  const now = new Date().toISOString();
  
  await db[table].update(id, {
    deleted_at: now,
    deleted_by: user.id
  });

  await createAuditLog(
    user,
    'delete',
    table === 'opportunities' ? 'opportunity' : 'user',
    id,
    { metadata: { soft_delete: true, timestamp: now } }
  );
}

export async function restoreEntity(
  table: 'opportunities' | 'users',
  id: string,
  user: User
): Promise<void> {
  await db[table].update(id, {
    deleted_at: null,
    deleted_by: null
  });

  await createAuditLog(
    user,
    'restore',
    table === 'opportunities' ? 'opportunity' : 'user',
    id
  );
}

export function excludeDeleted(query: any) {
  return query.filter((item: any) => !item.deleted_at);
}