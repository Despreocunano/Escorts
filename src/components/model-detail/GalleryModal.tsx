import React, { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";

// Import styles directly in the component
const styles = `
  @import "yet-another-react-lightbox/styles.css";
  @import "yet-another-react-lightbox/plugins/video.css";
`;

interface GalleryModalProps {
  images: string[];
  videos?: string[];
}

export default function GalleryModal({ images, videos = [] }: GalleryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  // Combine videos and images into slides
  const slides = [
    ...videos.map(video => ({
      type: "video" as const,
      width: 1080,
      height: 1440,
      poster: images[0], // Use first image as poster
      sources: [{ src: video, type: "video/mp4" }]
    })),
    ...images.map(image => ({
      src: image,
      width: 1080,
      height: 1440,
    }))
  ];

  const openLightbox = (index: number) => {
    setStartIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <div
            key={`video-${index}`}
            className="aspect-[3/4] bg-[#1A1A1A] overflow-hidden rounded-lg relative group cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <video
              src={video}
              className="w-full h-full object-cover"
              preload="metadata"
              poster={images[0]}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/30 transition-colors">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-8 h-8 text-white"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
        
        {images.map((image, index) => (
          <div
            key={`image-${index}`}
            className="aspect-[3/4] bg-[#1A1A1A] overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => openLightbox(videos.length + index)}
          >
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading={index < 8 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={startIndex}
        slides={slides}
        plugins={[Video]}
        carousel={{
          finite: slides.length <= 5
        }}
        controller={{
          closeOnBackdropClick: true
        }}
        render={{
          buttonPrev: slides.length <= 1 ? () => null : undefined,
          buttonNext: slides.length <= 1 ? () => null : undefined,
        }}
        video={{
          autoPlay: true,
          controls: true,
        }}
      />
    </>
  );
}