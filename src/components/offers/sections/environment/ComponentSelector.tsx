import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { PricingComponent } from '../../../../types/pricing';
import { useDebounce } from '../../../../hooks/useDebounce';
import { usePricingComponents } from '../../../../hooks/usePricingComponents';

interface ComponentSelectorProps {
  selectedComponent: PricingComponent | undefined;
  selectedType: string;
  selectedSize: string;
  onComponentSelect: (component: PricingComponent) => void;
  onTypeSelect: (type: string) => void;
  onSizeSelect: (size: string) => void;
  isLoading?: boolean;
}

export default function ComponentSelector({
  selectedComponent,
  selectedType,
  selectedSize,
  onComponentSelect,
  onTypeSelect,
  onSizeSelect,
  isLoading
}: ComponentSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const debouncedSearch = useDebounce(searchTerm);
  const { components } = usePricingComponents();

  // Get unique component names
  const uniqueComponents = Array.from(
    new Map(components.map(c => [c.prettyName, c])).values()
  ).sort((a, b) => a.prettyName.localeCompare(b.prettyName));

  // Get unique types and sizes
  const types = Array.from(new Set(components.map(c => c.type))).sort();
  const sizes = Array.from(new Set(components.map(c => c.size))).sort();

  // Filter components based on search term
  const filteredComponents = debouncedSearch
    ? uniqueComponents.filter(c => 
        c.prettyName.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : uniqueComponents;

  const handleComponentSelect = (component: PricingComponent) => {
    onComponentSelect(component);
    setShowResults(false);
    setSearchTerm(component.prettyName);
  };

  const handleTypeChange = (type: string) => {
    onTypeSelect(type);
    // Update monthly price based on selected component, type, and size
    if (selectedComponent) {
      const matchingComponent = components.find(c => 
        c.prettyName === selectedComponent.prettyName && 
        c.type === type && 
        c.size === selectedSize
      );
      if (matchingComponent) {
        onComponentSelect(matchingComponent);
      }
    }
  };

  const handleSizeChange = (size: string) => {
    onSizeSelect(size);
    // Update monthly price based on selected component, type, and size
    if (selectedComponent) {
      const matchingComponent = components.find(c => 
        c.prettyName === selectedComponent.prettyName && 
        c.type === selectedType && 
        c.size === size
      );
      if (matchingComponent) {
        onComponentSelect(matchingComponent);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Component Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Component
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            placeholder="Search components..."
            className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={isLoading}
          />
        </div>
        {showResults && debouncedSearch && (
          <div className="absolute z-10 mt-1 w-full max-h-48 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg">
            {filteredComponents.map(component => (
              <div
                key={component.id}
                onClick={() => handleComponentSelect(component)}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                  selectedComponent?.prettyName === component.prettyName ? 'bg-indigo-50' : ''
                }`}
              >
                <div className="font-medium">{component.prettyName}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Type and Size Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={isLoading}
          >
            <option value="">Select Type</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Size
          </label>
          <select
            value={selectedSize}
            onChange={(e) => handleSizeChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={isLoading}
          >
            <option value="">Select Size</option>
            {sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}