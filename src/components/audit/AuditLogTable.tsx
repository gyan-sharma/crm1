import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { AuditLog } from '../../types/audit';
import Pagination from '../opportunities/Pagination';
import { formatDate } from '../../utils/formatters';
import AuditLogTableHeader from './AuditLogTableHeader';
import AuditLogTableRow from './AuditLogTableRow';

interface AuditLogTableProps {
  logs: AuditLog[];
  sortField: keyof AuditLog;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof AuditLog) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export default function AuditLogTable({
  logs,
  sortField,
  sortDirection,
  onSort,
  currentPage,
  totalPages,
  onPageChange,
  isLoading
}: AuditLogTableProps) {
  if (isLoading) {
    return <div className="text-center py-4">Loading audit logs...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <AuditLogTableHeader
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              <tbody className="bg-white divide-y divide-gray-200">
                {logs.map((log) => (
                  <AuditLogTableRow key={log.id} log={log} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}