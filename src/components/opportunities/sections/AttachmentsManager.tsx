import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Attachment } from '../../../types';
import { getAttachments, deleteAttachment } from '../../../lib/attachments';
import { toast } from 'sonner';

interface AttachmentsManagerProps {
  opportunityId?: string;
  isLoading?: boolean;
  onFilesChange: (files: File[]) => void;
}

export default function AttachmentsManager({ opportunityId, isLoading, onFilesChange }: AttachmentsManagerProps) {
  const [existingAttachments, setExistingAttachments] = useState<Attachment[]>([]);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  useEffect(() => {
    if (opportunityId) {
      loadExistingAttachments();
    }
  }, [opportunityId]);

  const loadExistingAttachments = async () => {
    try {
      const attachments = await getAttachments(opportunityId!);
      setExistingAttachments(attachments);
    } catch (error) {
      console.error('Error loading attachments:', error);
      toast.error('Failed to load attachments');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setPendingFiles(prev => [...prev, ...acceptedFiles]);
      onFilesChange(acceptedFiles);
    },
    disabled: isLoading
  });

  const removeFile = (fileToRemove: File) => {
    setPendingFiles(files => files.filter(file => file !== fileToRemove));
    onFilesChange(pendingFiles.filter(file => file !== fileToRemove));
  };

  const handleDeleteAttachment = async (attachmentId: string) => {
    try {
      await deleteAttachment(attachmentId);
      setExistingAttachments(prev => prev.filter(a => a.id !== attachmentId));
      toast.success('Attachment deleted successfully');
    } catch (error) {
      console.error('Error deleting attachment:', error);
      toast.error('Failed to delete attachment');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Attachments</h3>
      
      {/* Existing Attachments */}
      {existingAttachments.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Existing Files</h4>
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
                  onClick={() => handleDeleteAttachment(attachment.id)}
                  className="text-red-600 hover:text-red-900"
                  disabled={isLoading}
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload New Files */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Upload New Files</h4>
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

      {/* Pending Files */}
      {pendingFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Files to Upload</h4>
          <ul className="divide-y divide-gray-200">
            {pendingFiles.map((file, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900">{file.name}</span>
                  <span className="ml-2 text-sm text-gray-500">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(file)}
                  className="text-red-600 hover:text-red-900"
                  disabled={isLoading}
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