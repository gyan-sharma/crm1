import React from 'react';
import { User, Opportunity } from '../../types';

interface OpportunityBasicInfoProps {
  initialData?: Partial<Opportunity>;
  salesReps: User[];
  isLoading?: boolean;
}

export default function OpportunityBasicInfo({ initialData, salesReps, isLoading }: OpportunityBasicInfoProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={initialData?.title}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">Customer Name</label>
        <input
          type="text"
          name="customer_name"
          id="customer_name"
          defaultValue={initialData?.customer_name}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="contact_info" className="block text-sm font-medium text-gray-700">Contact Info</label>
        <input
          type="text"
          name="contact_info"
          id="contact_info"
          defaultValue={initialData?.contact_info}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="sales_rep_id" className="block text-sm font-medium text-gray-700">Sales Representative</label>
        <select
          name="sales_rep_id"
          id="sales_rep_id"
          defaultValue={initialData?.sales_rep_id}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled={isLoading}
        >
          <option value="">Select a sales rep</option>
          {salesReps.map((rep) => (
            <option key={rep.id} value={rep.id}>{rep.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}