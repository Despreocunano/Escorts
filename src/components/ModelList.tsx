import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

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

  useEffect(() => {
    async function fetchModels() {
      try {
        const { data, error } = await supabase
          .from('models')
          .select('*')
          .order('name');
        
        if (error) throw error;
        setModels(data || []);
      } catch (error) {
        console.error('Error fetching models:', error);
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