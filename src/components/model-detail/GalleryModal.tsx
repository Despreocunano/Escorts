import React from 'react';
import type { Model } from '../../types/database.types';
import VideoGallery from './VideoGallery';
import ImageGallery from './ImageGallery';

interface ModelGalleryProps {
  model: Model;
}

export default function ModelGallery({ model }: ModelGalleryProps) {
  if (!model.videos?.length && !model.gallery?.length) return null;

  return (
    <div>
      <VideoGallery videos={model.videos || []} poster={model.main_image} />
      <ImageGallery images={model.gallery || []} />
    </div>
  );
}