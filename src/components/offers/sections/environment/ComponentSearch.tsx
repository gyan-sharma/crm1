import React, { useState } from 'react';
import { Search, Check, X } from 'lucide-react';
import { PricingComponent } from '../../../../types/pricing';

interface ComponentSearchProps {
  onSelect: (component: PricingComponent) => void;
  onCancel: () => void;
  components: PricingComponent[];
  isLoading?: boolean;
}

export default function ComponentSearch({ onSelect, onCancel, components, isLoading }: ComponentSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComponent, setSelectedComponent] = useState<PricingComponent | null>(null);

  const filteredComponents = searchTerm
    ? components.filter(comp => 
        comp.prettyName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : components;

  const handleSelect = (component: PricingComponent) => {
    setSelectedComponent(component);
  };

  const handleConfirm = () => {
    if (selectedComponent) {
      onSelect(selectedComponent);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search components..."
          className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        />
      </div>

      <div className="max-h-48 overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Name</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Type</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Size</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredComponents.map(component => (
              <tr
                key={component.id}
                onClick={() => handleSelect(component)}
                className={`cursor-pointer hover:bg-gray-50 ${
                  selectedComponent?.id === component.id ? 'bg-indigo-50' : ''
                }`}
              >
                <td className="px-3 py-2 text-sm">{component.prettyName}</td>
                <td className="px-3 py-2 text-sm text-gray-500">{component.type}</td>
                <td className="px-3 py-2 text-sm text-gray-500">{component.size}</td>
                <td className="px-3 py-2 text-sm text-right">€{component.monthlyPrice.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end space-x-2 pt-2 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <X className="h-4 w-4 mr-1" />
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!selectedComponent}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          <Check className="h-4 w-4 mr-1" />
          Confirm
        </button>
      </div>
    </div>
  );
}