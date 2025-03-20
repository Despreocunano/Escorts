import React from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/style.css';

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  if (!images?.length) return null;

  return (
    <div>
      <h3 className="text-lg font-light mb-6 uppercase tracking-wider">Galería</h3>
      <Gallery>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Item
              key={`image-${index}`}
              original={image}
              thumbnail={image}
              width={1080}
              height={1440}
            >
              {({ ref, open }) => {
                // Create a ref callback that properly handles the type conversion
                const setRef = (node: HTMLDivElement | null) => {
                  if (typeof ref === 'function') {
                    ref(node);
                  } else if (ref) {
                    (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                  }
                };

                return (
                  <div 
                    ref={setRef}
                    onClick={open}
                    className="aspect-[3/4] bg-[#1A1A1A] overflow-hidden rounded-lg group cursor-pointer"
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading={index < 8 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                );
              }}
            </Item>
          ))}
        </div>
      </Gallery>
    </div>
  );
}