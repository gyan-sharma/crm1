import React from 'react';
import { Environment } from '../../../types/offers';
import { formatCurrency, toTitleCase } from '../../../utils/formatters';
import { usePricingComponents } from '../../../hooks/usePricingComponents';

interface EnvironmentDetailsProps {
  environments?: Environment[];
}

export default function EnvironmentDetails({ environments = [] }: EnvironmentDetailsProps) {
  const { components: pricingComponents } = usePricingComponents();

  return (
    <div className="space-y-3">
      {environments.map(env => {
        const envMonthlyTotal = env.components.reduce((sum, comp) => 
          sum + (Math.ceil(comp.monthlyPrice || 0) * (comp.quantity || 1)), 0
        );

        return (
          <div key={env.id} className="bg-blue-50/30 rounded-lg">
            {/* Environment Header */}
            <div className="px-4 py-2 border-b border-gray-200 bg-white/50">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-900">{env.name} Environment</h4>
                <div className="text-xs text-gray-500">
                  License Period: {env.licensePeriod || 12} months
                </div>
              </div>
            </div>

            {/* Components Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-white/50">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Component</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Qty</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Monthly</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {env.components.map(comp => {
                    const pricingComponent = pricingComponents.find(p => p.id === comp.pricingComponentId);
                    const monthlyPrice = Math.ceil(comp.monthlyPrice || 0);
                    const monthlyTotal = monthlyPrice * (comp.quantity || 1);

                    return (
                      <tr key={comp.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-xs font-medium text-gray-900">
                          {pricingComponent?.prettyName || 'Unknown Component'}
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-500">
                          {toTitleCase(comp.type)}
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-500">
                          {toTitleCase(comp.size)}
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-500 text-center">
                          {comp.quantity || 1}
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 text-right">
                          {formatCurrency(monthlyPrice)}
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 text-right">
                          {formatCurrency(monthlyTotal)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-white/50 font-medium">
                    <td colSpan={5} className="px-4 py-2 text-xs text-gray-900">
                      Environment Monthly Total
                    </td>
                    <td className="px-4 py-2 text-xs text-gray-900 text-right">
                      {formatCurrency(envMonthlyTotal)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}