import React from 'react';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

interface DocumentUploadProps {
  title: string;
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

export default function DocumentUpload({
  title,
  onFileSelect,
  isLoading
}: DocumentUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        try {
          onFileSelect(file);
          toast.success(`File "${file.name}" added successfully`);
        } catch (error) {
          console.error('Error handling file:', error);
          toast.error('Failed to add file');
        }
      }
    },
    multiple: false,
    noClick: isLoading
  });

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-900 mb-2">{title}</h4>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} disabled={isLoading} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drop file here or click to select
        </p>
      </div>
    </div>
  );
}