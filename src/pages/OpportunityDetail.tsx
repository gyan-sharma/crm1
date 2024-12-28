import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { BlockchainOpportunity, User, Attachment } from '../types';
import db from '../lib/db';
import OpportunityHeader from '../components/opportunities/OpportunityHeader';
import OpportunityDetailContent from '../components/opportunities/details/OpportunityDetailContent';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import OpportunityForm from '../components/opportunities/OpportunityForm';
import { getAttachments, downloadAttachment } from '../lib/attachments';

export default function OpportunityDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState<BlockchainOpportunity | null>(null);
  const [salesRep, setSalesRep] = useState<User | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadOpportunityData(id);
    }
  }, [id]);

  const loadOpportunityData = async (opportunityId: string) => {
    try {
      const opportunity = await db.opportunities.get(opportunityId);
      if (!opportunity) {
        toast.error('Opportunity not found');
        navigate('/opportunities');
        return;
      }

      setOpportunity(opportunity);

      if (opportunity.sales_rep_id) {
        const salesRep = await db.users.get(opportunity.sales_rep_id);
        setSalesRep(salesRep || null);
      }

      const attachments = await getAttachments(opportunityId);
      setAttachments(attachments);
    } catch (error) {
      console.error('Error loading opportunity:', error);
      toast.error('Failed to load opportunity details');
    }
  };

  const handleUpdate = async (data: Omit<BlockchainOpportunity, 'id' | 'created_at'>) => {
    if (!opportunity?.id) return;
    
    setIsLoading(true);
    try {
      await db.opportunities.update(opportunity.id, data);
      await loadOpportunityData(opportunity.id);
      setIsEditModalOpen(false);
      toast.success('Opportunity updated successfully');
    } catch (error) {
      console.error('Error updating opportunity:', error);
      toast.error('Failed to update opportunity');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!opportunity?.id) return;
    
    try {
      await db.opportunities.delete(opportunity.id);
      navigate('/opportunities');
      toast.success('Opportunity deleted successfully');
    } catch (error) {
      console.error('Error deleting opportunity:', error);
      toast.error('Failed to delete opportunity');
    }
  };

  const handleDownloadAttachment = async (attachment: Attachment) => {
    try {
      await downloadAttachment(attachment);
    } catch (error) {
      console.error('Error downloading attachment:', error);
      toast.error('Failed to download attachment');
    }
  };

  if (!opportunity) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <OpportunityHeader
        opportunity={opportunity}
        onBack={() => navigate('/opportunities')}
        onEdit={() => setIsEditModalOpen(true)}
        onDelete={() => setIsDeleteDialogOpen(true)}
      />

      <OpportunityDetailContent
        opportunity={opportunity}
        salesRep={salesRep}
        attachments={attachments}
        onDownloadAttachment={handleDownloadAttachment}
      />

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Opportunity"
      >
        <OpportunityForm
          onSubmit={handleUpdate}
          initialData={opportunity}
          isLoading={isLoading}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Opportunity"
        message={`Are you sure you want to delete ${opportunity.title}? This action cannot be undone.`}
      />
    </div>
  );
}