import React from 'react';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import DocumentInput from './DocumentInput';
import DocumentList from './DocumentList';

interface Document {
  id: string;
  type: 'file' | 'link';
  name: string;
  url?: string;
}

interface RfpDocumentsSectionProps {
  documents: Document[];
  onDocumentAdd: (doc: Omit<Document, 'id'>) => void;
  onDocumentRemove: (id: string) => void;
  isLoading?: boolean;
}

export default function RfpDocumentsSection({
  documents,
  onDocumentAdd,
  onDocumentRemove,
  isLoading
}: RfpDocumentsSectionProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (files) => {
      const file = files[0];
      if (file) {
        onDocumentAdd({
          type: 'file',
          name: file.name
        });
      }
    }
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Customer RFP/Tender Documents</h3>

      <div className="grid grid-cols-2 gap-6">
        {/* File Upload */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Upload RFP Documents</h4>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:border-indigo-400'}`}
          >
            <input {...getInputProps()} disabled={isLoading} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drop RFP or tender documents here
            </p>
          </div>
        </div>

        {/* Document Links */}
        <DocumentInput
          onAdd={(name, url) => onDocumentAdd({ type: 'link', name, url })}
          placeholder="Enter document URL"
          label="Add Document Link"
          isLoading={isLoading}
        />
      </div>

      <DocumentList
        documents={documents}
        onRemove={onDocumentRemove}
        isLoading={isLoading}
      />
    </div>
  );
}