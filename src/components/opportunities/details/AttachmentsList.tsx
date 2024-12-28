import React from 'react';
import { Download } from 'lucide-react';
import { Attachment } from '../../../types';

interface AttachmentsListProps {
  attachments: Attachment[];
  onDownload: (attachment: Attachment) => void;
}

export default function AttachmentsList({ attachments, onDownload }: AttachmentsListProps) {
  if (attachments.length === 0) {
    return <p className="text-sm text-gray-500">No attachments</p>;
  }

  return (
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
            onClick={() => onDownload(attachment)}
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </button>
        </li>
      ))}
    </ul>
  );
}