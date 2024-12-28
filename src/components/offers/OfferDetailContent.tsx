import React from 'react';
import { Offer } from '../../types/offers';
import { toTitleCase, formatCurrency } from '../../utils/formatters';
import OpportunityDetails from './OpportunityDetails';
import PlatformLicenseDetails from './sections/PlatformLicenseDetails';
import ServicesDetails from './sections/ServicesDetails';
import DocumentsOverview from './sections/DocumentsOverview';

interface OfferDetailContentProps {
  offer: Offer;
}

export default function OfferDetailContent({ offer }: OfferDetailContentProps) {
  // Group documents by type
  const rfpDocuments = offer.documents?.filter(doc => doc.type === 'rfp') || [];
  const proposalDocuments = offer.documents?.filter(doc => doc.type === 'proposal') || [];
  const otherDocuments = offer.documents?.filter(doc => doc.type === 'other') || [];

  // Calculate MRR (Monthly Recurring Revenue)
  const mrr = offer.environments.reduce((total, env) => {
    return total + env.components.reduce((envTotal, comp) => 
      envTotal + (Math.ceil(comp.monthlyPrice || 0) * (comp.quantity || 1)), 0
    );
  }, 0);

  // Calculate ARR (Annual Recurring Revenue)
  const arr = mrr * 12;

  // Calculate total platform license cost
  const totalPlatformCost = offer.environments.reduce((sum, env) => {
    const monthlyEnvCost = env.components.reduce((compSum, comp) => 
      compSum + (Math.ceil(comp.monthlyPrice || 0) * (comp.quantity || 1)), 0
    );
    return sum + (monthlyEnvCost * (env.licensePeriod || 12));
  }, 0);

  // Calculate total services cost
  const totalServices = offer.services.reduce((sum, service) => 
    sum + (service.total || 0), 0
  );

  // Calculate TCV (Total Contract Value)
  const tcv = totalPlatformCost + totalServices;

  return (
    <div className="space-y-3">
      {/* Sections with pastel backgrounds and compact spacing */}
      <div className="bg-blue-50/30 p-3 rounded-lg">
        <OpportunityDetails opportunityId={offer.opportunityId} />
      </div>

      <div className="bg-green-50/30 p-3 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Platform License Details</h3>
        <PlatformLicenseDetails environments={offer.environments} />
      </div>

      <div className="bg-purple-50/30 p-3 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Professional Services</h3>
        <ServicesDetails services={offer.services} />
      </div>

      <div className="bg-yellow-50/30 p-3 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Documents</h3>
        <DocumentsOverview
          rfpDocuments={rfpDocuments}
          proposalDocuments={proposalDocuments}
          otherDocuments={otherDocuments}
        />
      </div>

      <div className="bg-orange-50/30 p-3 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Commercial Terms</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">License Terms</h4>
            <div className="bg-white rounded p-2 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">License Period:</span>
                <span className="font-medium">{offer.licensePeriod} months</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Terms:</span>
                <span className="font-medium">{offer.licensePaymentTerms}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Services Terms</h4>
            <div className="bg-white rounded p-2 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Duration:</span>
                <span className="font-medium">{offer.deliveryDuration} months</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Terms:</span>
                <span className="font-medium">{offer.servicesPaymentTerms}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commercial Summary - Always at the bottom */}
      <div className="bg-indigo-50/30 p-3 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Commercial Summary</h3>
        <div className="grid grid-cols-4 gap-3 bg-white p-3 rounded">
          <div>
            <div className="text-xs font-medium text-gray-500">MRR</div>
            <div className="text-lg font-semibold text-gray-900">{formatCurrency(mrr)}</div>
            <div className="text-xs text-gray-500">Monthly Recurring Revenue</div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500">ARR</div>
            <div className="text-lg font-semibold text-gray-900">{formatCurrency(arr)}</div>
            <div className="text-xs text-gray-500">Annual Recurring Revenue</div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500">Services</div>
            <div className="text-lg font-semibold text-gray-900">{formatCurrency(totalServices)}</div>
            <div className="text-xs text-gray-500">Professional Services</div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500">TCV</div>
            <div className="text-lg font-semibold text-gray-900">{formatCurrency(tcv)}</div>
            <div className="text-xs text-gray-500">Total Contract Value</div>
          </div>
        </div>
      </div>
    </div>
  );
}