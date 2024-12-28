import { BlockchainOpportunity, User } from '../types';
import { generateDummyOpportunity } from './dummyData';
import db from '../lib/db';

export async function seedDummyData() {
  try {
    // First check if we already have data
    const opportunityCount = await db.opportunities.count();
    if (opportunityCount >= 15) {
      return; // Already seeded
    }

    // Create some sales reps if none exist
    const salesReps = await db.users.where('role').equals('sales_rep').toArray();
    if (salesReps.length === 0) {
      const newReps: User[] = [
        {
          id: crypto.randomUUID(),
          name: 'John Smith',
          email: 'john.smith@example.com',
          role: 'sales_rep',
          created_at: new Date().toISOString()
        },
        {
          id: crypto.randomUUID(),
          name: 'Sarah Johnson',
          email: 'sarah.j@example.com',
          role: 'sales_rep',
          created_at: new Date().toISOString()
        },
        {
          id: crypto.randomUUID(),
          name: 'Michael Chen',
          email: 'michael.c@example.com',
          role: 'sales_rep',
          created_at: new Date().toISOString()
        }
      ];
      
      await db.users.bulkAdd(newReps);
      salesReps.push(...newReps);
    }

    // Generate 15 opportunities with varied data
    const opportunities: BlockchainOpportunity[] = Array.from({ length: 15 }, () => {
      const dummyData = generateDummyOpportunity(salesReps);
      return {
        ...dummyData,
        id: crypto.randomUUID(),
        created_at: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString() // Random date within last 90 days
      } as BlockchainOpportunity;
    });

    // Ensure good distribution of stages and priorities
    const stages: BlockchainOpportunity['stage'][] = ['new', 'qualification', 'proposal', 'negotiation', 'closed'];
    const priorities: BlockchainOpportunity['priority'][] = ['low', 'medium', 'high'];
    
    opportunities.forEach((opp, index) => {
      opp.stage = stages[index % stages.length];
      opp.priority = priorities[index % priorities.length];
      opp.estimated_value = Math.floor(Math.random() * 900000) + 100000; // Random value between 100k and 1M
    });

    await db.opportunities.bulkAdd(opportunities);
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  }
}