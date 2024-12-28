import React from 'react';
import { Environment, ServiceComponent } from '../../../types/offers';
import { formatCurrency } from '../../../utils/formatters';

interface CommercialSummaryProps {
  environments: Environment[];
  services: ServiceComponent[];
  deliveryDuration: number;
}

export default function CommercialSummary({ environments, services, deliveryDuration }: CommercialSummaryProps) {
  // Calculate MRR (Monthly Recurring Revenue)
  const mrr = environments.reduce((total, env) => {
    return total + env.components.reduce((envTotal, comp) => 
      envTotal + (Math.ceil(comp.monthlyPrice || 0) * (comp.quantity || 1)), 0
    );
  }, 0);

  // Calculate total platform license cost including per-environment durations
  const totalPlatformCost = environments.reduce((sum, env) => {
    const monthlyEnvCost = env.components.reduce((compSum, comp) => 
      compSum + (Math.ceil(comp.monthlyPrice || 0) * (comp.quantity || 1)), 0
    );
    return sum + (monthlyEnvCost * (env.licensePeriod || 12));
  }, 0);

  // Calculate total services cost
  const totalServices = services.reduce((sum, service) => 
    sum + (service.total || 0), 0
  );

  // Calculate TCV (Total Contract Value)
  const tcv = totalPlatformCost + totalServices;

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-900">Commercial Summary</h3>

      {/* Platform License Section */}
      <div className="space-y-4">
        <h4 className="text-xl font-medium text-gray-900">Platform License</h4>
        
        {environments.map(env => {
          const monthlyEnvCost = env.components.reduce((sum, comp) => 
            sum + (Math.ceil(comp.monthlyPrice || 0) * (comp.quantity || 1)), 0
          );
          const envTotal = monthlyEnvCost * (env.licensePeriod || 12);

          return (
            <div key={env.id} className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="text-lg text-gray-900">{env.name} Environment</h5>
                  <p className="text-sm text-gray-500">Duration: {env.licensePeriod || 12} months</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-medium">{formatCurrency(monthlyEnvCost)} / month</div>
                  <div className="text-sm text-gray-500">Total: {formatCurrency(envTotal)}</div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex justify-between items-center py-2 border-t border-gray-200">
          <span className="font-medium">Total Platform License</span>
          <span className="font-medium">{formatCurrency(totalPlatformCost)}</span>
        </div>
      </div>

      {/* Professional Services Section */}
      <div className="space-y-4">
        <h4 className="text-xl font-medium text-gray-900">Professional Services</h4>
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span>Delivery Duration</span>
            <span className="font-medium">{deliveryDuration} months</span>
          </div>
        </div>
        <div className="flex justify-between items-center py-2 border-t border-gray-200">
          <span className="font-medium">Total Services</span>
          <span className="font-medium">{formatCurrency(totalServices)}</span>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-3 gap-6 bg-indigo-50 p-6 rounded-lg">
        <div>
          <div className="text-sm font-medium text-gray-500">MRR</div>
          <div className="text-2xl font-semibold text-gray-900">{formatCurrency(mrr)}</div>
          <div className="text-sm text-gray-500">Monthly Recurring Revenue</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500">Services</div>
          <div className="text-2xl font-semibold text-gray-900">{formatCurrency(totalServices)}</div>
          <div className="text-sm text-gray-500">Professional Services</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500">TCV</div>
          <div className="text-2xl font-semibold text-gray-900">{formatCurrency(tcv)}</div>
          <div className="text-sm text-gray-500">Total Contract Value</div>
        </div>
      </div>
    </div>
  );
}