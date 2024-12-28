import { useState, useEffect } from 'react';
import { PricingComponent } from '../types/pricing';
import db from '../lib/db';

export function useEnvironmentComponents() {
  const [components, setComponents] = useState<Record<string, PricingComponent>>({});

  useEffect(() => {
    loadComponents();
  }, []);

  const loadComponents = async () => {
    const allComponents = await db.pricingComponents.toArray();
    const componentMap = allComponents.reduce((acc, comp) => {
      acc[comp.id] = comp;
      return acc;
    }, {} as Record<string, PricingComponent>);
    setComponents(componentMap);
  };

  const getComponentDetails = (id: string): PricingComponent | undefined => {
    return components[id];
  };

  return { getComponentDetails };
}