import React from 'react';
import type { FilterState } from '../../types/filters.types';

interface FilterButtonsProps {
  filters: FilterState;
  onFilterChange: (filterId: keyof FilterState) => void;
}

const filters = [
  { id: 'hotels' as const, label: 'HOTELES' },
  { id: 'domicilio' as const, label: 'DOMICILIOS' }
];

export default function FilterButtons({ filters: activeFilters, onFilterChange }: FilterButtonsProps) {
  return (
    <div className="w-full overflow-x-auto pb-4 md:pb-0 no-scrollbar">
      <div className="flex md:flex-wrap md:justify-center gap-3 min-w-min">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`flex-shrink-0 px-6 py-2.5 ${
              activeFilters[filter.id] 
                ? 'bg-red-900 hover:bg-red-800' 
                : 'bg-red-800 hover:bg-[#991B1B]'
            } text-white rounded text-sm tracking-wider transition-colors whitespace-nowrap`}
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}