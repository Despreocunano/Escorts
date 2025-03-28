import React from 'react';

interface VideoGalleryProps {
  videos: string[];
  poster?: string;
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  if (!videos?.length) return null;

  return (
    <div className="mb-12">
      <h3 className="text-lg font-light mb-6 uppercase tracking-wider">Videos</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <div
            key={`video-${index}`}
            className="aspect-[3/4] bg-[#1A1A1A] overflow-hidden rounded-lg relative group"
          >
            <video
              src={video}
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              playsInline
            />
            <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full backdrop-blur-sm">
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
          </div>
        ))}
      </div>
    </div>
  );
}