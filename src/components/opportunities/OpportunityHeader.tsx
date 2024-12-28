import React from 'react';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import { BlockchainOpportunity } from '../../types';
import EntityIdDisplay from './details/EntityIdDisplay';

interface OpportunityHeaderProps {
  opportunity: BlockchainOpportunity;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function OpportunityHeader({ opportunity, onBack, onEdit, onDelete }: OpportunityHeaderProps) {
  return (
    <div className="space-y-4 mb-8">
      <button
        onClick={onBack}
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Opportunities
      </button>
      
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            {opportunity.title}
          </h1>
          <EntityIdDisplay id={opportunity.id} />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}