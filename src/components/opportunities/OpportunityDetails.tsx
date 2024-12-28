import React from 'react';
import { Opportunity } from '../../types';

interface OpportunityDetailsProps {
  initialData?: Partial<Opportunity>;
  isLoading?: boolean;
}

export default function OpportunityDetails({ initialData, isLoading }: OpportunityDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
            <option value="closed">Closed</option>
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

        <div>
          <label htmlFor="estimated_value" className="block text-sm font-medium text-gray-700">Estimated Value</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="estimated_value"
              id="estimated_value"
              defaultValue={initialData?.estimated_value}
              required
              min="0"
              className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="close_date" className="block text-sm font-medium text-gray-700">Expected Close Date</label>
          <input
            type="date"
            name="close_date"
            id="close_date"
            defaultValue={initialData?.close_date}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="interaction_log" className="block text-sm font-medium text-gray-700">Interaction Log</label>
        <textarea
          name="interaction_log"
          id="interaction_log"
          rows={4}
          defaultValue={initialData?.interaction_log}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}