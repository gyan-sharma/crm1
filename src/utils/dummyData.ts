import { User, BlockchainOpportunity, INDUSTRIES, LEAD_SOURCES, FORECAST_CATEGORIES } from '../types';
import { countries } from './countries';

// Sample company names and domains for more variety
const COMPANIES = [
  { name: 'Blockchain Solutions', domain: 'blockchainsolutions.com' },
  { name: 'DeFi Innovations', domain: 'defi-innovations.com' },
  { name: 'Enterprise Chain', domain: 'enterprisechain.io' },
  { name: 'Global Ledger', domain: 'globalledger.tech' },
  { name: 'Crypto Systems', domain: 'cryptosystems.net' },
  { name: 'Chain Logic', domain: 'chainlogic.io' },
  { name: 'Distributed Tech', domain: 'distributedtech.com' },
  { name: 'Block Ventures', domain: 'blockventures.co' }
];

const USE_CASES = [
  'Supply chain traceability and automation',
  'Digital identity management',
  'Asset tokenization platform',
  'Cross-border payment system',
  'Smart contract automation',
  'Document verification system',
  'Decentralized marketplace',
  'NFT trading platform'
];

const STAKEHOLDER_ROLES = [
  'CTO',
  'CIO',
  'Project Manager',
  'Technical Lead',
  'Product Owner',
  'Business Analyst',
  'Solution Architect',
  'Security Officer'
];

function generateRandomEmail(name: string, domain: string): string {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '.');
  return `${cleanName}@${domain}`;
}

function generateRandomStakeholder(companyDomain: string): { name: string; role: string; contact: string } {
  const firstNames = ['John', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'James', 'Anna'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
  
  const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  const role = STAKEHOLDER_ROLES[Math.floor(Math.random() * STAKEHOLDER_ROLES.length)];
  const contact = generateRandomEmail(name, companyDomain);
  
  return { name, role, contact };
}

function generateRandomDate(startDays: number, endDays: number): string {
  const start = new Date();
  start.setDate(start.getDate() + startDays);
  const end = new Date();
  end.setDate(end.getDate() + endDays);
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toISOString().split('T')[0];
}

function generateRandomBudget(): { license: number; services: number; maintenance: number; total: number } {
  const license = Math.floor(Math.random() * 500000) + 100000;
  const services = Math.floor(Math.random() * 200000) + 50000;
  const maintenance = Math.floor(Math.random() * 100000) + 25000;
  return {
    license,
    services,
    maintenance,
    total: license + services + maintenance
  };
}

export function generateDummyOpportunity(salesReps: User[]): Omit<BlockchainOpportunity, 'id' | 'created_at'> {
  const company = COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
  const randomSalesRep = salesReps[Math.floor(Math.random() * salesReps.length)];
  const randomCountry = countries[Math.floor(Math.random() * countries.length)];
  const randomIndustry = INDUSTRIES[Math.floor(Math.random() * INDUSTRIES.length)];
  const randomLeadSource = LEAD_SOURCES[Math.floor(Math.random() * LEAD_SOURCES.length)];
  const randomUseCase = USE_CASES[Math.floor(Math.random() * USE_CASES.length)];
  
  const stages: BlockchainOpportunity['stage'][] = ['new', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost'];
  const priorities: BlockchainOpportunity['priority'][] = ['low', 'medium', 'high'];
  const platformTypes: BlockchainOpportunity['platform_type'][] = ['public', 'private', 'hybrid'];
  const deploymentTypes: BlockchainOpportunity['deployment_type'][] = ['cloud', 'on-premise', 'hybrid'];
  const licenseTypes: BlockchainOpportunity['license_type'][] = ['perpetual', 'subscription', 'usage-based'];
  const forecastCategories = Object.keys(FORECAST_CATEGORIES) as BlockchainOpportunity['forecast_category'][];

  const stage = stages[Math.floor(Math.random() * stages.length)];
  const budget = generateRandomBudget();
  
  return {
    title: `${company.name} - ${randomUseCase.split(' ')[0]} Implementation`,
    customer_name: company.name,
    contact_info: generateRandomEmail('contact', company.domain),
    sales_rep_id: randomSalesRep?.id || '',
    stage,
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    industry: randomIndustry,
    lead_source: randomLeadSource,
    forecast_category: forecastCategories[Math.floor(Math.random() * forecastCategories.length)],
    estimated_value: budget.total,
    close_date: generateRandomDate(30, 180),
    interaction_log: `Initial meeting conducted with ${company.name} team. Discussed ${randomUseCase.toLowerCase()} requirements and technical architecture. Client showed strong interest in implementation.`,
    reason_lost: stage === 'closed_lost' ? 'Budget constraints and timing issues.' : undefined,
    
    platform_type: platformTypes[Math.floor(Math.random() * platformTypes.length)],
    deployment_type: deploymentTypes[Math.floor(Math.random() * deploymentTypes.length)],
    license_type: licenseTypes[Math.floor(Math.random() * licenseTypes.length)],
    
    country: randomCountry.code,
    use_case: randomUseCase,
    notes: `Client has existing systems that need integration. Key focus areas: security, scalability, and compliance.`,
    target_countries: [randomCountry.code],
    
    technical_requirements: {
      nodes: Math.floor(Math.random() * 10) + 3,
    },
    
    stakeholders: [
      generateRandomStakeholder(company.domain),
      generateRandomStakeholder(company.domain),
      generateRandomStakeholder(company.domain)
    ].slice(0, Math.floor(Math.random() * 2) + 2), // Random 2-3 stakeholders
    
    budget
  };
}