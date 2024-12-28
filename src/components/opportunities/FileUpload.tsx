import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { Attachment } from '../../types';

interface FileUploadProps {
  opportunityId?: string;
  onFileSelect: (files: File[]) => void;
  onFileRemove: (file: File) => void;
  onAttachmentDelete: (attachmentId: string) => void;
  pendingFiles: File[];
  existingAttachments: Attachment[];
}

export default function FileUpload({ 
  onFileSelect, 
  onFileRemove, 
  onAttachmentDelete,
  pendingFiles,
  existingAttachments 
}: FileUploadProps) {
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    onFileSelect(acceptedFiles);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop files here, or click to select files
        </p>
      </div>

      {(existingAttachments.length > 0 || pendingFiles.length > 0) && (
        <ul className="divide-y divide-gray-200">
          {existingAttachments.map((attachment) => (
            <li key={attachment.id} className="py-3 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">{attachment.filename}</span>
                <span className="ml-2 text-sm text-gray-500">
                  ({(attachment.file_size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                type="button"
                onClick={() => onAttachmentDelete(attachment.id)}
                className="text-red-600 hover:text-red-900"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
          {pendingFiles.map((file, index) => (
            <li key={index} className="py-3 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">{file.name}</span>
                <span className="ml-2 text-sm text-gray-500">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
                <span className="ml-2 text-xs text-indigo-600">(New)</span>
              </div>
              <button
                type="button"
                onClick={() => onFileRemove(file)}
                className="text-red-600 hover:text-red-900"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}