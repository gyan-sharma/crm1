import React from 'react';
import { BlockchainOpportunity } from '../../../types';

interface StageAndPriorityProps {
  initialData?: Partial<BlockchainOpportunity>;
  isLoading?: boolean;
}

export default function StageAndPriority({ initialData, isLoading }: StageAndPriorityProps) {
  return (
    <>
      <div>
        <label htmlFor="stage" className="block text-sm font-medium text-gray-700">Stage</label>
        <select
          name="stage"
          id="stage"
          defaultValue={initialData?.stage || 'new'}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled={isLoading}
        >
          <option value="new">New</option>
          <option value="qualification">Qualification</option>
          <option value="proposal">Proposal</option>
          <option value="negotiation">Negotiation</option>
          <option value="closed_won">Closed Won</option>
          <option value="closed_lost">Closed Lost</option>
        </select>
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
        <select
          name="priority"
          id="priority"
          defaultValue={initialData?.priority || 'medium'}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled={isLoading}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </>
  );
}