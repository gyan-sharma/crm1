import React from 'react';
import { formatDate } from '../../utils/formatters';

interface AuditLogDetailsProps {
  details: Record<string, any>;
}

export default function AuditLogDetails({ details }: AuditLogDetailsProps) {
  const renderValue = (value: any): React.ReactNode => {
    if (value === null || value === undefined) {
      return <span className="text-gray-400 italic">Not set</span>;
    }

    if (typeof value === 'object') {
      return <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(value, null, 2)}</pre>;
    }

    return String(value);
  };

  const renderChange = (field: string, change: { old: any; new: any }) => (
    <div key={field} className="border-l-4 border-indigo-200 pl-4 py-3">
      <div className="font-medium text-gray-900 mb-2">
        {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Previous Value</div>
          <div className="bg-red-50 text-red-800 rounded-md p-2 font-mono text-sm">
            {renderValue(change.old)}
          </div>
        </div>
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">New Value</div>
          <div className="bg-green-50 text-green-800 rounded-md p-2 font-mono text-sm">
            {renderValue(change.new)}
          </div>
        </div>
      </div>
    </div>
  );

  if (!details || Object.keys(details).length === 0) {
    return <div className="text-gray-500 italic">No additional details available</div>;
  }

  return (
    <div className="space-y-6">
      {details.changes ? (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Changes Made</h4>
          <div className="space-y-4">
            {Object.entries(details.changes).map(([field, change]) => 
              renderChange(field, change as { old: any; new: any })
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className="flex items-start">
              <span className="text-sm font-medium text-gray-900 min-w-[150px]">
                {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
              </span>
              <span className="text-sm text-gray-700 ml-4">
                {renderValue(value)}
              </span>
            </div>
          ))}
        </div>
      )}
      
      {details.performed_by && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Action performed by{' '}
            <span className="font-medium text-gray-900">{details.performed_by.name}</span>
            {' '}({details.performed_by.email})
          </div>
        </div>
      )}
    </div>
  );
}