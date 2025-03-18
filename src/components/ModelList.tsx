import { useEffect, useState } from 'react';
import { supabase, hasSupabaseCredentials } from '../lib/supabase';

interface Model {
  id: string;
  name: string;
  height: number;
  bust: number;
  waist: number;
  hips: number;
  main_image: string;
  videos?: string[];
  rate?: number;
  area?: string;
}

export default function ModelList() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchModels() {
      try {
        if (!hasSupabaseCredentials()) {
          setError('credentials_missing');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('models')
          .select('*')
          .order('name');
        
        if (error) throw error;
        setModels(data || []);
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
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error === 'credentials_missing') {
    return (
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-white text-xl font-light mb-4 tracking-wider">CONFIGURACIÓN REQUERIDA</h2>
        <p className="text-gray-400 text-sm">
          Para ver los modelos, necesitas configurar la conexión con Supabase.
        </p>
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
            className="group relative aspect-[3/4] overflow-hidden bg-gray-900 rounded-lg mb-4"
          >
            <img
              src={model.main_image}
              alt={model.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {model.videos && model.videos.length > 0 && (
              <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full">
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
          <div className="text-center">
            <h3 className="text-white text-lg font-light tracking-wider mb-2">{model.name}</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-[#1A1A1A] py-2 px-3 rounded">
                <p className="text-gray-400 text-xs mb-1">Tarifa</p>
                <p className="text-white font-light">
                  {model.rate ? `$${model.rate.toLocaleString()} CLP` : 'Consultar'}
                </p>
              </div>
              <div className="bg-[#1A1A1A] py-2 px-3 rounded">
                <p className="text-gray-400 text-xs mb-1">Zona</p>
                <p className="text-white font-light">
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