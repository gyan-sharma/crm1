import { toast } from 'sonner';

export async function storeFile(file: File): Promise<{ id: string; url: string }> {
  try {
    // For demo purposes, we'll create an object URL
    // In production, this would upload to a proper storage service
    const url = URL.createObjectURL(file);
    return {
      id: crypto.randomUUID(),
      url
    };
  } catch (error) {
    console.error('Error storing file:', error);
    toast.error('Failed to upload file');
    throw error;
  }
}

export function validateFile(file: File): boolean {
  // Max file size: 10MB
  const MAX_SIZE = 10 * 1024 * 1024;
  
  // Allowed file types
  const ALLOWED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  if (file.size > MAX_SIZE) {
    toast.error('File size must be less than 10MB');
    return false;
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    toast.error('Only PDF, Word and Excel files are allowed');
    return false;
  }

  return true;
}