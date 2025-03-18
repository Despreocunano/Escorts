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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error === 'credentials_missing') {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Configuración Requerida</h2>
        <p className="text-gray-600 mb-6">
          Para ver los modelos, necesitas configurar la conexión con Supabase. Por favor, sigue estos pasos:
        </p>
        <ol className="text-left text-gray-600 space-y-3 mb-6">
          <li>1. Busca el botón "Connect to Supabase" en la parte superior derecha de la pantalla</li>
          <li>2. Haz clic en el botón para iniciar la configuración</li>
          <li>3. Sigue las instrucciones para conectar tu proyecto con Supabase</li>
        </ol>
        <p className="text-sm text-gray-500">
          Una vez configurado, podrás ver todos los modelos disponibles en esta página.
        </p>
      </div>
    );
  }

  if (error === 'fetch_error') {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error al cargar los modelos. Por favor, intenta nuevamente más tarde.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {models.map((model) => (
        <div key={model.id} className="group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105">
          <img
            src={model.main_image}
            alt={model.name}
            className="h-[400px] w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h3 className="text-xl font-semibold text-white">{model.name}</h3>
            <div className="mt-2 text-sm text-gray-200">
              <p>Altura: {model.height}cm</p>
              <p>Medidas: {model.bust}-{model.waist}-{model.hips}</p>
            </div>
            <a
              href={`/modelos/${model.id}`}
              className="mt-4 inline-block rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100"
            >
              Ver Perfil
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}