import React from 'react';
import type { Model } from '../../types/database.types';

interface ModelServicesProps {
  model: Model;
}

export default function ModelServices({ model }: ModelServicesProps) {
  if (!model.services?.length) return null;

  return (
    <div className="mt-12">
      <h2 className="text-lg font-light mb-4 uppercase tracking-wider">Servicios</h2>
      <div className="flex flex-wrap gap-2">
        {model.services.map(service => (
          <span key={service} className="px-4 py-2 bg-[#1A1A1A] rounded-lg text-sm capitalize">
            {service}
          </span>
        ))}
      </div>
    </div>
  );
}