import React from 'react';
import { PricingComponent } from '../../types/pricing';

interface PricingTableProps {
  components: PricingComponent[];
}

export default function PricingTable({ components }: PricingTableProps) {
  if (components.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500">Pricing data not available. Please upload an Excel sheet.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Size</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Hourly Price</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Monthly Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {components.map((component) => (
                <tr key={component.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    {component.prettyName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{component.type}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{component.size}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    €{component.hourlyPrice.toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    €{component.monthlyPrice.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}