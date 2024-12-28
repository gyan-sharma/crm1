import React from 'react';
import { ServiceComponent } from '../../../types/offers';
import { formatCurrency } from '../../../utils/formatters';

interface ServicesListProps {
  services: ServiceComponent[];
  onServicesChange: (services: ServiceComponent[]) => void;
  isLoading?: boolean;
}

const SERVICE_TYPES = [
  'Discovery Analysis',
  'Project Management', 
  'Solution Design',
  'BPaaS Development',
  'Backend Development',
  'Front End Development',
  'Integrations',
  'Testing',
  'Documentation',
  'Travel',
  'Iterations'
];

export default function ServicesList({
  services,
  onServicesChange,
  isLoading
}: ServicesListProps) {
  // Initialize services if empty
  React.useEffect(() => {
    if (services.length === 0) {
      const initialServices = SERVICE_TYPES.map(type => ({
        id: crypto.randomUUID(),
        name: type,
        mandays: 1,
        ratePerDay: 1200,
        total: 1200
      }));
      onServicesChange(initialServices);
    }
  }, []);

  const updateService = (id: string, updates: Partial<ServiceComponent>) => {
    onServicesChange(services.map(service => {
      if (service.id === id) {
        const updatedService = { ...service, ...updates };
        // Recalculate total whenever mandays or rate changes
        if ('mandays' in updates || 'ratePerDay' in updates) {
          const mandays = updates.mandays ?? service.mandays ?? 1;
          const ratePerDay = updates.ratePerDay ?? service.ratePerDay ?? 1200;
          updatedService.total = mandays * ratePerDay;
        }
        return updatedService;
      }
      return service;
    }));
  };

  const totalServices = services.reduce((sum, service) => sum + (service.total || 0), 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Service Type</th>
            <th className="px-4 py-1.5 text-left text-xs font-medium text-gray-500 uppercase w-24">Man-days</th>
            <th className="px-4 py-1.5 text-left text-xs font-medium text-gray-500 uppercase w-32">Rate/Day</th>
            <th className="px-4 py-1.5 text-right text-xs font-medium text-gray-500 uppercase w-32">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {services.map((service, idx) => (
            <tr key={service.id} className={idx % 2 === 0 ? 'bg-gray-50/30' : 'bg-white'}>
              <td className="px-4 py-1.5 text-xs font-medium text-gray-900">
                {service.name}
              </td>
              <td className="px-4 py-1.5">
                <input
                  type="number"
                  min="1"
                  value={service.mandays ?? 1}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value > 0) {
                      updateService(service.id, { mandays: value });
                    }
                  }}
                  className="block w-16 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs"
                  disabled={isLoading}
                />
              </td>
              <td className="px-4 py-1.5">
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2 text-xs">€</span>
                  <input
                    type="number"
                    min="0"
                    value={service.ratePerDay ?? 1200}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value >= 0) {
                        updateService(service.id, { ratePerDay: value });
                      }
                    }}
                    className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs"
                    disabled={isLoading}
                  />
                </div>
              </td>
              <td className="px-4 py-1.5 text-xs text-gray-900 text-right">
                {formatCurrency(service.total ?? 0)}
              </td>
            </tr>
          ))}
          <tr className="bg-gray-100 font-medium">
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