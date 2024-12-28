import React, { useState, useEffect } from 'react';
import { AuditLog } from '../types/audit';
import { useAuth } from '../contexts/AuthContext';
import db from '../lib/db';
import AuditLogTable from '../components/audit/AuditLogTable';
import AuditLogFilters from '../components/audit/AuditLogFilters';

export default function AuditLogPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    action: '',
    entityType: '',
    search: '',
    startDate: '',
    endDate: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof AuditLog>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const itemsPerPage = 10;

  useEffect(() => {
    loadAuditLogs();
  }, []);

  const loadAuditLogs = async () => {
    try {
      const allLogs = await db.auditLogs.toArray();
      setLogs(allLogs);
    } catch (error) {
      console.error('Error loading audit logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesAction = !filters.action || log.action === filters.action;
    const matchesEntityType = !filters.entityType || log.entity_type === filters.entityType;
    const matchesSearch = !filters.search || 
      log.entity_id.toLowerCase().includes(filters.search.toLowerCase()) ||
      log.action.toLowerCase().includes(filters.search.toLowerCase());
    const matchesDateRange = (!filters.startDate || new Date(log.timestamp) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(log.timestamp) <= new Date(filters.endDate));

    return matchesAction && matchesEntityType && matchesSearch && matchesDateRange;
  });

  const sortedLogs = [...filteredLogs].sort((a, b) => {
    if (sortField === 'timestamp') {
      return sortDirection === 'asc' 
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    return 0;
  });

  const paginatedLogs = sortedLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedLogs.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Audit Log</h1>
        <p className="mt-2 text-sm text-gray-700">
          Track all system activities and changes.
        </p>
      </div>

      <AuditLogFilters
        filters={filters}
        onFilterChange={setFilters}
      />

      <AuditLogTable
        logs={paginatedLogs}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={(field) => {
          if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
          } else {
            setSortField(field);
            setSortDirection('asc');
          }
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        isLoading={isLoading}
      />
    </div>
  );
}