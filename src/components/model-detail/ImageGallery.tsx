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
      <Gallery options={{
        showAnimationDuration: 250,
        hideAnimationDuration: 250,
        wheelToZoom: true,
        imageClickAction: 'zoom',
        tapAction: 'zoom',
        preloaderDelay: 0,
        bgOpacity: 0.95,
        padding: { top: 20, bottom: 20, left: 20, right: 20 },
      }}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Item
              key={`image-${index}`}
              original={image}
              thumbnail={image}
              width={1080}
              height={1440}
              content={
                <div className="pswp__content">
                  <img
                    src={image}
                    className="pswp__img"
                    alt=""
                    style={{
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>
              }
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

      <style>{`
        /* Custom PhotoSwipe Styles */
        .pswp {
          --pswp-bg: rgba(0, 0, 0, 0.95);
        }

        .pswp__img {
          object-fit: contain;
          max-height: calc(100vh - 40px);
          margin: auto;
          transition: transform 0.25s ease-in-out;
        }

        .pswp__button {
          color: #fff;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .pswp__button:hover {
          opacity: 1;
        }

        .pswp__top-bar {
          background: transparent !important;
        }

        .pswp__content {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .pswp__container {
          transition: transform 0.25s ease-in-out;
        }

        .pswp__zoom-wrap {
          transition: transform 0.25s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}