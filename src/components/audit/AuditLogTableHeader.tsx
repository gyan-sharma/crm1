import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { AuditLog } from '../../types/audit';

interface AuditLogTableHeaderProps {
  sortField: keyof AuditLog;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof AuditLog) => void;
}

export default function AuditLogTableHeader({
  sortField,
  sortDirection,
  onSort
}: AuditLogTableHeaderProps) {
  const SortIcon = sortDirection === 'asc' ? ArrowUp : ArrowDown;

  const renderSortableHeader = (field: keyof AuditLog, label: string) => (
    <th
      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-50"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        {sortField === field && (
          <SortIcon className="h-4 w-4 text-gray-500" />
        )}
      </div>
    </th>
  );

  return (
    <thead className="bg-gray-50">
      <tr>
        {renderSortableHeader('timestamp', 'Timestamp')}
        {renderSortableHeader('user_id', 'User')}
        {renderSortableHeader('action', 'Action')}
        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          Entity
        </th>
        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          Details
        </th>
      </tr>
    </thead>
  );
}