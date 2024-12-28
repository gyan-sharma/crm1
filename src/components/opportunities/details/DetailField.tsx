import React from 'react';

interface DetailFieldProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export default function DetailField({ label, value, className = "sm:col-span-1" }: DetailFieldProps) {
  return (
    <div className={className}>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
}