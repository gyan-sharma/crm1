import React from 'react';
import { BlockchainOpportunity, User, Attachment } from '../../../types';
import DetailSection from './DetailSection';
import DetailField from './DetailField';
import AttachmentsList from './AttachmentsList';
import StakeholdersList from './StakeholdersList';
import StageIndicator from './StageIndicator';
import PriorityIndicator from './PriorityIndicator';
import { formatForecastCategory, formatCurrency, formatDate } from '../../../utils/formatters';

interface OpportunityDetailContentProps {
  opportunity: BlockchainOpportunity;
  salesRep: User | null;
  attachments: Attachment[];
  onDownloadAttachment: (attachment: Attachment) => void;
}

export default function OpportunityDetailContent({ 
  opportunity, 
  salesRep, 
  attachments,
  onDownloadAttachment 
}: OpportunityDetailContentProps) {
  return (
    <div className="space-y-6">
      <DetailSection title="Basic Information">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <DetailField label="Title" value={opportunity.title || 'Untitled'} />
          <DetailField label="Opportunity ID" value={opportunity.id} className="font-mono" />
          <DetailField label="Customer Name" value={opportunity.customer_name || 'Not specified'} />
          <DetailField label="Sales Representative" value={salesRep?.name || 'Unassigned'} />
          <DetailField label="Industry" value={opportunity.industry || 'Not specified'} />
          <DetailField label="Lead Source" value={opportunity.lead_source || 'Not specified'} />
          <DetailField 
            label="Stage" 
            value={<StageIndicator stage={opportunity.stage} />}
          />
          <DetailField 
            label="Priority" 
            value={<PriorityIndicator priority={opportunity.priority} />}
          />
          <DetailField 
            label="Forecast Category" 
            value={formatForecastCategory(opportunity.forecast_category)}
          />
          <DetailField 
            label="Close Date" 
            value={formatDate(opportunity.close_date)}
          />
          <DetailField 
            label="Region" 
            value={opportunity.region || 'Not specified'}
          />
          {opportunity.stage === 'closed_lost' && opportunity.reason_lost && (
            <DetailField 
              label="Reason Lost" 
              value={opportunity.reason_lost}
              className="sm:col-span-2"
            />
          )}
        </dl>
      </DetailSection>

      <DetailSection title="Technical Details">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <DetailField label="Platform Type" value={opportunity.platform_type || 'Not specified'} />
          <DetailField label="Deployment Type" value={opportunity.deployment_type || 'Not specified'} />
          <DetailField 
            label="Number of Nodes" 
            value={opportunity.technical_requirements?.nodes || 'Not specified'} 
          />
        </dl>
      </DetailSection>

      <DetailSection title="Commercial Details">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <DetailField 
            label="License Budget" 
            value={formatCurrency(opportunity.budget?.license || 0)} 
          />
          <DetailField 
            label="Services Budget" 
            value={formatCurrency(opportunity.budget?.services || 0)} 
          />
          <DetailField 
            label="Maintenance Budget" 
            value={formatCurrency(opportunity.budget?.maintenance || 0)} 
          />
          <DetailField 
            label="Total Budget" 
            value={formatCurrency(opportunity.budget?.total || 0)}
            className="sm:col-span-2"
          />
        </dl>
      </DetailSection>

      <DetailSection title="Stakeholders">
        <StakeholdersList stakeholders={opportunity.stakeholders} />
      </DetailSection>

      <DetailSection title="Additional Information">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <DetailField label="Country" value={opportunity.country || 'Not specified'} />
          <DetailField label="Use Case" value={opportunity.use_case || 'Not specified'} />
          <DetailField 
            label="Interaction Log" 
            value={opportunity.interaction_log || 'No interactions recorded'}
            className="sm:col-span-2"
          />
          <DetailField 
            label="Notes" 
            value={opportunity.notes || 'No additional notes'}
            className="sm:col-span-2"
          />
        </dl>
      </DetailSection>

      <DetailSection title="Attachments">
        <AttachmentsList 
          attachments={attachments}
          onDownload={onDownloadAttachment}
        />
      </DetailSection>
    </div>
  );
}