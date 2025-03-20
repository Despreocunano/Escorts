import { useEffect, useState } from 'react';
import { ModelsService } from '../services/models.service';
import type { Model, ModelCategory } from '../types/database.types';
import ModelCard from './ModelCard';
import ModelListHeader from './ModelListHeader';

interface ModelListProps {
  category?: ModelCategory;
  showTitle?: boolean;
  area?: string;
}

export default function ModelList({ category, showTitle = true, area }: ModelListProps) {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const modelsService = ModelsService.getInstance();
    
    async function fetchModels() {
      try {
        let data;
        if (area) {
          data = await modelsService.getModelsByArea(area);
        } else if (category) {
          data = await modelsService.getModelsByCategory(category);
        } else {
          data = await modelsService.getAllModels();
        }
        setModels(data);
      } catch (error) {
        console.error('Error fetching models:', error);
        setError('fetch_error');
      } finally {
        setLoading(false);
      }
    }

    fetchModels();
  }, [category, area]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col animate-pulse">
            <div className="aspect-[3/4] bg-gray-800 rounded-lg mb-4"></div>
            <div className="flex flex-col items-center">
              <div className="h-6 bg-gray-800 w-32 rounded mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                <div className="h-16 bg-gray-800 rounded"></div>
                <div className="h-16 bg-gray-800 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error === 'fetch_error') {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Error al cargar los SCORTS. Por favor, intenta nuevamente más tarde.</p>
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No hay SCORTS disponibles en esta categoría.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 mt-12">
      <ModelListHeader category={category} showTitle={showTitle} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {models.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </div>
  );
}