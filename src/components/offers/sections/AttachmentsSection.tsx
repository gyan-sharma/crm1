import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { Attachment } from '../../../types';
import { uploadAttachment, deleteAttachment } from '../../../lib/attachments';

interface AttachmentsSectionProps {
  title: string;
  sectionId: string;
  isLoading?: boolean;
}

export default function AttachmentsSection({
  title,
  sectionId,
  isLoading
}: AttachmentsSectionProps) {
  const [attachments, setAttachments] = React.useState<Attachment[]>([]);

  const onDrop = React.useCallback(async (acceptedFiles: File[]) => {
    try {
      const newAttachments = await Promise.all(
        acceptedFiles.map(file => uploadAttachment(file, sectionId))
      );
      setAttachments(prev => [...prev, ...newAttachments]);
    } catch (error) {
      console.error('Error uploading attachments:', error);
    }
  }, [sectionId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDelete = async (attachmentId: string) => {
    try {
      await deleteAttachment(attachmentId);
      setAttachments(prev => prev.filter(a => a.id !== attachmentId));
    } catch (error) {
      console.error('Error deleting attachment:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      
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

      {attachments.length > 0 && (
        <ul className="divide-y divide-gray-200">
          {attachments.map((attachment) => (
            <li key={attachment.id} className="py-3 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">
                  {attachment.filename}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  ({(attachment.file_size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(attachment.id)}
                className="text-red-600 hover:text-red-900"
                disabled={isLoading}
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