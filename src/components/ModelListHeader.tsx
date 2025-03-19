import React from 'react';
import type { ModelCategory } from '../types/database.types';

interface ModelListHeaderProps {
  category?: ModelCategory;
  showTitle: boolean;
}

const CATEGORY_TITLES = {
  'VIP': 'MODELOS VIP EXCLUSIVAS',
  'PREMIUM': 'MODELOS PREMIUM SELECTAS',
  'GOLD': 'MODELOS GOLD DISTINGUIDAS'
};

const CATEGORY_DESCRIPTIONS = {
  'VIP': 'Nuestra colección más distinguida de modelos VIP, representando la máxima expresión de elegancia y sofisticación. Una experiencia exclusiva diseñada para los más exigentes.',
  'PREMIUM': 'Descubre nuestra selección Premium, donde cada modelo combina belleza excepcional con profesionalismo incomparable. Una experiencia superior que supera expectativas.',
  'GOLD': 'La categoría Gold presenta una cuidadosa selección de modelos que destacan por su belleza natural y carisma único. Calidad y distinción garantizada en cada encuentro.'
};

export default function ModelListHeader({ category, showTitle }: ModelListHeaderProps) {
  if (!showTitle || !category) return null;

  return (
    <div className="space-y-6">
      <div className="inline-block">
        <h2 className="text-4xl font-light text-white tracking-[0.2em] border-b-2 border-[#9F8E6A] pb-4">
          {CATEGORY_TITLES[category]}
        </h2>
      </div>
      <p className="text-gray-400 text-base leading-relaxed tracking-wide">
        {CATEGORY_DESCRIPTIONS[category]}
      </p>
    </div>
  );
}