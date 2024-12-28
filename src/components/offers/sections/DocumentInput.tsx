import React, { useState } from 'react';

interface DocumentInputProps {
  onAdd: (name: string, url: string) => void;
  placeholder: string;
  label: string;
  isLoading?: boolean;
}

export default function DocumentInput({
  onAdd,
  placeholder,
  label,
  isLoading
}: DocumentInputProps) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const handleAdd = () => {
    if (name && url) {
      onAdd(name, url);
      setName('');
      setUrl('');
    }
  };

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-900 mb-2">{label}</h4>
      <div className="space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter document name"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        />
        <div className="flex space-x-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={placeholder}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={!name || !url || isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}