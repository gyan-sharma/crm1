import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { BlockchainOpportunity, User } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { generateOpportunityId } from '../utils/generateId';
import { logAction, logChange } from '../lib/audit/auditLogger';
import db from '../lib/db';
import OpportunityList from '../components/opportunities/OpportunityList';
import OpportunityForm from '../components/opportunities/OpportunityForm';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import BulkActions from '../components/opportunities/BulkActions';

export default function Opportunities() {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState<(BlockchainOpportunity & { sales_rep?: User })[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<BlockchainOpportunity | null>(null);

  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    try {
      const [allOpportunities, salesReps] = await Promise.all([
        db.opportunities.orderBy('created_at').reverse().toArray(),
        db.users.toArray()
      ]);
      
      const opportunitiesWithSalesRep = allOpportunities.map(opportunity => ({
        ...opportunity,
        sales_rep: salesReps.find(rep => rep.id === opportunity.sales_rep_id)
      }));
      
      setOpportunities(opportunitiesWithSalesRep);
    } catch (error) {
      console.error('Error loading opportunities:', error);
      toast.error('Failed to load opportunities');
    }
  };

  const handleCreateOpportunity = async (data: Omit<BlockchainOpportunity, 'id' | 'created_at'>) => {
    setIsLoading(true);
    try {
      const id = generateOpportunityId();
      const newOpportunity: BlockchainOpportunity = {
        ...data,
        id,
        created_at: new Date().toISOString(),
      };
      
      await db.opportunities.add(newOpportunity);
      await logAction(user!, 'create', 'opportunity', id, { data: newOpportunity });
      await loadOpportunities();
      setIsModalOpen(false);
      toast.success('Opportunity created successfully');
      return id;
    } catch (error) {
      console.error('Error creating opportunity:', error);
      toast.error('Failed to create opportunity');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateOpportunity = async (data: Omit<BlockchainOpportunity, 'id' | 'created_at'>) => {
    if (!selectedOpportunity) return selectedOpportunity?.id || '';
    
    setIsLoading(true);
    try {
      // Get the complete old data first
      const oldData = await db.opportunities.get(selectedOpportunity.id);
      if (!oldData) {
        throw new Error('Opportunity not found');
      }

      // Prepare the new data while preserving the id and created_at
      const newData = {
        ...data,
        id: selectedOpportunity.id,
        created_at: oldData.created_at
      };

      // Update the opportunity
      await db.opportunities.update(selectedOpportunity.id, data);
      
      // Log the changes
      await logChange(user!, 'opportunity', selectedOpportunity.id, oldData, newData);
      
      await loadOpportunities();
      setIsModalOpen(false);
      toast.success('Opportunity updated successfully');
      return selectedOpportunity.id;
    } catch (error) {
      console.error('Error updating opportunity:', error);
      toast.error('Failed to update opportunity');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOpportunity = async () => {
    if (!selectedOpportunity) return;
    
    try {
      const oldData = await db.opportunities.get(selectedOpportunity.id);
      await db.opportunities.delete(selectedOpportunity.id);
      await logAction(user!, 'delete', 'opportunity', selectedOpportunity.id, { 
        deleted_data: oldData 
      });
      await loadOpportunities();
      setIsDeleteDialogOpen(false);
      toast.success('Opportunity deleted successfully');
    } catch (error) {
      console.error('Error deleting opportunity:', error);
      toast.error('Failed to delete opportunity');
    }
  };

  const openCreateModal = () => {
    setSelectedOpportunity(null);
    setIsModalOpen(true);
  };

  const openEditModal = (opportunity: BlockchainOpportunity) => {
    setSelectedOpportunity(opportunity);
    setIsModalOpen(true);
  };

  const openDeleteDialog = (opportunity: BlockchainOpportunity) => {
    setSelectedOpportunity(opportunity);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Opportunities</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage sales opportunities and track their progress.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:flex-none flex items-center space-x-4">
          <BulkActions onDataChange={loadOpportunities} />
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Opportunity
          </button>
        </div>
      </div>

      <OpportunityList
        opportunities={opportunities}
        onEdit={openEditModal}
        onDelete={openDeleteDialog}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedOpportunity ? 'Edit Opportunity' : 'Create Opportunity'}
      >
        <OpportunityForm
          onSubmit={selectedOpportunity ? handleUpdateOpportunity : handleCreateOpportunity}
          initialData={selectedOpportunity || undefined}
          isLoading={isLoading}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteOpportunity}
        title="Delete Opportunity"
        message={`Are you sure you want to delete ${selectedOpportunity?.title}? This action cannot be undone.`}
      />
    </div>
  );
}