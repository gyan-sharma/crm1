import React from 'react';

interface CommercialTermsProps {
  contractMonths: number;
  onContractMonthsChange: (months: number) => void;
  paymentTerms: string;
  onPaymentTermsChange: (terms: string) => void;
  isLoading?: boolean;
}

export default function CommercialTerms({
  contractMonths,
  onContractMonthsChange,
  paymentTerms,
  onPaymentTermsChange,
  isLoading
}: CommercialTermsProps) {
  const paymentTermsOptions = [
    'Monthly in advance',
    'Quarterly in advance',
    'Annually in advance',
    'Custom'
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Commercial Terms</h3>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contract Duration (Months)
          </label>
          <input
            type="number"
            min="1"
            value={contractMonths}
            onChange={(e) => onContractMonthsChange(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Terms
          </label>
          <select
            value={paymentTerms}
            onChange={(e) => onPaymentTermsChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {paymentTermsOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}