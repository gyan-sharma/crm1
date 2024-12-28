import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { OfferDocument } from '../../../types/reviews';
import db from '../../../lib/db';

interface ProposalDocumentsProps {
  offerId: string;
  isLoading?: boolean;
}

export default function ProposalDocuments({ offerId, isLoading }: ProposalDocumentsProps) {
  const [documents, setDocuments] = React.useState<OfferDocument[]>([]);

  React.useEffect(() => {
    loadDocuments();
  }, [offerId]);

  const loadDocuments = async () => {
    const docs = await db.offerDocuments
      .where({ offerId, type: 'proposal' })
      .toArray();
    setDocuments(docs);
  };

  const handleUpload = async (files: File[]) => {
    try {
      const newDocs = await Promise.all(files.map(async (file) => {
        const doc: OfferDocument = {
          id: crypto.randomUUID(),
          offerId,
          type: 'proposal',
          name: file.name,
          file,
          created_at: new Date().toISOString()
        };
        await db.offerDocuments.add(doc);
        return doc;
      }));

      setDocuments(prev => [...prev, ...newDocs]);
    } catch (error) {
      console.error('Error uploading documents:', error);
    }
  };

  const handleDelete = async (docId: string) => {
    try {
      await db.offerDocuments.delete(docId);
      setDocuments(prev => prev.filter(doc => doc.id !== docId));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleUpload
  });

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Submitted Proposal Documents</h4>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Upload technical proposal, commercial proposal, and platform configuration
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Supported formats: PDF, DOCX, XLSX
          </p>
        </div>
      </div>

      {documents.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">Uploaded Documents</h5>
          <ul className="divide-y divide-gray-200">
            {documents.map(doc => (
              <li key={doc.id} className="py-3 flex justify-between items-center">
                <span className="text-sm text-gray-900">{doc.name}</span>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}