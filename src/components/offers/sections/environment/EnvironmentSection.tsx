import React from 'react';
import { Trash2 } from 'lucide-react';
import { Environment } from '../../../../types/offers';
import ComponentRow from './ComponentRow';

interface EnvironmentSectionProps {
  environment: Environment;
  onUpdate: (updates: Partial<Environment>) => void;
  onRemove: () => void;
  onAddComponent: () => void;
  onUpdateComponent: (componentId: string, updates: any) => void;
  onRemoveComponent: (componentId: string) => void;
  isLoading?: boolean;
}

export default function EnvironmentSection({
  environment,
  onUpdate,
  onRemove,
  onAddComponent,
  onUpdateComponent,
  onRemoveComponent,
  isLoading
}: EnvironmentSectionProps) {
  const environmentTotal = Math.ceil(
    environment.components.reduce((sum, comp) => 
      sum + (comp.monthlyPrice * (comp.quantity || 1)), 0
    )
  );

  // Find the new component (one without a selected pricingComponentId)
  const newComponent = environment.components.find(comp => !comp.pricingComponentId);

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="grid grid-cols-2 gap-4 flex-1 mr-4">
          <div>
            <select
              value={environment.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={isLoading}
            >
              <option value="Production">Production Environment</option>
              <option value="Testing">Testing Environment</option>
              <option value="Development">Development Environment</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              License Duration (Months)
            </label>
            <input
              type="number"
              min="1"
              value={environment.licensePeriod || 12}
              onChange={(e) => onUpdate({ licensePeriod: parseInt(e.target.value) || 12 })}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={isLoading}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-600 hover:text-red-900"
          disabled={isLoading}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="text-left text-xs font-medium text-gray-500 uppercase">Component</th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase">Size</th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase">Monthly Price</th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase">Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {environment.components.map((component) => (
            <ComponentRow
              key={component.id}
              component={component}
              onUpdate={(updates) => onUpdateComponent(component.id, updates)}
              onRemove={() => onRemoveComponent(component.id)}
              isLoading={isLoading}
              isNew={!component.pricingComponentId}
            />
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center pt-4">
        {!newComponent && (
          <button
            type="button"
            onClick={onAddComponent}
            className="text-sm text-indigo-600 hover:text-indigo-900 font-medium"
            disabled={isLoading}
          >
            + Add Component
          </button>
        )}
        <div className="text-sm font-medium text-gray-900">
          Environment Total: €{environmentTotal.toLocaleString()}
        </div>
      </div>
    </div>
  );
}