import React from 'react';
import { CalendarRange } from 'lucide-react';

export type Period = 'week' | 'month' | 'quarter' | 'year';

interface PeriodSelectorProps {
  value: Period;
  onChange: (period: Period) => void;
}

export default function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  const periods: { value: Period; label: string }[] = [
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'quarter', label: 'Quarter' },
    { value: 'year', label: 'Year' }
  ];

  return (
    <div className="flex items-center space-x-2">
      <CalendarRange className="h-5 w-5 text-gray-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Period)}
        className="block w-40 rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        {periods.map(period => (
          <option key={period.value} value={period.value}>
            vs Previous {period.label}
          </option>
        ))}
      </select>
    </div>
  );
}