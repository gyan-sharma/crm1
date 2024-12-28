import React, { useEffect, useState } from 'react';
import { BlockchainOpportunity, User } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import OpportunityBadge from '../dashboard/OpportunityBadge';
import db from '../../lib/db';

interface OpportunityDetailsProps {
  opportunityId: string;
}

export default function OpportunityDetails({ opportunityId }: OpportunityDetailsProps) {
  const [opportunity, setOpportunity] = useState<BlockchainOpportunity | null>(null);
  const [salesRep, setSalesRep] = useState<User | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const opp = await db.opportunities.get(opportunityId);
      if (opp && opp.sales_rep_id) {
        const rep = await db.users.get(opp.sales_rep_id);
        setSalesRep(rep);
      }
      setOpportunity(opp || null);
    };
    loadData();
  }, [opportunityId]);

  if (!opportunity) return null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{opportunity.title}</h3>
          <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
            <OpportunityBadge stage={opportunity.stage} />
            <span>•</span>
            <span>{opportunity.industry}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">ID: {opportunity.id}</div>
          <div className="mt-1 text-sm text-gray-500">Created {formatDate(opportunity.created_at)}</div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">Customer</label>
            <div className="mt-1 text-sm font-medium text-gray-900">{opportunity.customer_name}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Region</label>
            <div className="mt-1 text-sm font-medium text-gray-900">{opportunity.region}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Sales Representative</label>
            <div className="mt-1 text-sm font-medium text-gray-900">{salesRep?.name || 'Not assigned'}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">Total Budget</label>
            <div className="mt-1 text-sm font-medium text-gray-900">{formatCurrency(opportunity.budget?.total || 0)}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Close Date</label>
            <div className="mt-1 text-sm font-medium text-gray-900">{formatDate(opportunity.close_date)}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Use Case</label>
            <div className="mt-1 text-sm font-medium text-gray-900">{opportunity.use_case || 'Not specified'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}