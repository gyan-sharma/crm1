import { useEffect, useState } from 'react';
import { AuditLog } from '../../types/audit';
import db from '../db';

export function useAuditLogs(filters?: {
  entityType?: string;
  entityId?: string;
  userId?: string;
  action?: string;
  startDate?: string;
  endDate?: string;
}) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let query = db.auditLogs.orderBy('timestamp').reverse();

    if (filters?.entityType) {
      query = query.filter(log => log.entity_type === filters.entityType);
    }
    if (filters?.entityId) {
      query = query.filter(log => log.entity_id === filters.entityId);
    }
    if (filters?.userId) {
      query = query.filter(log => log.user_id === filters.userId);
    }
    if (filters?.action) {
      query = query.filter(log => log.action === filters.action);
    }
    if (filters?.startDate) {
      query = query.filter(log => log.timestamp >= filters.startDate!);
    }
    if (filters?.endDate) {
      query = query.filter(log => log.timestamp <= filters.endDate!);
    }

    query.toArray()
      .then(setLogs)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [filters]);

  return { logs, isLoading };
}