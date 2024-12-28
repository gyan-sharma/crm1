import { OfferDocument } from '../types/offers';
import { toast } from 'sonner';

// Handle file download
export async function downloadDocument(doc: OfferDocument): Promise<void> {
  try {
    if (doc.url) {
      window.open(doc.url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (!doc.file) {
      throw new Error('No file content available');
    }

    // Create blob URL for file download
    const blob = new Blob([await doc.file.arrayBuffer()], { type: doc.file.type });
    const url = URL.createObjectURL(blob);

    try {
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Error downloading document:', error);
    toast.error('Failed to download document');
    throw error;
  }
}

// Process file upload - no validation
export async function handleFileUpload(file: File, type: 'rfp' | 'proposal' | 'other'): Promise<OfferDocument> {
  return {
    id: crypto.randomUUID(),
    type,
    name: file.name,
    file,
    created_at: new Date().toISOString()
  };
}

// Add document link - only validate URL format
export async function handleLinkAdd(name: string, url: string, type: 'rfp' | 'proposal' | 'other'): Promise<OfferDocument> {
  try {
    const validatedUrl = new URL(url);
    return {
      id: crypto.randomUUID(),
      type,
      name: name.trim() || url.split('/').pop() || 'Document',
      url: validatedUrl.toString(),
      created_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error adding document link:', error);
    toast.error('Invalid URL format');
    throw error;
  }
}