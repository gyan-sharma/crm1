import React from 'react';
import { AuditLog } from '../../types/audit';
import { formatDate } from '../../utils/formatters';

interface AuditLogViewerProps {
  logs: AuditLog[];
}

export default function AuditLogViewer({ logs }: AuditLogViewerProps) {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {logs.map((log, idx) => (
          <li key={log.id}>
            <div className="relative pb-8">
              {idx !== logs.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                    <span className="text-xs font-medium text-white">
                      {log.action.charAt(0).toUpperCase()}
                    </span>
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">
                        {log.action.replace('_', ' ').toUpperCase()}
                      </span>{' '}
                      {log.entity_type} ({log.entity_id})
                    </p>
                    {log.details.changes && (
                      <div className="mt-2 text-sm text-gray-500">
                        <pre className="whitespace-pre-wrap">
                          {JSON.stringify(log.details.changes, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={log.timestamp}>{formatDate(log.timestamp)}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}