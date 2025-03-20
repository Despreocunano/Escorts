import React from 'react';
import type { Model } from '../../types/database.types';

interface ModelGalleryProps {
  model: Model;
}

export default function ModelGallery({ model }: ModelGalleryProps) {
  if (!model.videos?.length && !model.gallery?.length) return null;

  return (
    <div>
      <h2 className="text-lg font-light mb-8 uppercase tracking-wider">Galería</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Videos first */}
        {model.videos?.map((video: string, index: number) => (
          <div key={`video-${index}`} className="aspect-[3/4] bg-[#1A1A1A] overflow-hidden rounded-lg relative group">
            <video
              src={video}
              className="w-full h-full object-cover"
              preload="metadata"
              poster={model.main_image}
              data-video={index}
            />
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300"
              data-overlay={index}
            >
              <button 
                className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm transition-transform duration-300 hover:scale-110"
                data-play-button={index}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-8 h-8 text-white"
                  data-play-icon={index}
                >
                  <path 
                    fillRule="evenodd" 
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-white hidden"
                  data-pause-icon={index}
                >
                  <path
                    fillRule="evenodd"
                    d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
        
        {/* Images after videos */}
        {model.gallery?.map((image: string, index: number) => (
          <div key={`image-${index}`} className="aspect-[3/4] bg-[#1A1A1A] overflow-hidden rounded-lg">
            <img
              src={image}
              alt={`${model.name} gallery`}
              className="w-full h-full object-cover"
              loading={index < 8 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
}