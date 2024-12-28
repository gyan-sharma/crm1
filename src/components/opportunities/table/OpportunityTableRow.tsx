import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { BlockchainOpportunity, User } from '../../../types';
import { getStageColor, getPriorityColor } from '../../../utils/styleHelpers';
import { formatCurrency, formatDate, formatStageValue, formatPriorityValue } from '../../../utils/formatters';

interface OpportunityTableRowProps {
  opportunity: BlockchainOpportunity & { sales_rep?: User };
  onEdit: (opportunity: BlockchainOpportunity) => void;
  onDelete: (opportunity: BlockchainOpportunity) => void;
}

export default function OpportunityTableRow({ opportunity, onEdit, onDelete }: OpportunityTableRowProps) {
  // Calculate total budget from components
  const totalBudget = opportunity.budget ? 
    opportunity.budget.license + opportunity.budget.services + opportunity.budget.maintenance : 0;

  return (
    <tr>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {opportunity.title || 'Untitled'}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {opportunity.sales_rep?.name || 'Unassigned'}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {opportunity.region || 'Not specified'}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStageColor(opportunity.stage)}`}>
          {formatStageValue(opportunity.stage)}
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getPriorityColor(opportunity.priority)}`}>
          {formatPriorityValue(opportunity.priority)}
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {formatCurrency(totalBudget)}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {formatDate(opportunity.created_at)}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <div className="flex items-center space-x-3">
          <Link
            to={`/opportunities/${opportunity.id}`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <Eye className="h-4 w-4" />
          </Link>
          <button
            onClick={() => onEdit(opportunity)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(opportunity)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}