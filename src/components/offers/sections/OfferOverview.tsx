import React from 'react';

interface OfferOverviewProps {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

export default function OfferOverview({ value, onChange, isLoading }: OfferOverviewProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Offer Overview</h3>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        disabled={isLoading}
        placeholder="Provide a comprehensive overview of the offer and solution..."
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  );
}