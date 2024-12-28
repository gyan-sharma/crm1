import React from 'react';
import { Search } from 'lucide-react';
import { AuditAction, EntityType } from '../../types/audit';

interface AuditLogFiltersProps {
  filters: {
    action: string;
    entityType: string;
    search: string;
    startDate: string;
    endDate: string;
  };
  onFilterChange: (filters: any) => void;
}

export default function AuditLogFilters({ filters, onFilterChange }: AuditLogFiltersProps) {
  const actions: AuditAction[] = ['create', 'update', 'delete', 'restore', 'view', 'download_attachment', 'upload_attachment', 'delete_attachment'];
  const entityTypes: EntityType[] = ['opportunity', 'attachment', 'user'];

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              value={filters.search}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search logs..."
            />
          </div>
        </div>

        <div>
          <label htmlFor="action" className="block text-sm font-medium text-gray-700">
            Action
          </label>
          <select
            id="action"
            name="action"
            value={filters.action}
            onChange={(e) => onFilterChange({ ...filters, action: e.target.value })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Actions</option>
            {actions.map((action) => (
              <option key={action} value={action}>
                {action.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="entityType" className="block text-sm font-medium text-gray-700">
            Entity Type
          </label>
          <select
            id="entityType"
            name="entityType"
            value={filters.entityType}
            onChange={(e) => onFilterChange({ ...filters, entityType: e.target.value })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Types</option>
            {entityTypes.map((type) => (
              <option key={type} value={type}>
                {type.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={filters.startDate}
            onChange={(e) => onFilterChange({ ...filters, startDate: e.target.value })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={filters.endDate}
            onChange={(e) => onFilterChange({ ...filters, endDate: e.target.value })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
      </div>
    </div>
  );
}