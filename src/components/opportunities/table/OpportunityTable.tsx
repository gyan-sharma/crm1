import React, { useState } from 'react';
import { BlockchainOpportunity, User } from '../../../types';
import OpportunityTableHeader from './OpportunityTableHeader';
import OpportunityTableRow from './OpportunityTableRow';

type SortField = 'title' | 'customer_name' | 'stage' | 'priority' | 'estimated_value' | 'created_at';
type SortDirection = 'asc' | 'desc';

interface OpportunityTableProps {
  opportunities: (BlockchainOpportunity & { sales_rep?: User })[];
  onEdit: (opportunity: BlockchainOpportunity) => void;
  onDelete: (opportunity: BlockchainOpportunity) => void;
}

export default function OpportunityTable({ opportunities, onEdit, onDelete }: OpportunityTableProps) {
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedOpportunities = [...opportunities].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'title':
      case 'customer_name':
      case 'stage':
      case 'priority':
        comparison = a[sortField].localeCompare(b[sortField]);
        break;
      case 'estimated_value':
        comparison = a.estimated_value - b.estimated_value;
        break;
      case 'created_at':
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        break;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <OpportunityTableHeader
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
            <tbody className="divide-y divide-gray-200">
              {sortedOpportunities.map((opportunity) => (
                <OpportunityTableRow
                  key={opportunity.id}
                  opportunity={opportunity}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}