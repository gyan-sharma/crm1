import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Offer } from '../types/offers';
import { User } from '../types';
import db from '../lib/db';
import OfferList from '../components/offers/OfferList';
import OfferForm from '../components/offers/OfferForm';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';

export default function Offers() {
  const [offers, setOffers] = useState<(Offer & { salesRepName?: string })[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteAllDialogOpen, setIsDeleteAllDialogOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      // Get all offers and users in parallel
      const [allOffers, allUsers] = await Promise.all([
        db.offers.orderBy('created_at').reverse().toArray(),
        db.users.toArray()
      ]);

      // Map sales rep names to offers
      const offersWithSalesReps = allOffers.map(offer => ({
        ...offer,
        salesRepName: allUsers.find(user => user.id === offer.salesRepId)?.name
      }));

      setOffers(offersWithSalesReps);
    } catch (error) {
      console.error('Error loading offers:', error);
      toast.error('Failed to load offers');
    }
  };

  const handleCreateOffer = async (data: Omit<Offer, 'id' | 'created_at' | 'updated_at'>) => {
    setIsLoading(true);
    try {
      const newOffer: Offer = {
        ...data,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      await db.offers.add(newOffer);
      await loadOffers();
      setIsModalOpen(false);
      toast.success('Offer created successfully');
    } catch (error) {
      console.error('Error creating offer:', error);
      toast.error('Failed to create offer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateOffer = async (data: Omit<Offer, 'id' | 'created_at' | 'updated_at'>) => {
    if (!selectedOffer) return;
    
    setIsLoading(true);
    try {
      await db.offers.update(selectedOffer.id, {
        ...data,
        updated_at: new Date().toISOString()
      });
      await loadOffers();
      setIsModalOpen(false);
      toast.success('Offer updated successfully');
    } catch (error) {
      console.error('Error updating offer:', error);
      toast.error('Failed to update offer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOffer = async () => {
    if (!selectedOffer) return;
    
    try {
      await db.offers.delete(selectedOffer.id);
      await loadOffers();
      setIsDeleteDialogOpen(false);
      toast.success('Offer deleted successfully');
    } catch (error) {
      console.error('Error deleting offer:', error);
      toast.error('Failed to delete offer');
    }
  };

  const handleDeleteAllOffers = async () => {
    try {
      await db.offers.clear();
      await loadOffers();
      setIsDeleteAllDialogOpen(false);
      toast.success('All offers deleted successfully');
    } catch (error) {
      console.error('Error deleting all offers:', error);
      toast.error('Failed to delete all offers');
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Offers</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create and manage customer offers.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => {
              setSelectedOffer(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Offer
          </button>
        </div>
      </div>

      <OfferList 
        offers={offers}
        onEdit={(offer) => {
          setSelectedOffer(offer);
          setIsModalOpen(true);
        }}
        onDelete={(offer) => {
          setSelectedOffer(offer);
          setIsDeleteDialogOpen(true);
        }}
        onDeleteAll={() => setIsDeleteAllDialogOpen(true)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedOffer ? 'Edit Offer' : 'Create New Offer'}
        size="xl"
      >
        <OfferForm
          onSubmit={selectedOffer ? handleUpdateOffer : handleCreateOffer}
          initialData={selectedOffer || undefined}
          isLoading={isLoading}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteOffer}
        title="Delete Offer"
        message={`Are you sure you want to delete this offer? This action cannot be undone.`}
      />

      <ConfirmDialog
        isOpen={isDeleteAllDialogOpen}
        onClose={() => setIsDeleteAllDialogOpen(false)}
        onConfirm={handleDeleteAllOffers}
        title="Delete All Offers"
        message="Are you sure you want to delete all offers? This action cannot be undone."
      />
    </div>
  );
}