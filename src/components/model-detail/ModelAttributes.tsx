import React from 'react';
import type { Model } from '../../types/database.types';

interface ModelAttributesProps {
  model: Model;
}

export default function ModelAttributes({ model }: ModelAttributesProps) {
  if (!model.atributtes?.length) return null;

  return (
    <div className="mt-12">
      <h2 className="text-lg font-light mb-4 uppercase tracking-wider">Atributos</h2>
      <div className="flex flex-wrap gap-2">
        {model.atributtes.map(attribute => (
          <span key={attribute} className="px-4 py-2 bg-[#1A1A1A] rounded-lg text-sm capitalize">
            {attribute}
          </span>
        ))}
      </div>
    </div>
  );
}