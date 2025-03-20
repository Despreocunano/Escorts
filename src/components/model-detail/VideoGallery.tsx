import React from 'react';

interface VideoGalleryProps {
  videos: string[];
  poster?: string;
}

export default function VideoGallery({ videos, poster }: VideoGalleryProps) {
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
              poster={poster}
            />
          </div>
        ))}
      </div>
    </div>
  );
}