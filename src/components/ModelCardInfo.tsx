import React from 'react';
import type { Model } from '../types/database.types';
import OnlineStatusIndicator from './OnlineStatusIndicator';

interface ModelCardInfoProps {
  model: Model;
}

export default function ModelCardInfo({ model }: ModelCardInfoProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center">
          <h3 className="text-white text-sm tracking-[0.2em] font-medium hover:text-gray-300 transition-colors">
            {model.name}
          </h3>
          {model.age && (
            <>
              <span className="mx-2 text-[#9F8E6A]">•</span>
              <span className="text-gray-400 text-sm">{model.age} años</span>
            </>
          )}
        </div>
        <OnlineStatusIndicator 
          modelId={model.id} 
          initialIsOnline={model.is_online} 
          className="!py-0.5" 
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
        <div className="bg-[#1A1A1A] py-3 px-4 rounded">
          <div className="flex items-center justify-center gap-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-4 h-4 text-gray-400"
            >
              <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
              <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd" />
            </svg>
            <p className="text-white text-sm">
              {model.rate ? `$${model.rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}` : 'Consultar'}
            </p>
          </div>
        </div>
        <div className="bg-[#1A1A1A] py-3 px-2 rounded">
          <div className="flex items-center justify-center gap-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-4 h-4 text-gray-400"
            >
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <p className="text-white text-sm">
              {model.area || 'No especificada'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}