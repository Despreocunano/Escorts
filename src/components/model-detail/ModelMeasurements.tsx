import React from 'react';
import type { Model } from '../../types/database.types';

interface ModelMeasurementsProps {
  model: Model;
}

export default function ModelMeasurements({ model }: ModelMeasurementsProps) {
  if (!model.bust && !model.waist && !model.hips) return null;

  return (
    <div className="mt-12">
      <h2 className="text-lg font-light mb-4 uppercase tracking-wider">Medidas</h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        {model.bust && (
          <div className="bg-[#1A1A1A] p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-1">Busto</p>
            <p className="text-white">{model.bust} cm</p>
          </div>
        )}
        {model.waist && (
          <div className="bg-[#1A1A1A] p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-1">Cintura</p>
            <p className="text-white">{model.waist} cm</p>
          </div>
        )}
        {model.hips && (
          <div className="bg-[#1A1A1A] p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-1">Cadera</p>
            <p className="text-white">{model.hips} cm</p>
          </div>
        )}
      </div>
    </div>
  );
}