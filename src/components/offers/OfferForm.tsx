import React, { useState } from 'react';
import { BlockchainOpportunity, Offer } from '../../types/offers';
import OpportunitySearch from './OpportunitySearch';
import SelectedOpportunityDetails from './sections/SelectedOpportunityDetails';
import OfferOverview from './sections/OfferOverview';
import PlatformLicenseSection from './sections/PlatformLicenseSection';
import ServicesSection from './sections/ServicesSection';
import CommercialSummary from './sections/CommercialSummary';
import { generateDummyOfferData } from '../../utils/dummyOfferData';

interface OfferFormProps {
  onSubmit: (data: Omit<Offer, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  initialData?: Partial<Offer>;
  isLoading?: boolean;
}

export default function OfferForm({ onSubmit, initialData, isLoading }: OfferFormProps) {
  // State for selected opportunity
  const [selectedOpportunity, setSelectedOpportunity] = useState<BlockchainOpportunity | null>(null);
  
  // State for offer sections
  const [overview, setOverview] = useState(initialData?.overview || '');
  const [environments, setEnvironments] = useState(initialData?.environments || []);
  const [services, setServices] = useState(initialData?.services || []);
  const [licensePeriod, setLicensePeriod] = useState(initialData?.licensePeriod || 12);
  const [licensePaymentTerms, setLicensePaymentTerms] = useState(initialData?.licensePaymentTerms || 'Monthly in advance');
  const [deliveryDuration, setDeliveryDuration] = useState(initialData?.deliveryDuration || 6);
  const [servicesPaymentTerms, setServicesPaymentTerms] = useState(initialData?.servicesPaymentTerms || '50% advance, 50% on completion');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpportunity) return;

    const formData: Omit<Offer, 'id' | 'created_at' | 'updated_at'> = {
      opportunityId: selectedOpportunity.id,
      salesRepId: selectedOpportunity.sales_rep_id,
      region: selectedOpportunity.region,
      customerName: selectedOpportunity.customer_name,
      projectName: selectedOpportunity.title,
      status: 'draft',
      overview,
      environments,
      services,
      licensePeriod,
      licensePaymentTerms,
      deliveryDuration,
      servicesPaymentTerms,
      totalValue: calculateTotalValue()
    };

    await onSubmit(formData);
  };

  const calculateTotalValue = () => {
    const platformTotal = environments.reduce((sum, env) => {
      return sum + env.components.reduce((compSum, comp) => 
        compSum + (comp.monthlyPrice * comp.quantity * env.licensePeriod), 0);
    }, 0);

    const servicesTotal = services.reduce((sum, service) => 
      sum + service.total, 0);

    return platformTotal + servicesTotal;
  };

  const fillDummyData = async () => {
    const dummyData = await generateDummyOfferData();
    setOverview(dummyData.overview);
    setEnvironments(dummyData.environments);
    setServices(dummyData.services);
    setLicensePeriod(dummyData.licensePeriod);
    setLicensePaymentTerms(dummyData.licensePaymentTerms);
    setDeliveryDuration(dummyData.deliveryDuration);
    setServicesPaymentTerms(dummyData.servicesPaymentTerms);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Opportunity Selection */}
      <OpportunitySearch
        onOpportunityFound={setSelectedOpportunity}
        isLoading={isLoading}
      />

      {selectedOpportunity && (
        <>
          {/* Selected Opportunity Details */}
          <SelectedOpportunityDetails opportunity={selectedOpportunity} />

          {/* Offer Overview */}
          <OfferOverview
            value={overview}
            onChange={setOverview}
            isLoading={isLoading}
          />

          {/* Platform License */}
          <PlatformLicenseSection
            environments={environments}
            onEnvironmentsChange={setEnvironments}
            paymentTerms={licensePaymentTerms}
            onPaymentTermsChange={setLicensePaymentTerms}
            isLoading={isLoading}
          />

          {/* Professional Services */}
          <ServicesSection
            services={services}
            onServicesChange={setServices}
            deliveryDuration={deliveryDuration}
            onDeliveryDurationChange={setDeliveryDuration}
            paymentTerms={servicesPaymentTerms}
            onPaymentTermsChange={setServicesPaymentTerms}
            isLoading={isLoading}
          />

          {/* Commercial Summary */}
          <CommercialSummary
            environments={environments}
            services={services}
            deliveryDuration={deliveryDuration}
          />

          {/* Form Actions */}
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
              {isLoading ? 'Creating...' : 'Create Offer'}
            </button>
          </div>
        </>
      )}
    </form>
  );
}