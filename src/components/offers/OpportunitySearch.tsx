import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import { BlockchainOpportunity, User } from '../../types';
import { searchOpportunities } from '../../utils/opportunitySearch';
import OpportunitySearchResults from './OpportunitySearchResults';
import { useDebounce } from '../../hooks/useDebounce';
import db from '../../lib/db';

interface OpportunitySearchProps {
  onOpportunityFound: (opportunity: BlockchainOpportunity & { sales_rep?: User }) => void;
  isLoading?: boolean;
}

export default function OpportunitySearch({ onOpportunityFound, isLoading }: OpportunitySearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<BlockchainOpportunity[]>([]);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm);

  React.useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearchTerm.trim()) {
        setSearchResults([]);
        setError('');
        return;
      }

      setIsSearching(true);
      setError('');

      try {
        const results = await searchOpportunities(debouncedSearchTerm);
        setSearchResults(results);
        
        if (results.length === 0) {
          setError('No opportunities found');
        }
      } catch (error) {
        console.error('Error searching opportunities:', error);
        setError('Error searching opportunities');
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedSearchTerm]);

  const handleSelect = async (opportunity: BlockchainOpportunity) => {
    try {
      // Fetch sales rep details if available
      let salesRep: User | undefined;
      if (opportunity.sales_rep_id) {
        salesRep = await db.users.get(opportunity.sales_rep_id);
      }

      onOpportunityFound({ ...opportunity, sales_rep: salesRep });
      setSearchResults([]);
      setSearchTerm('');
      toast.success('Opportunity selected');
    } catch (error) {
      console.error('Error fetching sales rep:', error);
      toast.error('Error fetching opportunity details');
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Select Opportunity
        </h3>
        
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search by ID, Name or Customer
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 ${isSearching ? 'text-indigo-500' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter opportunity ID, name or customer..."
                className="block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
        </div>
      </div>

      {searchResults.length > 0 && (
        <OpportunitySearchResults
          results={searchResults}
          onSelect={handleSelect}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}