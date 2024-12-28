import { OfferStatus } from '../types/constants';

export function getStageColor(stage: string | null | undefined): string {
  switch (stage) {
    case 'new': return 'bg-blue-100 text-blue-800';
    case 'qualification': return 'bg-purple-100 text-purple-800';
    case 'proposal': return 'bg-indigo-100 text-indigo-800';
    case 'negotiation': return 'bg-orange-100 text-orange-800';
    case 'closed_won': return 'bg-green-100 text-green-800';
    case 'closed_lost': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function getPriorityColor(priority: string | null | undefined): string {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function getStatusColor(status: OfferStatus): string {
  switch (status) {
    case 'draft':
      return 'bg-gray-100 text-gray-800';
    case 'under_review':
      return 'bg-yellow-100 text-yellow-800';
    case 'approved':
      return 'bg-emerald-100 text-emerald-800';
    case 'sent':
      return 'bg-purple-100 text-purple-800';
    case 'accepted':
      return 'bg-green-100 text-green-800';
    case 'order_booked':
      return 'bg-indigo-100 text-indigo-800';
    case 'contract_lost':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}