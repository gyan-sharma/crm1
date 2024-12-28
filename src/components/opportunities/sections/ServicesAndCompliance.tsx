import React from 'react';
import { BlockchainOpportunity } from '../../../types';

interface ServicesAndComplianceProps {
  initialData?: Partial<BlockchainOpportunity>;
  isLoading?: boolean;
}

export default function ServicesAndCompliance({ initialData, isLoading }: ServicesAndComplianceProps) {
  const services = [
    'Consulting',
    'Architecture Design',
    'Development',
    'Integration',
    'Testing',
    'Security Audit',
    'Training',
    'Support',
    'Maintenance'
  ];

  const complianceStandards = [
    'GDPR',
    'HIPAA',
    'SOC 2',
    'ISO 27001',
    'PCI DSS',
    'KYC/AML',
    'Data Residency',
    'Smart Contract Audit'
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Services & Compliance</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Required Services
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {services.map(service => (
            <div key={service} className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  name="services_required"
                  value={service}
                  defaultChecked={initialData?.services_required?.includes(service)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  disabled={isLoading}
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="text-gray-700">{service}</label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Compliance Requirements
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {complianceStandards.map(standard => (
            <div key={standard} className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  name="compliance_requirements"
                  value={standard}
                  defaultChecked={initialData?.compliance_requirements?.includes(standard)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  disabled={isLoading}
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="text-gray-700">{standard}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}