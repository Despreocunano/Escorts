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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {models.map((model) => (
        <a 
          key={model.id} 
          href={`/modelos/${model.id}`}
          className="group relative aspect-[3/4] overflow-hidden bg-gray-900"
        >
          <img
            src={model.main_image}
            alt={model.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white text-lg font-light tracking-wider">{model.name}</h3>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}