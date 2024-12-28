import React, { useRef, useState, useEffect } from 'react';
import { BlockchainOpportunity, User } from '../../types';
import db from '../../lib/db';
import { generateDummyOpportunity } from '../../utils/dummyData';
import { fillFormWithData } from '../../utils/formHelpers';
import BasicInfo from './sections/BasicInfo';
import TechnicalDetails from './sections/TechnicalDetails';
import CommercialDetails from './sections/CommercialDetails';
import StakeholderInfo from './sections/StakeholderInfo';
import AdditionalFields from './sections/AdditionalFields';
import AttachmentsSection from './sections/AttachmentsSection';

interface OpportunityFormProps {
  onSubmit: (data: Omit<BlockchainOpportunity, 'id' | 'created_at'>) => Promise<string>;
  initialData?: Partial<BlockchainOpportunity>;
  isLoading?: boolean;
}

export default function OpportunityForm({ onSubmit, initialData, isLoading }: OpportunityFormProps) {
  const [salesReps, setSalesReps] = useState<User[]>([]);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const loadSalesReps = async () => {
      const users = await db.users.where('role').equals('sales_rep').toArray();
      setSalesReps(users);
    };
    loadSalesReps();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    
    // Calculate total budget
    const budget = {
      license: Number(formData.get('budget_license')) || 0,
      services: Number(formData.get('budget_services')) || 0,
      maintenance: Number(formData.get('budget_maintenance')) || 0
    };
    budget.total = budget.license + budget.services + budget.maintenance;

    const opportunityData: Omit<BlockchainOpportunity, 'id' | 'created_at'> = {
      title: formData.get('title') as string,
      customer_name: formData.get('customer_name') as string,
      contact_info: formData.get('contact_info') as string,
      sales_rep_id: formData.get('sales_rep_id') as string,
      stage: formData.get('stage') as string,
      priority: formData.get('priority') as string,
      industry: formData.get('industry') as string,
      lead_source: formData.get('lead_source') as string,
      forecast_category: formData.get('forecast_category') as string,
      estimated_value: budget.total, // Set estimated value to total budget
      close_date: formData.get('close_date') as string,
      platform_type: formData.get('platform_type') as string,
      deployment_type: formData.get('deployment_type') as string,
      license_type: formData.get('license_type') as string,
      country: formData.get('country') as string,
      region: formData.get('region') as string,
      use_case: formData.get('use_case') as string,
      notes: formData.get('notes') as string,
      interaction_log: formData.get('interaction_log') as string,
      
      technical_requirements: {
        nodes: Number(formData.get('nodes'))
      },
      
      budget,
      
      stakeholders: Array.from({ length: 10 }, (_, i) => {
        const name = formData.get(`stakeholder_name_${i}`);
        const role = formData.get(`stakeholder_role_${i}`);
        const contact = formData.get(`stakeholder_contact_${i}`);
        
        if (!name || !role || !contact) return null;
        
        return {
          name: name as string,
          role: role as string,
          contact: contact as string
        };
      }).filter(Boolean)
    };

    try {
      const opportunityId = await onSubmit(opportunityData);
      
      // Handle file uploads after opportunity is created/updated
      if (pendingFiles.length > 0) {
        const { uploadAttachment } = await import('../../lib/attachments');
        await Promise.all(pendingFiles.map(file => uploadAttachment(file, opportunityId)));
      }
      
      return opportunityId;
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  const fillDummyData = () => {
    if (!formRef.current) return;
    const dummyData = generateDummyOpportunity(salesReps);
    fillFormWithData(formRef.current, dummyData);

    // Update total budget field
    const totalBudget = dummyData.budget?.total || 0;
    const totalInput = formRef.current.querySelector<HTMLInputElement>('#budget_total');
    if (totalInput) {
      totalInput.value = totalBudget.toString();
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
      <BasicInfo 
        initialData={initialData}
        salesReps={salesReps}
        isLoading={isLoading}
      />
      
      <TechnicalDetails
        initialData={initialData}
        isLoading={isLoading}
      />
      
      <CommercialDetails
        initialData={initialData}
        isLoading={isLoading}
      />
      
      <StakeholderInfo
        initialData={initialData}
        isLoading={isLoading}
      />

      <AdditionalFields
        initialData={initialData}
        isLoading={isLoading}
      />

      <AttachmentsSection
        opportunityId={initialData?.id}
        isLoading={isLoading}
        onFilesChange={setPendingFiles}
      />

      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={fillDummyData}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          Fill with Sample Data
        </button>
        
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Opportunity' : 'Create Opportunity'}
        </button>
      </div>
    </form>
  );
}