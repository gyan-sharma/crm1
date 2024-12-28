import React from 'react';
import { BlockchainOpportunity } from '../../../types';
import { Plus, Trash2 } from 'lucide-react';

interface StakeholderInfoProps {
  initialData?: Partial<BlockchainOpportunity>;
  isLoading?: boolean;
}

export default function StakeholderInfo({ initialData, isLoading }: StakeholderInfoProps) {
  const [stakeholders, setStakeholders] = React.useState(
    initialData?.stakeholders || [{ name: '', role: '', contact: '' }]
  );

  const addStakeholder = () => {
    setStakeholders([...stakeholders, { name: '', role: '', contact: '' }]);
  };

  const removeStakeholder = (index: number) => {
    setStakeholders(stakeholders.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Stakeholders</h3>
        <button
          type="button"
          onClick={addStakeholder}
          disabled={isLoading}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Stakeholder
        </button>
      </div>

      {stakeholders.map((stakeholder, index) => (
        <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-3 border-b border-gray-200 pb-4">
          <div>
            <label htmlFor={`stakeholder_name_${index}`} className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name={`stakeholder_name_${index}`}
              id={`stakeholder_name_${index}`}
              defaultValue={stakeholder.name}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor={`stakeholder_role_${index}`} className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              name={`stakeholder_role_${index}`}
              id={`stakeholder_role_${index}`}
              defaultValue={stakeholder.role}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              disabled={isLoading}
            />
          </div>

          <div className="relative">
            <label htmlFor={`stakeholder_contact_${index}`} className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <div className="flex">
              <input
                type="text"
                name={`stakeholder_contact_${index}`}
                id={`stakeholder_contact_${index}`}
                defaultValue={stakeholder.contact}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                disabled={isLoading}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeStakeholder(index)}
                  className="ml-2 mt-1 text-red-600 hover:text-red-900"
                  disabled={isLoading}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}