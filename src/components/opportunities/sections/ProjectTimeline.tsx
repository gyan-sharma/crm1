import React from 'react';
import { BlockchainOpportunity } from '../../../types';

interface ProjectTimelineProps {
  initialData?: Partial<BlockchainOpportunity>;
  isLoading?: boolean;
}

export default function ProjectTimeline({ initialData, isLoading }: ProjectTimelineProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Project Timeline</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="poc_start" className="block text-sm font-medium text-gray-700">
            PoC Start Date
          </label>
          <input
            type="date"
            name="poc_start"
            id="poc_start"
            defaultValue={initialData?.timeline?.poc_start}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="poc_end" className="block text-sm font-medium text-gray-700">
            PoC End Date
          </label>
          <input
            type="date"
            name="poc_end"
            id="poc_end"
            defaultValue={initialData?.timeline?.poc_end}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="implementation_start" className="block text-sm font-medium text-gray-700">
            Implementation Start
          </label>
          <input
            type="date"
            name="implementation_start"
            id="implementation_start"
            defaultValue={initialData?.timeline?.implementation_start}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="implementation_end" className="block text-sm font-medium text-gray-700">
            Implementation End
          </label>
          <input
            type="date"
            name="implementation_end"
            id="implementation_end"
            defaultValue={initialData?.timeline?.implementation_end}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}