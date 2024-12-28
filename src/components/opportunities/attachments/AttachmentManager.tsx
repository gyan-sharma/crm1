import React, { useState } from 'react';
import { Attachment } from '../../../types';
import EditableFileList from './EditableFileList';
import { uploadAttachment, deleteAttachment } from '../../../lib/attachments';
import { toast } from 'sonner';

interface AttachmentManagerProps {
  opportunityId: string;
  existingAttachments: Attachment[];
  onAttachmentsChange: (attachments: Attachment[]) => void;
  isLoading?: boolean;
}

export default function AttachmentManager({
  opportunityId,
  existingAttachments,
  onAttachmentsChange,
  isLoading
}: AttachmentManagerProps) {
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  const handleFileSelect = (files: File[]) => {
    setPendingFiles(prev => [...prev, ...files]);
  };

  const handleFileRemove = (fileToRemove: File) => {
    setPendingFiles(files => files.filter(file => file !== fileToRemove));
  };

  const handleAttachmentDelete = async (attachmentId: string) => {
    try {
      await deleteAttachment(attachmentId);
      const updatedAttachments = existingAttachments.filter(a => a.id !== attachmentId);
      onAttachmentsChange(updatedAttachments);
      toast.success('Attachment deleted successfully');
    } catch (error) {
      console.error('Error deleting attachment:', error);
      toast.error('Failed to delete attachment');
    }
  };

  const handleSave = async () => {
    try {
      const newAttachments = await Promise.all(
        pendingFiles.map(file => uploadAttachment(file, opportunityId))
      );
      onAttachmentsChange([...existingAttachments, ...newAttachments]);
      setPendingFiles([]);
      toast.success('Attachments uploaded successfully');
    } catch (error) {
      console.error('Error uploading attachments:', error);
      toast.error('Failed to upload attachments');
    }
  };

  return (
    <div className="space-y-4">
      <EditableFileList
        existingAttachments={existingAttachments}
        pendingFiles={pendingFiles}
        onFileSelect={handleFileSelect}
        onFileRemove={handleFileRemove}
        onAttachmentDelete={handleAttachmentDelete}
        isLoading={isLoading}
      />
      
      {pendingFiles.length > 0 && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Upload New Files
          </button>
        </div>
      )}
    </div>
  );
}