import React, { useState } from 'react';
import { ServiceComponent } from '../../../types/offers';
import ServicesList from './ServicesList';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface ServicesSectionProps {
  services: ServiceComponent[];
  onServicesChange: (services: ServiceComponent[]) => void;
  deliveryDuration: number;
  onDeliveryDurationChange: (months: number) => void;
  paymentTerms: string;
  onPaymentTermsChange: (terms: string) => void;
  isLoading?: boolean;
}

export default function ServicesSection({
  services,
  onServicesChange,
  deliveryDuration,
  onDeliveryDurationChange,
  paymentTerms,
  onPaymentTermsChange,
  isLoading
}: ServicesSectionProps) {
  const [subcontractorName, setSubcontractorName] = useState('');
  const [subcontractorContact, setSubcontractorContact] = useState('');
  const [documents, setDocuments] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setDocuments(prev => [...prev, ...acceptedFiles]);
    }
  });

  const paymentTermsOptions = [
    'On completion',
    '50% advance, 50% on completion',
    '30% advance, 70% on completion',
    'Monthly based on progress',
    'Custom'
  ];

  const [customTerms, setCustomTerms] = useState('');

  const handlePaymentTermsChange = (value: string) => {
    onPaymentTermsChange(value === 'Custom' ? customTerms : value);
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Professional Services</h3>

      <div className="space-y-6">
        {/* Duration and Payment Terms */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Delivery Duration (Months)
            </label>
            <input
              type="number"
              min="1"
              value={deliveryDuration}
              onChange={(e) => onDeliveryDurationChange(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Terms
            </label>
            {paymentTerms === 'Custom' ? (
              <div className="mt-1 flex space-x-2">
                <input
                  type="text"
                  value={customTerms}
                  onChange={(e) => setCustomTerms(e.target.value)}
                  placeholder="Enter custom payment terms"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => onPaymentTermsChange(customTerms)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  disabled={!customTerms || isLoading}
                >
                  Set
                </button>
              </div>
            ) : (
              <select
                value={paymentTerms}
                onChange={(e) => handlePaymentTermsChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                disabled={isLoading}
              >
                {paymentTermsOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Subcontractor Information */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Subcontractor Details</h4>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subcontractor Name
              </label>
              <input
                type="text"
                value={subcontractorName}
                onChange={(e) => setSubcontractorName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Details
              </label>
              <input
                type="text"
                value={subcontractorContact}
                onChange={(e) => setSubcontractorContact(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Subcontractor Documents */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Subcontractor Proposal Documents
          </h4>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:border-indigo-400'}`}
          >
            <input {...getInputProps()} disabled={isLoading} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drop subcontractor proposal documents here
            </p>
          </div>

          {documents.length > 0 && (
            <ul className="mt-4 divide-y divide-gray-200">
              {documents.map((doc, index) => (
                <li key={index} className="py-3 flex justify-between items-center">
                  <span className="text-sm text-gray-900">{doc.name}</span>
                  <button
                    onClick={() => removeDocument(index)}
                    className="text-sm text-red-600 hover:text-red-900"
                    disabled={isLoading}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Services List */}
        <ServicesList
          services={services}
          onServicesChange={onServicesChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}