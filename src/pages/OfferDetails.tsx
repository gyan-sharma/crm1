import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Offer } from '../types/offers';
import db from '../lib/db';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import OfferForm from '../components/offers/OfferForm';
import OfferDetailContent from '../components/offers/OfferDetailContent';
import OfferStatusActions from '../components/offers/OfferStatusActions';

export default function OfferDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (id) {
      loadOffer(id);
    }
  }, [id]);

  const loadOffer = async (offerId: string) => {
    try {
      const offer = await db.offers.get(offerId);
      if (!offer) {
        toast.error('Offer not found');
        navigate('/offers');
        return;
      }
      setOffer(offer);
    } catch (error) {
      console.error('Error loading offer:', error);
      toast.error('Failed to load offer details');
    }
  };

  const handleUpdate = async (data: Omit<Offer, 'id' | 'created_at' | 'updated_at'>) => {
    if (!offer?.id) return;
    
    setIsLoading(true);
    try {
      await db.offers.update(offer.id, {
        ...data,
        updated_at: new Date().toISOString()
      });
      await loadOffer(offer.id);
      setIsEditModalOpen(false);
      toast.success('Offer updated successfully');
    } catch (error) {
      console.error('Error updating offer:', error);
      toast.error('Failed to update offer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!offer?.id) return;
    
    try {
      await db.offers.delete(offer.id);
      navigate('/offers');
      toast.success('Offer deleted successfully');
    } catch (error) {
      console.error('Error deleting offer:', error);
      toast.error('Failed to delete offer');
    }
  };

  const handleStatusChange = async (newStatus: 'sent' | 'accepted' | 'order_booked') => {
    if (!offer?.id) return;

    setIsLoading(true);
    try {
      const updates: Partial<Offer> = {
        status: newStatus,
        updated_at: new Date().toISOString()
      };

      await db.offers.update(offer.id, updates);
      await loadOffer(offer.id);
      toast.success('Offer status updated successfully');
    } catch (error) {
      console.error('Error updating offer status:', error);
      toast.error('Failed to update offer status');
    } finally {
      setIsLoading(false);
    }
  };

  if (!offer) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/offers')}
            className="text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{offer.projectName}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {offer.customerName} • {offer.region}
            </p>
            {offer.offerId && (
              <p className="mt-1 text-sm font-mono text-gray-500">
                Offer ID: {offer.offerId}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>

      {/* Status Actions */}
      <OfferStatusActions
        offer={offer}
        onStatusChange={handleStatusChange}
        isLoading={isLoading}
      />

      {/* Content */}
      <OfferDetailContent offer={offer} />

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Offer"
        size="xl"
      >
        <OfferForm
          onSubmit={handleUpdate}
          initialData={offer}
          isLoading={isLoading}
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Offer"
        message="Are you sure you want to delete this offer? This action cannot be undone."
      />
    </div>
  );
}