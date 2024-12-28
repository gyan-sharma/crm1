import React, { useState, useEffect } from 'react';
import { PricingComponent } from '../types/pricing';
import db from '../lib/db';
import ExcelUploader from '../components/pricing/ExcelUploader';
import PricingTable from '../components/pricing/PricingTable';

export default function Pricing() {
  const [components, setComponents] = useState<PricingComponent[]>([]);

  const loadPricingData = async () => {
    const data = await db.pricingComponents.toArray();
    setComponents(data);
  };

  useEffect(() => {
    loadPricingData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Platform Pricing</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage and view platform component pricing.
          </p>
        </div>
        <ExcelUploader onUploadComplete={loadPricingData} />
      </div>

      <PricingTable components={components} />
    </div>
  );
}