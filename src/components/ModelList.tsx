import { useEffect, useState } from 'react';
import { ModelsService } from '../services/models.service';
import type { Model, ModelCategory } from '../types/database.types';

interface ModelListProps {
  category?: ModelCategory;
  showTitle?: boolean;
  area?: string;
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
        <p className="text-gray-400">Error al cargar los modelos. Por favor, intenta nuevamente más tarde.</p>
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No hay modelos disponibles en esta categoría.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 mt-12">
      {showTitle && category && (
        <div className="space-y-6">
          <div className="inline-block">
            <h2 className="text-4xl font-light text-white tracking-[0.2em] border-b-2 border-[#9F8E6A] pb-4">
              {CATEGORY_TITLES[category]}
            </h2>
          </div>
          <p className="text-gray-400 text-base leading-relaxed tracking-wide max-w-3xl">
            {CATEGORY_DESCRIPTIONS[category]}
          </p>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {models.map((model) => (
          <div key={model.id} className="flex flex-col">
            <a 
              href={`/modelos/${model.id}`}
              className="relative aspect-[3/4] bg-gray-900 rounded-lg mb-4 overflow-hidden group"
            >
              <img
                src={model.main_image}
                alt={model.name}
                className="h-full w-full object-cover"
              />
              {model.videos && model.videos.length > 0 && (
                <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full z-10 backdrop-blur-sm">
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
              )}
              {model.is_featured && (
                <div className="absolute top-4 left-4 bg-[#9F8E6A]/30 backdrop-blur-xl px-3 py-1.5 rounded-full z-10 border border-[#9F8E6A]/20">
                  <span className="text-white text-xs font-medium tracking-[0.15em]">DESTACADA</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <div className="flex flex-col items-center">
              <h3 className="text-white text-sm tracking-[0.2em] hover:text-gray-300 transition-colors mb-4">{model.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                <div className="bg-[#1A1A1A] py-3 px-4 rounded">
                  <div className="flex items-center justify-center gap-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-4 h-4 text-gray-400"
                    >
                      <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                      <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd" />
                    </svg>
                    <p className="text-white text-sm">
                      {model.rate ? `$${model.rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}` : 'Consultar'}
                    </p>
                  </div>
                </div>
                <div className="bg-[#1A1A1A] py-3 px-2 rounded">
                  <div className="flex items-center justify-center gap-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-4 h-4 text-gray-400"
                    >
                      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-white text-sm">
                      {model.area || 'No especificada'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}