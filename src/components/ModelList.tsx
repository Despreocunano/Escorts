import { useEffect, useState } from 'react';
import { ModelsService } from '../services/models.service';
import type { Model } from '../types/database.types';

export default function ModelList() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const modelsService = ModelsService.getInstance();
    
    async function fetchModels() {
      try {
        const data = await modelsService.getAllModels();
        setModels(data);
      } catch (error) {
        console.error('Error fetching models:', error);
        setError('fetch_error');
      } finally {
        setLoading(false);
      }
    }

    fetchModels();
  }, []);

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

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {models.map((model) => (
        <div key={model.id} className="flex flex-col">
          <a 
            href={`/modelos/${model.id}`}
            className="relative aspect-[3/4] bg-gray-900 rounded-lg mb-4 overflow-hidden"
          >
            <img
              src={model.main_image}
              alt={model.name}
              className="h-full w-full object-cover"
            />
            {model.videos && model.videos.length > 0 && (
              <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full z-10">
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
          </a>
          <div className="flex flex-col items-center">
            <h3 className="text-white text-sm tracking-[0.2em] hover:text-gray-300 transition-colors mb-4">{model.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
              <div className="bg-[#1A1A1A] py-3 px-4 rounded text-center">
                <p className="text-gray-400 text-xs mb-1">Tarifa</p>
                <p className="text-white text-sm">
                  {model.rate ? `$${model.rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}` : 'Consultar'}
                </p>
              </div>
              <div className="bg-[#1A1A1A] py-3 px-4 rounded text-center">
                <p className="text-gray-400 text-xs mb-1">Zona</p>
                <p className="text-white text-sm">
                  {model.area || 'No especificada'}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}