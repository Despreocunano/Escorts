import React from 'react';
import type { Model } from '../../types/database.types';
import OnlineStatusIndicator from '../OnlineStatusIndicator';

interface ModelHeaderProps {
  model: Model;
}

export default function ModelHeader({ model }: ModelHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center">
        <h1 className="text-3xl font-medium">{model.name}</h1>
        {model.age && (
          <>
            <span className="mx-3 text-[#9F8E6A] text-3xl">•</span>
            <span className="text-gray-400 text-2xl">{model.age} años</span>
          </>
        )}
      </div>
      <OnlineStatusIndicator 
        modelId={model.id} 
        initialIsOnline={model.is_online} 
        showText={true}
      />
    </div>
  );
}