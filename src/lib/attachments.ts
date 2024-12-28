import { Attachment } from '../types';
import db from './db';

export async function uploadAttachment(file: File, opportunityId: string): Promise<Attachment> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async () => {
      try {
        const attachment: Attachment = {
          id: crypto.randomUUID(),
          opportunity_id: opportunityId,
          filename: file.name,
          mime_type: file.type,
          file_size: file.size,
          data: new Blob([reader.result as ArrayBuffer], { type: file.type }),
          created_at: new Date().toISOString()
        };

        await db.attachments.add(attachment);
        resolve(attachment);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

export async function deleteAttachment(id: string): Promise<void> {
  await db.attachments.delete(id);
}

export async function getAttachments(opportunityId: string): Promise<Attachment[]> {
  return db.attachments
    .where('opportunity_id')
    .equals(opportunityId)
    .toArray();
}

export async function downloadAttachment(attachment: Attachment): Promise<void> {
  const blob = attachment.data;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = attachment.filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}