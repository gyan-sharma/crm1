import React, { useState } from 'react';
import { Upload, Link as LinkIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { OfferDocument } from '../../../types/reviews';

interface DocumentUploadProps {
  documents: OfferDocument[];
  onDocumentAdd: (doc: Omit<OfferDocument, 'id' | 'created_at'>) => Promise<void>;
  isLoading?: boolean;
}

export default function DocumentUpload({ documents, onDocumentAdd, isLoading }: DocumentUploadProps) {
  const [driveUrl, setDriveUrl] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        await onDocumentAdd({
          offerId: '',  // Will be set by parent
          type: 'proposal',
          name: file.name,
          file
        });
      }
    }
  });

  const handleDriveUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (driveUrl) {
      await onDocumentAdd({
        offerId: '',  // Will be set by parent
        type: 'other',
        name: 'Google Drive Folder',
        url: driveUrl
      });
      setDriveUrl('');
    }
  };

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Upload Documents</h4>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop files here, or click to select files
          </p>
        </div>
      </div>

      {/* Drive URL Input */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Google Drive Link</h4>
        <form onSubmit={handleDriveUrlSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LinkIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              value={driveUrl}
              onChange={(e) => setDriveUrl(e.target.value)}
              placeholder="Enter Google Drive folder URL"
              className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={!driveUrl || isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Add Link
          </button>
        </form>
      </div>

      {/* Document List */}
      {documents.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Uploaded Documents</h4>
          <ul className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <li key={doc.id} className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  {doc.url ? <LinkIcon className="h-5 w-5 text-gray-400 mr-2" /> : 
                           <Upload className="h-5 w-5 text-gray-400 mr-2" />}
                  <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                </div>
                {doc.url && (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:text-indigo-900"
                  >
                    Open
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}