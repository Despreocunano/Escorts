import React from 'react';

const services = [
  'Sesiones fotográficas',
  'Desfiles de moda',
  'Eventos corporativos',
  'Campañas publicitarias',
  'Catálogos de moda',
  'Videos promocionales'
];

export default function ModelServices() {
  return (
    <div className="mt-12">
      <h2 className="text-lg font-light mb-4 uppercase tracking-wider">Servicios</h2>
      <div className="flex flex-wrap gap-2">
        {services.map(service => (
          <span key={service} className="px-4 py-2 bg-[#1A1A1A] rounded-lg text-sm">
            {service}
          </span>
        ))}
      </div>
    </div>
  );
}