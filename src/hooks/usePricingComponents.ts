import { useState, useEffect } from 'react';
import { PricingComponent } from '../types/pricing';
import db from '../lib/db';

export function usePricingComponents() {
  const [components, setComponents] = useState<PricingComponent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadComponents();
  }, []);

  const loadComponents = async () => {
    try {
      const data = await db.pricingComponents.toArray();
      setComponents(data);
    } catch (error) {
      console.error('Error loading pricing components:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { components, isLoading };
}