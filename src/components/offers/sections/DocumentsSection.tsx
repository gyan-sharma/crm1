import React, { useState } from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { OfferDocument } from '../../../types/offers';
import { toast } from 'sonner';

interface DocumentsSectionProps {
  documents: OfferDocument[];
  onDocumentAdd: (doc: Omit<OfferDocument, 'id'>) => void;
  onDocumentRemove: (id: string) => void;
  isLoading?: boolean;
}

export default function DocumentsSection({
  documents,
  onDocumentAdd,
  onDocumentRemove,
  isLoading
}: DocumentsSectionProps) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState<OfferDocument['type']>('other');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && url) {
      try {
        // Validate URL
        new URL(url);
        
        onDocumentAdd({
          type,
          name: name.trim(),
          url: url.trim(),
          created_at: new Date().toISOString()
        });
        
        setName('');
        setUrl('');
      } catch (error) {
        toast.error('Please enter a valid URL');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Document Links</h3>

      {/* Add Document Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="doc-type" className="block text-sm font-medium text-gray-700">
              Document Type
            </label>
            <select
              id="doc-type"
              value={type}
              onChange={(e) => setType(e.target.value as OfferDocument['type'])}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              disabled={isLoading}
            >
              <option value="rfp">RFP/Tender</option>
              <option value="proposal">Proposal</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="doc-name" className="block text-sm font-medium text-gray-700">
              Document Name
            </label>
            <input
              id="doc-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter document name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="doc-url" className="block text-sm font-medium text-gray-700">
              Document URL
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <div className="relative flex flex-grow items-stretch focus-within:z-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="doc-url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={!name || !url || isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Add Document Link
            </button>
          </div>
        </div>
      </form>

      {/* Document List */}
      {documents.length > 0 ? (
        <div className="space-y-4">
          {['rfp', 'proposal', 'other'].map((docType) => {
            const typeDocuments = documents.filter(doc => doc.type === docType);
            if (typeDocuments.length === 0) return null;

            return (
              <div key={docType}>
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  {docType === 'rfp' ? 'RFP/Tender Documents' :
                   docType === 'proposal' ? 'Proposal Documents' :
                   'Other Documents'}
                </h4>
                <ul className="divide-y divide-gray-200">
                  {typeDocuments.map((doc) => (
                    <li key={doc.id} className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <LinkIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-indigo-600 hover:text-indigo-900"
                        >
                          Open
                        </a>
                        <button
                          onClick={() => onDocumentRemove(doc.id)}
                          className="text-sm text-red-600 hover:text-red-900"
                          disabled={isLoading}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center">
          No document links added yet
        </p>
      )}
    </div>
  );
}