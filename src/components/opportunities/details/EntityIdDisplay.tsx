import React from 'react';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

interface EntityIdDisplayProps {
  id: string;
}

export default function EntityIdDisplay({ id }: EntityIdDisplayProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(id);
    toast.success('ID copied to clipboard');
  };

  return (
    <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-md px-3 py-1">
      <span className="text-xs font-mono text-gray-600">ID:</span>
      <span className="text-sm font-mono font-medium text-gray-900">{id}</span>
      <button
        onClick={copyToClipboard}
        className="text-gray-400 hover:text-gray-600 transition-colors"
        title="Copy ID"
      >
        <Copy className="h-4 w-4" />
      </button>
    </div>
  );
}