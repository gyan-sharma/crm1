import React from 'react';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  filters: {
    stage?: string;
    priority?: string;
    minValue?: number;
    maxValue?: number;
    country?: string[];
  };
  onFilterChange: (filters: any) => void;
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex items-center">
        <Filter className="h-5 w-5 text-gray-400 mr-2" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>
      
      <select
        value={filters.stage || ''}
        onChange={(e) => onFilterChange({ ...filters, stage: e.target.value })}
        className="rounded-md border-gray-300 text-sm"
      >
        <option value="">All Stages</option>
        <option value="new">New</option>
        <option value="qualification">Qualification</option>
        <option value="proposal">Proposal</option>
        <option value="negotiation">Negotiation</option>
        <option value="closed">Closed</option>
      </select>

      <select
        value={filters.priority || ''}
        onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
        className="rounded-md border-gray-300 text-sm"
      >
        <option value="">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <input
        type="number"
        placeholder="Min Value"
        value={filters.minValue || ''}
        onChange={(e) => onFilterChange({ ...filters, minValue: e.target.value })}
        className="rounded-md border-gray-300 text-sm w-32"
      />

      <input
        type="number"
        placeholder="Max Value"
        value={filters.maxValue || ''}
        onChange={(e) => onFilterChange({ ...filters, maxValue: e.target.value })}
        className="rounded-md border-gray-300 text-sm w-32"
      />
    </div>
  );
}