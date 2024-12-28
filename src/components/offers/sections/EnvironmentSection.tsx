import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Environment, EnvironmentComponent } from '../../../types/offers';
import { PricingComponent } from '../../../types/pricing';

interface EnvironmentSectionProps {
  environments: Environment[];
  onEnvironmentsChange: (environments: Environment[]) => void;
  pricingComponents: PricingComponent[];
  isLoading?: boolean;
}

export default function EnvironmentSection({
  environments,
  onEnvironmentsChange,
  pricingComponents,
  isLoading
}: EnvironmentSectionProps) {
  const addEnvironment = () => {
    onEnvironmentsChange([
      ...environments,
      {
        id: crypto.randomUUID(),
        name: 'Production',
        components: []
      }
    ]);
  };

  const removeEnvironment = (environmentId: string) => {
    onEnvironmentsChange(environments.filter(env => env.id !== environmentId));
  };

  const updateEnvironmentName = (environmentId: string, name: string) => {
    onEnvironmentsChange(environments.map(env => 
      env.id === environmentId ? { ...env, name } : env
    ));
  };

  const addComponent = (environmentId: string) => {
    onEnvironmentsChange(environments.map(env => {
      if (env.id === environmentId) {
        return {
          ...env,
          components: [
            ...env.components,
            {
              id: crypto.randomUUID(),
              pricingComponentId: '',
              quantity: 1,
              monthlyPrice: 0
            }
          ]
        };
      }
      return env;
    }));
  };

  const removeComponent = (environmentId: string, componentId: string) => {
    onEnvironmentsChange(environments.map(env => {
      if (env.id === environmentId) {
        return {
          ...env,
          components: env.components.filter(comp => comp.id !== componentId)
        };
      }
      return env;
    }));
  };

  const updateComponent = (
    environmentId: string, 
    componentId: string, 
    updates: Partial<EnvironmentComponent>
  ) => {
    onEnvironmentsChange(environments.map(env => {
      if (env.id === environmentId) {
        return {
          ...env,
          components: env.components.map(comp => {
            if (comp.id === componentId) {
              const updatedComp = { ...comp, ...updates };
              
              // Update monthly price if pricing component changed
              if (updates.pricingComponentId) {
                const pricingComponent = pricingComponents.find(
                  p => p.id === updates.pricingComponentId
                );
                if (pricingComponent) {
                  updatedComp.monthlyPrice = pricingComponent.monthlyPrice;
                }
              }
              
              return updatedComp;
            }
            return comp;
          })
        };
      }
      return env;
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Environments</h3>
        <button
          type="button"
          onClick={addEnvironment}
          disabled={isLoading}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Environment
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {environments.map((env) => (
          <div key={env.id} className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <select
                  value={env.name}
                  onChange={(e) => updateEnvironmentName(env.id, e.target.value)}
                  className="rounded-md border-gray-300 text-sm font-medium"
                  disabled={isLoading}
                >
                  <option value="Production">Production Environment</option>
                  <option value="Testing">Testing Environment</option>
                  <option value="Development">Development Environment</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => removeEnvironment(env.id)}
                className="text-red-600 hover:text-red-900"
                disabled={isLoading}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Components Table */}
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Component</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Monthly Price</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {env.components.map((comp) => (
                    <tr key={comp.id}>
                      <td className="py-4 pl-4 pr-3 text-sm">
                        <select
                          value={comp.pricingComponentId}
                          onChange={(e) => updateComponent(env.id, comp.id, {
                            pricingComponentId: e.target.value
                          })}
                          className="block w-full rounded-md border-gray-300 text-sm"
                          disabled={isLoading}
                        >
                          <option value="">Select Component</option>
                          {pricingComponents.map(p => (
                            <option key={p.id} value={p.id}>
                              {p.prettyName} ({p.type} - {p.size})
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-4 text-sm">
                        <input
                          type="number"
                          min="1"
                          value={comp.quantity}
                          onChange={(e) => updateComponent(env.id, comp.id, {
                            quantity: parseInt(e.target.value) || 1
                          })}
                          className="block w-24 rounded-md border-gray-300 text-sm"
                          disabled={isLoading}
                        />
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        €{comp.monthlyPrice.toFixed(2)}
                      </td>
                      <td className="px-3 py-4 text-sm font-medium text-gray-900">
                        €{(comp.monthlyPrice * comp.quantity).toFixed(2)}
                      </td>
                      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium">
                        <button
                          type="button"
                          onClick={() => removeComponent(env.id, comp.id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={() => addComponent(env.id)}
                className="text-sm text-indigo-600 hover:text-indigo-900 font-medium"
                disabled={isLoading}
              >
                + Add Component
              </button>
              <div className="text-sm font-medium text-gray-900">
                Environment Total: €{env.components.reduce((sum, comp) => 
                  sum + (comp.monthlyPrice * comp.quantity), 0
                ).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}