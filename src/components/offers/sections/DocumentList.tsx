import React from 'react';
import { Link as LinkIcon, FileText, X } from 'lucide-react';
import { OfferDocument } from '../../../types/offers';

interface DocumentListProps {
  documents: OfferDocument[];
  onRemove: (id: string) => void;
  isLoading?: boolean;
}

export default function DocumentList({ documents, onRemove, isLoading }: DocumentListProps) {
  if (documents.length === 0) return null;

  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium text-gray-900 mb-2">Added Documents</h4>
      <ul className="divide-y divide-gray-200">
        {documents.map((doc) => (
          <li key={doc.id} className="py-3 flex justify-between items-center">
            <div className="flex items-center">
              {doc.url ? (
                <LinkIcon className="h-5 w-5 text-gray-400 mr-2" />
              ) : (
                <FileText className="h-5 w-5 text-gray-400 mr-2" />
              )}
              <span className="text-sm font-medium text-gray-900">{doc.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              {doc.url && (
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  View
                </a>
              )}
              <button
                onClick={() => onRemove(doc.id)}
                className="text-sm text-red-600 hover:text-red-900"
                disabled={isLoading}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}