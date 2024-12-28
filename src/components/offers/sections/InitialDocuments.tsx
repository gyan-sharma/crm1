import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { OfferDocument } from '../../../types/reviews';
import db from '../../../lib/db';

interface InitialDocumentsProps {
  offerId: string;
  isLoading?: boolean;
}

export default function InitialDocuments({ offerId, isLoading }: InitialDocumentsProps) {
  const [rfpDocuments, setRfpDocuments] = React.useState<OfferDocument[]>([]);
  const [emailDocuments, setEmailDocuments] = React.useState<OfferDocument[]>([]);

  const handleUpload = async (files: File[], type: 'rfp' | 'email') => {
    try {
      const newDocs = await Promise.all(files.map(async (file) => {
        const doc: OfferDocument = {
          id: crypto.randomUUID(),
          offerId,
          type: type === 'rfp' ? 'rfp' : 'other',
          name: file.name,
          file,
          created_at: new Date().toISOString()
        };
        await db.offerDocuments.add(doc);
        return doc;
      }));

      if (type === 'rfp') {
        setRfpDocuments(prev => [...prev, ...newDocs]);
      } else {
        setEmailDocuments(prev => [...prev, ...newDocs]);
      }
    } catch (error) {
      console.error('Error uploading documents:', error);
    }
  };

  const handleDelete = async (docId: string, type: 'rfp' | 'email') => {
    try {
      await db.offerDocuments.delete(docId);
      if (type === 'rfp') {
        setRfpDocuments(prev => prev.filter(doc => doc.id !== docId));
      } else {
        setEmailDocuments(prev => prev.filter(doc => doc.id !== docId));
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const RfpDropzone = () => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: files => handleUpload(files, 'rfp')
    });

    return (
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">RFP/Tender Documents</h4>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Upload RFP or tender documents
          </p>
        </div>
      </div>
    );
  };

  const EmailDropzone = () => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: files => handleUpload(files, 'email')
    });

    return (
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Customer Communication</h4>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Upload customer communication PDFs
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <RfpDropzone />
      {rfpDocuments.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">Uploaded RFP Documents</h5>
          <ul className="divide-y divide-gray-200">
            {rfpDocuments.map(doc => (
              <li key={doc.id} className="py-3 flex justify-between items-center">
                <span className="text-sm text-gray-900">{doc.name}</span>
                <button
                  onClick={() => handleDelete(doc.id, 'rfp')}
                  className="text-red-600 hover:text-red-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <EmailDropzone />
      {emailDocuments.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">Uploaded Communication</h5>
          <ul className="divide-y divide-gray-200">
            {emailDocuments.map(doc => (
              <li key={doc.id} className="py-3 flex justify-between items-center">
                <span className="text-sm text-gray-900">{doc.name}</span>
                <button
                  onClick={() => handleDelete(doc.id, 'email')}
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