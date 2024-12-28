```tsx
import React from 'react';
import { OfferDocument } from '../../../../types/offers';
import DocumentSubsection from './DocumentSubsection';

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
  // Group documents by type
  const rfpDocuments = documents.filter(doc => doc.type === 'rfp');
  const proposalDocuments = documents.filter(doc => doc.type === 'proposal');
  const otherDocuments = documents.filter(doc => doc.type === 'other');

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Documents & Links</h3>

      <div className="space-y-8">
        {/* RFP/Tender Documents */}
        <DocumentSubsection
          title="RFP/Tender Documents and Links"
          description="Upload RFP documents or add links to tender documentation"
          documents={rfpDocuments}
          onDocumentAdd={(doc) => onDocumentAdd({ ...doc, type: 'rfp' })}
          onDocumentRemove={onDocumentRemove}
          isLoading={isLoading}
        />

        {/* Sub-Contractor Documents */}
        <DocumentSubsection
          title="Sub-Contractor Proposal Documents and Links"
          description="Upload sub-contractor proposals or add links to their documentation"
          documents={proposalDocuments}
          onDocumentAdd={(doc) => onDocumentAdd({ ...doc, type: 'proposal' })}
          onDocumentRemove={onDocumentRemove}
          isLoading={isLoading}
        />

        {/* SettleMint Documents */}
        <DocumentSubsection
          title="SettleMint Offer Documents and Links"
          description="Upload SettleMint offer documents or add document links"
          documents={otherDocuments}
          onDocumentAdd={(doc) => onDocumentAdd({ ...doc, type: 'other' })}
          onDocumentRemove={onDocumentRemove}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
```