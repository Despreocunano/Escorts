import React from 'react';
import type { Model } from '../types/database.types';
import OnlineStatusIndicator from './OnlineStatusIndicator';
import ModelCardInfo from './ModelCardInfo';

interface ModelCardProps {
  model: Model;
}

export default function ModelCard({ model }: ModelCardProps) {
  return (
    <div className="flex flex-col">
      <a 
        href={`/SCORTS/${model.id}`}
        className="relative aspect-[3/4] bg-gray-900 rounded-lg mb-4 overflow-hidden group"
      >
        {model.videos && model.videos.length > 0 ? (
          <>
            <video
              src={model.videos[0]}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={model.main_image}
            />
            <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full z-10 backdrop-blur-sm">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-5 h-5 text-white"
              >
                <path 
                  fillRule="evenodd" 
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
          </>
        ) : (
          <img
            src={model.main_image}
            alt={model.name}
            className="h-full w-full object-cover"
          />
        )}
        {model.is_featured && (
          <div className="absolute top-4 left-4 bg-[#9F8E6A]/30 backdrop-blur-xl px-2 py-1.5 rounded-full z-10 border border-[#9F8E6A]/20 flex items-center gap-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-4 h-4 text-white"
            >
              <path 
                fillRule="evenodd" 
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="text-white text-[10px] md:text-xs font-medium tracking-[0.15em] hidden group-hover:inline">
              DESTACADA
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </a>
      <ModelCardInfo model={model} />
    </div>
  );
}