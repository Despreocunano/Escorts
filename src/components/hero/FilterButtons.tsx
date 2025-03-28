import React, { useState } from 'react';

const FILTER_BUTTONS = [
  'VERIFICADA',
  'DISPONIBLE AHORA'
];

export default function FilterButtons() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleFilterClick = (filter: string) => {
    const newFilter = selectedFilter === filter ? null : filter;
    setSelectedFilter(newFilter);
    
    window.dispatchEvent(new CustomEvent('modelFilter', { 
      detail: { filter: newFilter } 
    }));
  };

  return (
    <div className="w-full overflow-x-auto pb-4 md:pb-0 no-scrollbar">
      <div className="flex md:flex-wrap md:justify-center gap-3 min-w-min">
        {FILTER_BUTTONS.map(filter => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`flex-shrink-0 px-6 py-2.5 ${
              selectedFilter === filter 
                ? 'bg-red-900 text-white' 
                : 'bg-red-800 hover:bg-[#991B1B]'
            } text-white rounded text-sm tracking-wider transition-colors whitespace-nowrap`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}