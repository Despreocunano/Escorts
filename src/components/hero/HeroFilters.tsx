import React, { useState, useEffect } from 'react';
import { ModelsService } from '../../services/models.service';
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

  useEffect(() => {
    const modelsService = ModelsService.getInstance();
    const applyFilters = async () => {
      try {
        // Here you would typically call your search or filter function
        // For now, we'll just log the filter state
        console.log('Active filters:', filters);
      } catch (error) {
        console.error('Error applying filters:', error);
      }
    };

    applyFilters();
  }, [filters]);

  return (
    <div className="w-full">
      <FilterButtons 
        filters={filters} 
        onFilterChange={handleFilterChange} 
      />
    </div>
  );
}