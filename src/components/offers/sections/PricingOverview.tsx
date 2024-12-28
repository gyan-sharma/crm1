import React from 'react';
import { Environment, ServiceComponent } from '../../../types/offers';
import { formatCurrency } from '../../../utils/formatters';

interface PricingOverviewProps {
  environments?: Environment[];
  services?: ServiceComponent[];
}

export default function PricingOverview({ environments = [], services = [] }: PricingOverviewProps) {
  const totalEnvironmentCost = environments.reduce((total, env) => 
    total + (env.components || []).reduce((sum, comp) => 
      sum + ((comp.monthlyPrice || 0) * (comp.quantity || 1)), 0
    ), 0
  );

  const totalServicesCost = services.reduce((total, service) => 
    total + (service.total || 0), 0
  );

  const grandTotal = totalEnvironmentCost + totalServicesCost;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Pricing Overview</h3>

      {/* Environments Summary */}
      <div className="space-y-6">
        {environments.map(env => {
          const envTotal = (env.components || []).reduce((sum, comp) => 
            sum + ((comp.monthlyPrice || 0) * (comp.quantity || 1)), 0
          );

          return (
            <div key={env.id} className="border-b border-gray-200 pb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">{env.name} Environment</h4>
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="pb-2">Component</th>
                    <th className="pb-2">Quantity</th>
                    <th className="pb-2">Monthly Price</th>
                    <th className="pb-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {(env.components || []).map(comp => (
                    <tr key={comp.id}>
                      <td className="py-2">{comp.name || 'Unknown Component'}</td>
                      <td className="py-2">{comp.quantity || 1}</td>
                      <td className="py-2">{formatCurrency(comp.monthlyPrice || 0)}</td>
                      <td className="py-2 text-right">
                        {formatCurrency((comp.monthlyPrice || 0) * (comp.quantity || 1))}
                      </td>
                    </tr>
                  ))}
                  <tr className="font-medium">
                    <td colSpan={3} className="pt-4">Environment Total</td>
                    <td className="pt-4 text-right">
                      {formatCurrency(envTotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}

        {/* Services Summary */}
        {services.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Professional Services</h4>
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="pb-2">Service</th>
                  <th className="pb-2">Man-days</th>
                  <th className="pb-2">Rate/Day</th>
                  <th className="pb-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {services.map(service => (
                  <tr key={service.id}>
                    <td className="py-2">{service.name}</td>
                    <td className="py-2">{service.mandays || 1}</td>
                    <td className="py-2">{formatCurrency(service.ratePerDay || 0)}</td>
                    <td className="py-2 text-right">{formatCurrency(service.total || 0)}</td>
                  </tr>
                ))}
                <tr className="font-medium">
                  <td colSpan={3} className="pt-4">Services Total</td>
                  <td className="pt-4 text-right">{formatCurrency(totalServicesCost)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Grand Total */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center text-lg font-medium">
            <span>Grand Total</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            * All prices are monthly unless specified otherwise
          </div>
        </div>
      </div>
    </div>
  );
}