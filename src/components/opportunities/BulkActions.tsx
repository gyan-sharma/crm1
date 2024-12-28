import React from 'react';
import { DatabaseBackup, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import db from '../../lib/db';
import { seedDummyData } from '../../utils/seedData';

interface BulkActionsProps {
  onDataChange: () => void;
}

export default function BulkActions({ onDataChange }: BulkActionsProps) {
  const handleDeleteAll = async () => {
    if (!confirm('Are you sure you want to delete all opportunities? This action cannot be undone.')) {
      return;
    }

    try {
      await db.opportunities.clear();
      await db.attachments.clear();
      toast.success('All opportunities deleted successfully');
      onDataChange();
    } catch (error) {
      console.error('Error deleting opportunities:', error);
      toast.error('Failed to delete opportunities');
    }
  };

  const handleSeedData = async () => {
    try {
      await seedDummyData();
      toast.success('Sample data generated successfully');
      onDataChange();
    } catch (error) {
      console.error('Error generating sample data:', error);
      toast.error('Failed to generate sample data');
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        type="button"
        onClick={handleSeedData}
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <DatabaseBackup className="h-4 w-4 mr-2" />
        Generate Sample Data
      </button>
      <button
        type="button"
        onClick={handleDeleteAll}
        className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Delete All
      </button>
    </div>
  );
}