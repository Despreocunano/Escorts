import React from 'react';
import type { Model } from '../../types/database.types';
import OnlineStatusIndicator from '../OnlineStatusIndicator';

interface ModelHeaderProps {
  model: Model;
}

export default function ModelHeader({ model }: ModelHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
        <h1 className="text-3xl font-medium">{model.name}</h1>
        {model.verified && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6 text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
          </svg>
        )}
        {model.age && (
          <div className="flex items-center">
            <span className="text-red-800 text-3xl hidden md:inline mx-3">•</span>
            <span className="text-gray-400 text-2xl">{model.age} años</span>
          </div>
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