import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { AuditLog } from '../../types/audit';
import { formatDate } from '../../utils/formatters';
import AuditLogDetails from './AuditLogDetails';
import { useUserNames } from '../../hooks/useUserNames';

interface AuditLogTableRowProps {
  log: AuditLog;
}

export default function AuditLogTableRow({ log }: AuditLogTableRowProps) {
  const [showDetails, setShowDetails] = useState(false);
  const { getUserName } = useUserNames();

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(log.timestamp)}
        </td>
        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
          {getUserName(log.user_id)}
        </td>
        <td className="px-3 py-4 whitespace-nowrap text-sm">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getActionColor(log.action)}`}>
            {formatAction(log.action)}
          </span>
        </td>
        <td className="px-3 py-4 whitespace-nowrap text-sm">
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">
              {log.entity_type.toUpperCase()}
            </span>
            <span className="text-gray-500 text-xs font-mono">
              {log.entity_id}
            </span>
          </div>
        </td>
        <td className="px-3 py-4 text-sm text-gray-500">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </button>
        </td>
      </tr>
      {showDetails && (
        <tr className="bg-gray-50">
          <td colSpan={5} className="px-3 py-4">
            <div className="text-sm text-gray-900">
              <AuditLogDetails details={log.details} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function getActionColor(action: string): string {
  switch (action) {
    case 'create':
      return 'bg-green-100 text-green-800';
    case 'update':
      return 'bg-blue-100 text-blue-800';
    case 'delete':
      return 'bg-red-100 text-red-800';
    case 'restore':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function formatAction(action: string): string {
  return action.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}