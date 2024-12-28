import React, { useState } from 'react';
import { BlockchainOpportunity, User } from '../../types';
import SearchBar from './filters/SearchBar';
import FilterBar from './filters/FilterBar';
import Pagination from './Pagination';
import OpportunityTable from './table/OpportunityTable';

interface OpportunityListProps {
  opportunities: (BlockchainOpportunity & { sales_rep?: User })[];
  onEdit: (opportunity: BlockchainOpportunity) => void;
  onDelete: (opportunity: BlockchainOpportunity) => void;
}

export default function OpportunityList({ opportunities, onEdit, onDelete }: OpportunityListProps) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    stage: '',
    priority: '',
    minValue: '',
    maxValue: '',
    country: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and search logic
  const filteredOpportunities = opportunities.filter(opp => {
    // Search filter
    const matchesSearch = search === '' || 
      opp.title.toLowerCase().includes(search.toLowerCase()) ||
      opp.customer_name.toLowerCase().includes(search.toLowerCase());

    // Stage filter
    const matchesStage = !filters.stage || opp.stage === filters.stage;

    // Priority filter
    const matchesPriority = !filters.priority || opp.priority === filters.priority;

    // Value range filter
    const matchesValue = (!filters.minValue || opp.estimated_value >= Number(filters.minValue)) &&
                        (!filters.maxValue || opp.estimated_value <= Number(filters.maxValue));

    // Country filter
    const matchesCountry = !filters.country.length || 
      opp.target_countries?.some(country => filters.country.includes(country));

    return matchesSearch && matchesStage && matchesPriority && matchesValue && matchesCountry;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);
  const paginatedOpportunities = filteredOpportunities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-64">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <FilterBar filters={filters} onFilterChange={setFilters} />
      </div>

      <OpportunityTable
        opportunities={paginatedOpportunities}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}