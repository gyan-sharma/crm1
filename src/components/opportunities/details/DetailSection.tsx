import React from 'react';

interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        {children}
      </div>
    </div>
  );
}