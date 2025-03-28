import React, { useState } from 'react';
import FilterButtons from './FilterButtons';
import type { FilterState } from '../../types/filters.types';

export default function HeroFilters() {
  const [filters, setFilters] = useState<FilterState>({
    hotels: false,
    domicilio: false
  });

  const handleFilterChange = (filterId: keyof FilterState) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterId]: !prevFilters[filterId]
    }));
  };

  return (
    <FilterButtons 
      filters={filters} 
      onFilterChange={handleFilterChange} 
    />
  );
}