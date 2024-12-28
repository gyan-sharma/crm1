import React from 'react';
import { BlockchainOpportunity } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import OpportunityBadge from '../dashboard/OpportunityBadge';

interface OpportunitySearchResultsProps {
  results: BlockchainOpportunity[];
  onSelect: (opportunity: BlockchainOpportunity) => void;
  isLoading?: boolean;
}

export default function OpportunitySearchResults({ 
  results, 
  onSelect,
  isLoading 
}: OpportunitySearchResultsProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {results.map((opportunity) => (
          <li 
            key={opportunity.id}
            className="hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onSelect(opportunity)}
          >
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {opportunity.title}
                    </h4>
                    <OpportunityBadge stage={opportunity.stage} />
                  </div>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <span>{opportunity.customer_name}</span>
                    <span>{opportunity.country}</span>
                    <span>{formatCurrency(opportunity.estimated_value)}</span>
                    <span>{formatDate(opportunity.close_date)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(opportunity);
                  }}
                  disabled={isLoading}
                  className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  Select
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}