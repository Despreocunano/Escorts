import React from 'react';
import type { Model } from '../../types/database.types';
import GalleryModal from './GalleryModal';

interface ModelGalleryProps {
  model: Model;
}

export default function ModelGallery({ model }: ModelGalleryProps) {
  if (!model.videos?.length && !model.gallery?.length) return null;

  return (
    <div>
      <h2 className="text-lg font-light mb-8 uppercase tracking-wider">Galería</h2>
      <GalleryModal 
        images={model.gallery || []} 
        videos={model.videos}
      />
    </div>
  );
}