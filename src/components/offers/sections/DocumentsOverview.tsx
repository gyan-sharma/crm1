import React from 'react';
import { FileText, Link as LinkIcon, Download } from 'lucide-react';
import { OfferDocument } from '../../../types/offers';
import { downloadDocument } from '../../../lib/documents';
import { toast } from 'sonner';

interface DocumentsOverviewProps {
  rfpDocuments: OfferDocument[];
  proposalDocuments: OfferDocument[];
  otherDocuments: OfferDocument[];
}

export default function DocumentsOverview({ 
  rfpDocuments = [], 
  proposalDocuments = [], 
  otherDocuments = [] 
}: DocumentsOverviewProps) {
  const handleDownload = async (doc: OfferDocument) => {
    try {
      await downloadDocument(doc);
      toast.success(doc.url ? 'Opening document' : 'Downloading document');
    } catch (error) {
      console.error('Error handling document:', error);
      toast.error('Failed to handle document');
    }
  };

  const renderDocumentList = (documents: OfferDocument[], title: string) => {
    if (!documents?.length) return null;

    return (
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-900">{title}</h4>
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
              <button
                onClick={() => handleDownload(doc)}
                className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900"
              >
                <Download className="h-4 w-4 mr-1" />
                {doc.url ? 'Open' : 'Download'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderDocumentList(rfpDocuments, 'RFP/Tender Documents')}
      {renderDocumentList(proposalDocuments, 'Proposal Documents')}
      {renderDocumentList(otherDocuments, 'Additional Documents')}
      {!rfpDocuments.length && !proposalDocuments.length && !otherDocuments.length && (
        <div className="text-sm text-gray-500 italic">
          No documents available
        </div>
      )}
    </div>
  );
}