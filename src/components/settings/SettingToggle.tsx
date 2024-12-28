import React from 'react';
import { Circle } from 'lucide-react';

interface SettingToggleProps {
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export default function SettingToggle({ 
  label, 
  description, 
  value, 
  onChange, 
  disabled 
}: SettingToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium text-gray-900">{label}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        disabled={disabled}
        className={`${
          value ? 'bg-indigo-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span
          className={`${
            value ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        >
          <Circle className="h-3 w-3 text-gray-400 absolute top-1 left-1" />
        </span>
      </button>
    </div>
  );
}