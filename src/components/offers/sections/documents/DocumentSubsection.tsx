```tsx
import React from 'react';
import { OfferDocument } from '../../../../types/offers';
import DocumentUpload from './DocumentUpload';
import DocumentInput from './DocumentInput';
import DocumentList from './DocumentList';

interface DocumentSubsectionProps {
  title: string;
  description: string;
  documents: OfferDocument[];
  onDocumentAdd: (doc: Omit<OfferDocument, 'id' | 'type'>) => void;
  onDocumentRemove: (id: string) => void;
  isLoading?: boolean;
}

export default function DocumentSubsection({
  title,
  description,
  documents,
  onDocumentAdd,
  onDocumentRemove,
  isLoading
}: DocumentSubsectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* File Upload */}
        <DocumentUpload
          onFileSelect={(file) => onDocumentAdd({ 
            name: file.name,
            file,
            created_at: new Date().toISOString()
          })}
          isLoading={isLoading}
        />

        {/* Document Link Input */}
        <DocumentInput
          onSubmit={(name, url) => onDocumentAdd({
            name,
            url,
            created_at: new Date().toISOString()
          })}
          isLoading={isLoading}
        />
      </div>

      {/* Document List */}
      <DocumentList
        documents={documents}
        onRemove={onDocumentRemove}
        isLoading={isLoading}
      />
    </div>
  );
}
```