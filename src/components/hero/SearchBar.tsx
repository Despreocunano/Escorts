import React from 'react';

export default function SearchBar() {
  return (
    <div className="w-full max-w-3xl mb-12">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Escribe lo que buscas, servicio, ubicación, contextura, apariencia, etc..." 
          className="w-full bg-black/80 backdrop-blur-md text-white px-6 py-4 rounded-lg border border-white/20 pr-12 focus:outline-none focus:border-red-800"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}