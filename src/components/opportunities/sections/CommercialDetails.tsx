import React, { useEffect } from 'react';
import { BlockchainOpportunity } from '../../../types';

interface CommercialDetailsProps {
  initialData?: Partial<BlockchainOpportunity>;
  isLoading?: boolean;
}

export default function CommercialDetails({ initialData, isLoading }: CommercialDetailsProps) {
  // Calculate total budget whenever individual budgets change
  const calculateTotalBudget = (form: HTMLFormElement) => {
    const license = parseInt(form.budget_license.value) || 0;
    const services = parseInt(form.budget_services.value) || 0;
    const maintenance = parseInt(form.budget_maintenance.value) || 0;
    return Math.ceil(license + services + maintenance);
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const form = e.target.form;
    if (form) {
      const totalBudget = calculateTotalBudget(form);
      const totalInput = form.querySelector<HTMLInputElement>('#budget_total');
      if (totalInput) {
        totalInput.value = totalBudget.toString();
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Commercial Details</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="budget_license" className="block text-sm font-medium text-gray-700">
            License Budget
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">€</span>
            </div>
            <input
              type="number"
              name="budget_license"
              id="budget_license"
              min="0"
              defaultValue={initialData?.budget?.license || 0}
              required
              onChange={handleBudgetChange}
              className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="budget_services" className="block text-sm font-medium text-gray-700">
            Services Budget
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">€</span>
            </div>
            <input
              type="number"
              name="budget_services"
              id="budget_services"
              min="0"
              defaultValue={initialData?.budget?.services || 0}
              required
              onChange={handleBudgetChange}
              className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="budget_maintenance" className="block text-sm font-medium text-gray-700">
            Annual Maintenance Budget
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">€</span>
            </div>
            <input
              type="number"
              name="budget_maintenance"
              id="budget_maintenance"
              min="0"
              defaultValue={initialData?.budget?.maintenance || 0}
              required
              onChange={handleBudgetChange}
              className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Total Budget (Read-only) */}
      <div>
        <label htmlFor="budget_total" className="block text-sm font-medium text-gray-700">
          Total Estimated Budget
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">€</span>
          </div>
          <input
            type="text"
            name="budget_total"
            id="budget_total"
            defaultValue={initialData?.budget?.total || 0}
            readOnly
            className="mt-1 block w-full pl-7 rounded-md border-gray-300 bg-gray-50 text-gray-900 font-medium shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}