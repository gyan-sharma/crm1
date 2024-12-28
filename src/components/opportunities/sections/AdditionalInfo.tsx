import React from 'react';
import { BlockchainOpportunity } from '../../../types';
import { countries } from '../../../utils/countries';

interface AdditionalInfoProps {
  initialData?: Partial<BlockchainOpportunity>;
  isLoading?: boolean;
}

export default function AdditionalInfo({ initialData, isLoading }: AdditionalInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="estimated_value" className="block text-sm font-medium text-gray-700">
            Estimated Value
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">€</span>
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

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            name="country"
            id="country"
            defaultValue={initialData?.country}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={isLoading}
          >
            <option value="">Select a country</option>
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