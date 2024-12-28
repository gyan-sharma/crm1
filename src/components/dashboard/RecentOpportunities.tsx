import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, TrendingUp, Building2, Calendar } from 'lucide-react';
import { BlockchainOpportunity, User } from '../../types';
import { getStageColor, getPriorityColor } from '../../utils/styleHelpers';
import { formatCurrency, formatDate } from '../../utils/formatters';
import OpportunityBadge from './OpportunityBadge';

interface RecentOpportunitiesProps {
  opportunities: (BlockchainOpportunity & { sales_rep?: User })[];
}

export default function RecentOpportunities({ opportunities }: RecentOpportunitiesProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Opportunities</h3>
          <Link
            to="/opportunities"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all
          </Link>
        </div>
        <div className="overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {opportunities.map((opportunity) => (
              <li key={opportunity.id} className="py-5">
                <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {opportunity.title}
                      </h4>
                      <OpportunityBadge stage={opportunity.stage} />
                      <OpportunityBadge priority={opportunity.priority} />
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Building2 className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {opportunity.customer_name}
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {formatCurrency(opportunity.estimated_value)}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {formatDate(opportunity.close_date)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/opportunities/${opportunity.id}`}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Eye className="h-4 w-4 mr-1.5" />
                      View Details
                    </Link>
                  </div>
                </div>
                {opportunity.sales_rep && (
                  <div className="mt-2 text-sm text-gray-500">
                    Assigned to {opportunity.sales_rep.name}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}