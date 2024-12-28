import React, { useState } from 'react';
import { Edit2, Trash2, Check, X, Search } from 'lucide-react';
import { usePricingComponents } from '../../../../hooks/usePricingComponents';
import { useDebounce } from '../../../../hooks/useDebounce';
import { toTitleCase } from '../../../../utils/formatters';

interface ComponentRowProps {
  component: {
    id: string;
    pricingComponentId: string;
    type: string;
    size: string;
    quantity: number;
    monthlyPrice: number;
  };
  onUpdate: (updates: any) => void;
  onRemove: () => void;
  isLoading?: boolean;
  isNew?: boolean;
}

export default function ComponentRow({ component, onUpdate, onRemove, isLoading, isNew }: ComponentRowProps) {
  const { components: pricingComponents } = usePricingComponents();
  const [isEditing, setIsEditing] = useState(isNew);
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const debouncedSearch = useDebounce(searchTerm);
  
  // Find selected component details
  const selectedComponent = pricingComponents.find(p => p.id === component.pricingComponentId);

  // Calculate total based on current price and quantity
  const total = Math.ceil(component.monthlyPrice * component.quantity);

  // Get unique component names
  const uniqueComponents = Array.from(
    new Map(pricingComponents.map(c => [c.prettyName, c])).values()
  ).sort((a, b) => a.prettyName.localeCompare(b.prettyName));

  // Get unique types and sizes in title case
  const types = Array.from(new Set(pricingComponents.map(c => toTitleCase(c.type)))).sort();
  const sizes = Array.from(new Set(pricingComponents.map(c => toTitleCase(c.size)))).sort();

  // Filter components based on search
  const filteredComponents = debouncedSearch
    ? uniqueComponents.filter(c => 
        c.prettyName.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : uniqueComponents;

  const updateComponentPrice = (updates: any) => {
    if (selectedComponent) {
      // Find matching component with updated configuration
      const matchingComponent = pricingComponents.find(c => 
        c.prettyName === selectedComponent.prettyName && 
        c.type === (updates.type || component.type).toUpperCase() && 
        c.size === (updates.size || component.size).toUpperCase()
      );

      if (matchingComponent) {
        onUpdate({
          ...updates,
          pricingComponentId: matchingComponent.id,
          monthlyPrice: Math.ceil(matchingComponent.monthlyPrice)
        });
      } else {
        onUpdate(updates);
      }
    } else {
      onUpdate(updates);
    }
  };

  const handleComponentSelect = (comp: any) => {
    updateComponentPrice({
      pricingComponentId: comp.id,
      type: comp.type,
      size: comp.size,
      monthlyPrice: Math.ceil(comp.monthlyPrice)
    });
    setShowResults(false);
    setSearchTerm(comp.prettyName);
  };

  const handleTypeChange = (type: string) => {
    updateComponentPrice({ type: type.toUpperCase() });
  };

  const handleSizeChange = (size: string) => {
    updateComponentPrice({ size: size.toUpperCase() });
  };

  const handleQuantityChange = (quantity: number) => {
    updateComponentPrice({ quantity });
  };

  const handleConfirm = () => {
    if (component.pricingComponentId && component.type && component.size) {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <tr className="bg-gray-50">
        <td className="py-2 px-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
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
              className="block w-full pl-8 pr-3 py-1.5 text-sm rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              disabled={isLoading}
            />
            {showResults && debouncedSearch && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-auto">
                {filteredComponents.map(comp => (
                  <div
                    key={comp.id}
                    onClick={() => handleComponentSelect(comp)}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-50 text-sm"
                  >
                    {comp.prettyName}
                  </div>
                ))}
              </div>
            )}
          </div>
        </td>
        <td className="py-2 px-3">
          <select
            value={toTitleCase(component.type)}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isLoading}
          >
            <option value="">Select Type</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </td>
        <td className="py-2 px-3">
          <select
            value={toTitleCase(component.size)}
            onChange={(e) => handleSizeChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isLoading}
          >
            <option value="">Select Size</option>
            {sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </td>
        <td className="py-2 px-3">
          <input
            type="number"
            min="1"
            value={component.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            className="block w-20 rounded-md border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isLoading}
          />
        </td>
        <td className="py-2 px-3">€{Math.ceil(component.monthlyPrice).toLocaleString()}</td>
        <td className="py-2 px-3">€{total.toLocaleString()}</td>
        <td className="py-2 px-3">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!component.pricingComponentId || !component.type || !component.size || isLoading}
              className="text-green-600 hover:text-green-900"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="text-red-600 hover:text-red-900"
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-2 px-3">{selectedComponent?.prettyName}</td>
      <td className="py-2 px-3">{toTitleCase(component.type)}</td>
      <td className="py-2 px-3">{toTitleCase(component.size)}</td>
      <td className="py-2 px-3">{component.quantity}</td>
      <td className="py-2 px-3">€{Math.ceil(component.monthlyPrice).toLocaleString()}</td>
      <td className="py-2 px-3">€{total.toLocaleString()}</td>
      <td className="py-2 px-3">
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-indigo-600 hover:text-indigo-900"
            disabled={isLoading}
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="text-red-600 hover:text-red-900"
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}