import React from 'react';
import { BlockchainOpportunity } from '../../../types';

interface TechnicalDetailsProps {
  initialData?: Partial<BlockchainOpportunity>;
  isLoading?: boolean;
}

export default function TechnicalDetails({ initialData, isLoading }: TechnicalDetailsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Technical Requirements</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="platform_type" className="block text-sm font-medium text-gray-700">
            Platform Type
          </label>
          <select
            name="platform_type"
            id="platform_type"
            defaultValue={initialData?.platform_type || 'private'}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={isLoading}
          >
            <option value="public">Public Blockchain</option>
            <option value="private">Private Blockchain</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label htmlFor="deployment_type" className="block text-sm font-medium text-gray-700">
            Deployment Type
          </label>
          <select
            name="deployment_type"
            id="deployment_type"
            defaultValue={initialData?.deployment_type || 'cloud'}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={isLoading}
          >
            <option value="cloud">Cloud</option>
            <option value="on-premise">On-Premise</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label htmlFor="nodes" className="block text-sm font-medium text-gray-700">
            Number of Nodes
          </label>
          <input
            type="number"
            name="nodes"
            id="nodes"
            min="1"
            defaultValue={initialData?.technical_requirements?.nodes || 1}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}