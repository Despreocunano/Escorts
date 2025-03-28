import React from 'react';

const filters = [
  { id: 'video', label: 'CON VIDEO' },
  { id: 'face', label: 'CARA VISIBLE' },
  { id: 'experiences', label: 'CON EXPERIENCIAS' },
  { id: 'available', label: 'DISPONIBLE AHORA' },
  { id: 'promotion', label: 'EN PROMOCIÓN' }
];

export default function FilterButtons() {
  return (
    <div className="w-full overflow-x-auto pb-4 md:pb-0 no-scrollbar">
      <div className="flex md:flex-wrap md:justify-center gap-3 min-w-min">
        {filters.map(filter => (
          <button
            key={filter.id}
            className="flex-shrink-0 px-6 py-2.5 bg-red-800 hover:bg-[#991B1B] text-white rounded text-sm tracking-wider transition-colors whitespace-nowrap"
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}