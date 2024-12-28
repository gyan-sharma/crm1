import React from 'react';
import { Environment } from '../../../types/offers';
import { formatCurrency, toTitleCase } from '../../../utils/formatters';
import { usePricingComponents } from '../../../hooks/usePricingComponents';

interface PlatformLicenseDetailsProps {
  environments: Environment[];
}

export default function PlatformLicenseDetails({ environments }: PlatformLicenseDetailsProps) {
  const { components: pricingComponents } = usePricingComponents();

  return (
    <div className="space-y-4">
      {environments.map(env => {
        const envMonthlyTotal = env.components.reduce((sum, comp) => 
          sum + (Math.ceil(comp.monthlyPrice || 0) * (comp.quantity || 1)), 0
        );

        return (
          <div key={env.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Environment Header */}
            <div className="px-4 py-2 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-indigo-600">{env.name} Environment</h4>
                <div className="text-xs text-gray-500">
                  License Period: {env.licensePeriod || 12} months
                </div>
              </div>
            </div>

            {/* Components Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Component</th>
                    <th className="px-4 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-4 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                    <th className="px-4 py-1.5 text-center text-xs font-medium text-gray-500 uppercase">Qty</th>
                    <th className="px-4 py-1.5 text-right text-xs font-medium text-gray-500 uppercase">Monthly</th>
                    <th className="px-4 py-1.5 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {env.components.map((comp, idx) => {
                    const pricingComponent = pricingComponents.find(p => p.id === comp.pricingComponentId);
                    const monthlyPrice = Math.ceil(comp.monthlyPrice || 0);
                    const monthlyTotal = monthlyPrice * (comp.quantity || 1);

                    return (
                      <tr key={comp.id} className={idx % 2 === 0 ? 'bg-gray-50/30' : 'bg-white'}>
                        <td className="px-4 py-1.5 text-xs font-medium text-gray-900 whitespace-nowrap">
                          {pricingComponent?.prettyName || 'Unknown Component'}
                        </td>
                        <td className="px-4 py-1.5 text-xs text-gray-500 whitespace-nowrap">
                          {toTitleCase(comp.type)}
                        </td>
                        <td className="px-4 py-1.5 text-xs text-gray-500 whitespace-nowrap">
                          {toTitleCase(comp.size)}
                        </td>
                        <td className="px-4 py-1.5 text-xs text-gray-500 text-center whitespace-nowrap">
                          {comp.quantity || 1}
                        </td>
                        <td className="px-4 py-1.5 text-xs text-gray-900 text-right whitespace-nowrap">
                          {formatCurrency(monthlyPrice)}
                        </td>
                        <td className="px-4 py-1.5 text-xs text-gray-900 text-right whitespace-nowrap">
                          {formatCurrency(monthlyTotal)}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="bg-gray-100 font-medium">
                    <td colSpan={5} className="px-4 py-1.5 text-xs text-gray-900">
                      Environment Monthly Total
                    </td>
                    <td className="px-4 py-1.5 text-xs text-gray-900 text-right">
                      {formatCurrency(envMonthlyTotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}