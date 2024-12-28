import React from 'react';
import { ServiceComponent } from '../../../types/offers';
import { formatCurrency } from '../../../utils/formatters';

interface ServicesDetailsProps {
  services: ServiceComponent[];
}

export default function ServicesDetails({ services }: ServicesDetailsProps) {
  const totalServices = services.reduce((sum, service) => sum + (service.total || 0), 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full table-fixed">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="w-[40%] px-4 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Service Type</th>
            <th className="w-[20%] px-4 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Man-days</th>
            <th className="w-[20%] px-4 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Rate/Day</th>
            <th className="w-[20%] px-4 py-1.5 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {services.map((service, idx) => (
            <tr key={service.id} className={idx % 2 === 0 ? 'bg-gray-50/30' : 'bg-white'}>
              <td className="px-4 py-1.5 text-xs font-medium text-gray-900 truncate">
                {service.name}
              </td>
              <td className="px-4 py-1.5 text-xs text-gray-500">
                {service.mandays}
              </td>
              <td className="px-4 py-1.5 text-xs text-gray-500">
                {formatCurrency(service.ratePerDay)}
              </td>
              <td className="px-4 py-1.5 text-xs text-gray-900 text-right">
                {formatCurrency(service.total)}
              </td>
            </tr>
          ))}
          <tr className="bg-gray-100 font-bold">
            <td colSpan={3} className="px-4 py-1.5 text-xs text-gray-900">
              Total Services Cost
            </td>
            <td className="px-4 py-1.5 text-xs text-gray-900 text-right">
              {formatCurrency(totalServices)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}