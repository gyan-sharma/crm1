import React from 'react';
import { Environment } from '../../../types/offers';
import EnvironmentComponent from './EnvironmentComponent';

interface PlatformLicenseSectionProps {
  environments: Environment[];
  onEnvironmentsChange: (environments: Environment[]) => void;
  paymentTerms: string;
  onPaymentTermsChange: (terms: string) => void;
  isLoading?: boolean;
}

export default function PlatformLicenseSection({
  environments,
  onEnvironmentsChange,
  paymentTerms,
  onPaymentTermsChange,
  isLoading
}: PlatformLicenseSectionProps) {
  const paymentTermsOptions = [
    'Monthly in advance',
    'Quarterly in advance',
    'Annually in advance',
    'Custom'
  ];

  const [customTerms, setCustomTerms] = React.useState('');

  const handlePaymentTermsChange = (value: string) => {
    onPaymentTermsChange(value === 'Custom' ? customTerms : value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Platform License</h3>
        <div className="w-64">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Terms
          </label>
          {paymentTerms === 'Custom' ? (
            <div className="flex space-x-2">
              <input
                type="text"
                value={customTerms}
                onChange={(e) => setCustomTerms(e.target.value)}
                placeholder="Enter custom payment terms"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => onPaymentTermsChange(customTerms)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                disabled={!customTerms || isLoading}
              >
                Set
              </button>
            </div>
          ) : (
            <select
              value={paymentTerms}
              onChange={(e) => handlePaymentTermsChange(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {paymentTermsOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      <EnvironmentComponent
        environments={environments}
        onEnvironmentsChange={onEnvironmentsChange}
        isLoading={isLoading}
      />
    </div>
  );
}