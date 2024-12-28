import { Environment, ServiceComponent } from '../types/offers';
import { toTitleCase } from './formatters';
import db from '../lib/db';

const SERVICE_TYPES = [
  'Discovery Analysis',
  'Project Management',
  'Solution Design',
  'BPaaS Development',
  'Backend Development',
  'Front End Development',
  'Integrations',
  'Testing',
  'Documentation',
  'Travel',
  'Iterations'
];

// These are the component names we'll look for in the pricing data
const COMPONENT_NAMES = [
  'Hyperledger Besu Blockchain Network',
  'Hyperledger Besu Blockchain Node',
  'EVM Loadbalancer',
  'Chaincode Smart Contract Set',
  'Graph Middleware',
  'Smart Contract Portal',
  'Attestation Indexer',
  'Firefly Fabconnect Middleware',
  'Integration Studio',
  'Hasura',
  'IPFS Storage',
  'Minio Storage',
  'Accessible Private Key (EC DSA P256)',
  'HSM Private Key (EC DSA P256)',
  'HD Private Key (EC DSA P256)',
  'Hyperledger Explorer',
  'Custom Deployment'
];

// Sample document links with realistic names and URLs
const DOCUMENT_LINKS = [
  {
    type: 'proposal' as const,
    links: [
      { name: 'Technical Solution Overview', url: 'https://docs.google.com/presentation/d/4jkl...mno' },
      { name: 'Implementation Timeline', url: 'https://docs.google.com/spreadsheets/d/5pqr...stu' },
      { name: 'Architecture Diagram', url: 'https://drive.google.com/file/d/6vwx...yza' },
      { name: 'Cost Breakdown', url: 'https://docs.google.com/spreadsheets/d/7bcd...efg' }
    ]
  }
];

export async function generateDummyOfferData() {
  // First, get all available pricing components
  const pricingComponents = await db.pricingComponents.toArray();

  // Function to find a matching component from pricing data
  const findMatchingComponent = (name: string) => {
    return pricingComponents.find(comp => comp.prettyName === name);
  };

  // Generate environments with components that exist in pricing data
  const environments: Environment[] = [
    {
      id: crypto.randomUUID(),
      name: 'Production',
      licensePeriod: 12,
      components: []
    },
    {
      id: crypto.randomUUID(),
      name: 'Development',
      licensePeriod: 12,
      components: []
    }
  ];

  // Add components to environments only if they exist in pricing data
  for (const envIndex in environments) {
    const isProd = envIndex === '0';
    const componentsToAdd = isProd ? 8 : 5; // More components for prod

    for (const componentName of COMPONENT_NAMES.slice(0, componentsToAdd)) {
      const pricingComponent = findMatchingComponent(componentName);
      if (pricingComponent) {
        environments[envIndex].components.push({
          id: crypto.randomUUID(),
          pricingComponentId: pricingComponent.id,
          name: pricingComponent.prettyName,
          type: pricingComponent.type,
          size: pricingComponent.size,
          quantity: isProd ? Math.floor(Math.random() * 2) + 1 : 1, // 1-2 for prod, 1 for dev
          monthlyPrice: isProd ? pricingComponent.monthlyPrice : Math.floor(pricingComponent.monthlyPrice * 0.6)
        });
      }
    }
  }

  // Generate services with realistic mandays and rates
  const services: ServiceComponent[] = SERVICE_TYPES.map(type => {
    // Assign different mandays based on service type
    let mandays = 10; // default
    let ratePerDay = 1200; // default

    switch (type) {
      case 'Discovery Analysis':
        mandays = 15;
        ratePerDay = 1500;
        break;
      case 'Project Management':
        mandays = 40;
        ratePerDay = 1200;
        break;
      case 'Solution Design':
        mandays = 20;
        ratePerDay = 1500;
        break;
      case 'BPaaS Development':
        mandays = 60;
        ratePerDay = 1200;
        break;
      case 'Backend Development':
        mandays = 45;
        ratePerDay = 1200;
        break;
      case 'Front End Development':
        mandays = 30;
        ratePerDay = 1100;
        break;
      case 'Integrations':
        mandays = 25;
        ratePerDay = 1200;
        break;
      case 'Testing':
        mandays = 20;
        ratePerDay = 1000;
        break;
      case 'Documentation':
        mandays = 10;
        ratePerDay = 900;
        break;
      case 'Travel':
        mandays = 5;
        ratePerDay = 800;
        break;
      case 'Iterations':
        mandays = 15;
        ratePerDay = 1200;
        break;
    }

    return {
      id: crypto.randomUUID(),
      name: type,
      mandays,
      ratePerDay,
      total: mandays * ratePerDay
    };
  });

  // Generate documents by selecting random links from each category
  const documents = DOCUMENT_LINKS.flatMap(category => {
    // Select 2-3 random links from each category
    const numLinks = Math.floor(Math.random() * 2) + 2;
    const selectedLinks = [...category.links]
      .sort(() => Math.random() - 0.5)
      .slice(0, numLinks);

    return selectedLinks.map(link => ({
      id: crypto.randomUUID(),
      type: category.type,
      name: link.name,
      url: link.url,
      created_at: new Date().toISOString()
    }));
  });

  return {
    overview: 'This opportunity represents a comprehensive blockchain implementation project including platform setup, development, and integration services.',
    environments,
    services,
    licensePeriod: 12,
    licensePaymentTerms: 'Monthly in advance',
    deliveryDuration: 6,
    servicesPaymentTerms: '50% advance, 50% on completion',
    documents
  };
}