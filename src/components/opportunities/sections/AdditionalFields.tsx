import React from 'react';
import { BlockchainOpportunity } from '../../../types';
import { countries } from '../../../utils/countries';

interface AdditionalFieldsProps {
  initialData?: Partial<BlockchainOpportunity>;
  isLoading?: boolean;
}

export default function AdditionalFields({ initialData, isLoading }: AdditionalFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            name="country"
            id="country"
            defaultValue={initialData?.country || ''}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={isLoading}
          >
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="use_case" className="block text-sm font-medium text-gray-700">
            Use Case
          </label>
          <input
            type="text"
            name="use_case"
            id="use_case"
            defaultValue={initialData?.use_case}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="close_date" className="block text-sm font-medium text-gray-700">
            Close Date
          </label>
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
        <label htmlFor="interaction_log" className="block text-sm font-medium text-gray-700">
          Interaction Log
        </label>
        <textarea
          name="interaction_log"
          id="interaction_log"
          rows={4}
          defaultValue={initialData?.interaction_log}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          name="notes"
          id="notes"
          rows={4}
          defaultValue={initialData?.notes}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}