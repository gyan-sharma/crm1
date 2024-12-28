import { BlockchainOpportunity } from '../types';
import db from '../lib/db';

export async function searchOpportunities(searchTerm: string): Promise<BlockchainOpportunity[]> {
  const term = searchTerm.toLowerCase().trim();
  
  // If the term looks like an ID (10 characters), try exact match first
  if (term.length === 10) {
    const exactMatch = await db.opportunities.get(term);
    if (exactMatch) {
      return [exactMatch];
    }
  }

  // Search by ID or title
  const allOpportunities = await db.opportunities.toArray();
  return allOpportunities.filter(opp => 
    opp.id.toLowerCase().includes(term) ||
    opp.title.toLowerCase().includes(term) ||
    opp.customer_name.toLowerCase().includes(term)
  );
}