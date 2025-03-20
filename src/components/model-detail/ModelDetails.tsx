import React from 'react';
import type { Model } from '../../types/database.types';
import ModelHeader from './ModelHeader';
import ModelMeasurements from './ModelMeasurements';
import ModelServices from './ModelServices';
import ModelAttributes from './ModelAttributes';

interface ModelDetailsProps {
  model: Model;
}

export default function ModelDetails({ model }: ModelDetailsProps) {
  return (
    <div className="flex-grow">
      <ModelHeader model={model} />
      
      {model.description && (
        <p className="text-gray-300 leading-relaxed mb-12">{model.description}</p>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {model.height && (
          <div>
            <p className="text-gray-400 text-sm mb-1">Estatura</p>
            <p className="text-white">{model.height} cms</p>
          </div>
        )}
        {model.weight && (
          <div>
            <p className="text-gray-400 text-sm mb-1">Peso</p>
            <p className="text-white">{model.weight} kgs</p>
          </div>
        )}
        {model.skin_tone && (
          <div>
            <p className="text-gray-400 text-sm mb-1">Tez</p>
            <p className="text-white">{model.skin_tone}</p>
          </div>
        )}
        {model.schedule && (
          <div>
            <p className="text-gray-400 text-sm mb-1">Horario</p>
            <p className="text-white">{model.schedule}</p>
          </div>
        )}
        {model.location && (
          <div>
            <p className="text-gray-400 text-sm mb-1">Lugar</p>
            <p className="text-white">{model.location}</p>
          </div>
        )}
      </div>

      <ModelMeasurements model={model} />
      <ModelServices />
      <ModelAttributes />
    </div>
  );
}