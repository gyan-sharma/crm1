import React from 'react';
import { BlockchainOpportunity } from '../../../types';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import OpportunityBadge from '../../dashboard/OpportunityBadge';

interface SelectedOpportunityDetailsProps {
  opportunity: BlockchainOpportunity;
}

export default function SelectedOpportunityDetails({ opportunity }: SelectedOpportunityDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Opportunity</h3>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h4 className="text-xl font-medium text-gray-900">{opportunity.title}</h4>
            <OpportunityBadge stage={opportunity.stage} />
          </div>
          <p className="text-sm text-gray-500 mb-4">{opportunity.customer_name}</p>
          <div className="font-mono text-sm text-gray-500">Opportunity ID: {opportunity.id}</div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Customer:</span>
            <span className="font-medium">{opportunity.customer_name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Region:</span>
            <span className="font-medium">{opportunity.region}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Sales Rep:</span>
            <span className="font-medium">{opportunity.sales_rep?.name || 'Unassigned'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Estimated Budget:</span>
            <span className="font-medium">{formatCurrency(opportunity.budget?.total || 0)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Close Date:</span>
            <span className="font-medium">{formatDate(opportunity.close_date)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}