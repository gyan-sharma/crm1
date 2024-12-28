import React from 'react';
import { Plus } from 'lucide-react';
import { Environment } from '../../../types/offers';
import EnvironmentSection from './environment/EnvironmentSection';

interface EnvironmentComponentProps {
  environments: Environment[];
  onEnvironmentsChange: (environments: Environment[]) => void;
  isLoading?: boolean;
}

export default function EnvironmentComponent({
  environments,
  onEnvironmentsChange,
  isLoading
}: EnvironmentComponentProps) {
  const addEnvironment = () => {
    onEnvironmentsChange([
      ...environments,
      {
        id: crypto.randomUUID(),
        name: 'Production',
        licensePeriod: 12,
        components: []
      }
    ]);
  };

  const updateEnvironment = (environmentId: string, updates: Partial<Environment>) => {
    onEnvironmentsChange(environments.map(env => 
      env.id === environmentId ? { ...env, ...updates } : env
    ));
  };

  const removeEnvironment = (environmentId: string) => {
    onEnvironmentsChange(environments.filter(env => env.id !== environmentId));
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
              type: 'DEDICATED',
              size: 'MEDIUM',
              quantity: 1,
              monthlyPrice: 0
            }
          ]
        };
      }
      return env;
    }));
  };

  const updateComponent = (environmentId: string, componentId: string, updates: any) => {
    onEnvironmentsChange(environments.map(env => {
      if (env.id === environmentId) {
        return {
          ...env,
          components: env.components.map(comp => {
            if (comp.id === componentId) {
              return { ...comp, ...updates };
            }
            return comp;
          })
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-900">Environments</h4>
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

      {environments.map((env) => (
        <EnvironmentSection
          key={env.id}
          environment={env}
          onUpdate={(updates) => updateEnvironment(env.id, updates)}
          onRemove={() => removeEnvironment(env.id)}
          onAddComponent={() => addComponent(env.id)}
          onUpdateComponent={(componentId, updates) => updateComponent(env.id, componentId, updates)}
          onRemoveComponent={(componentId) => removeComponent(env.id, componentId)}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}