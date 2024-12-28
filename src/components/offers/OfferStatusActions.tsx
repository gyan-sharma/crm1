import React from 'react';
import { Send, Check, X } from 'lucide-react';
import { Offer } from '../../types/offers';

interface OfferStatusActionsProps {
  offer: Offer;
  onStatusChange: (newStatus: 'sent' | 'accepted' | 'order_booked') => Promise<void>;
  isLoading?: boolean;
}

export default function OfferStatusActions({ offer, onStatusChange, isLoading }: OfferStatusActionsProps) {
  if (offer.status !== 'approved' && offer.status !== 'sent') {
    return null;
  }

  return (
    <div className="flex space-x-4">
      {offer.status === 'approved' && (
        <button
          onClick={() => onStatusChange('sent')}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Send className="h-4 w-4 mr-2" />
          Mark as Sent
        </button>
      )}

      {offer.status === 'sent' && (
        <>
          <button
            onClick={() => onStatusChange('accepted')}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            <Check className="h-4 w-4 mr-2" />
            Contract Won
          </button>
          <button
            onClick={() => onStatusChange('order_booked')}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            <X className="h-4 w-4 mr-2" />
            Contract Lost
          </button>
        </>
      )}
    </div>
  );
}