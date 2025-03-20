import React from 'react';

const attributes = [
  'Profesional',
  'Puntual',
  'Fotogénica',
  'Carismática',
  'Versátil',
  'Elegante'
];

export default function ModelAttributes() {
  return (
    <div className="mt-12">
      <h2 className="text-lg font-light mb-4 uppercase tracking-wider">Atributos</h2>
      <div className="flex flex-wrap gap-2">
        {attributes.map(attribute => (
          <span key={attribute} className="px-4 py-2 bg-[#1A1A1A] rounded-lg text-sm">
            {attribute}
          </span>
        ))}
      </div>
    </div>
  );
}