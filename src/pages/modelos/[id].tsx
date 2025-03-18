import { useEffect, useState } from 'react';
import { supabase, hasSupabaseCredentials } from '../../lib/supabase';

interface Model {
  id: string;
  name: string;
  height: number;
  bust: number;
  waist: number;
  hips: number;
  shoe_size: number;
  eyes: string;
  hair: string;
  main_image: string;
  gallery: string[];
}

export default function ModelDetail() {
  const [model, setModel] = useState<Model | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const id = window.location.pathname.split('/').pop();

  useEffect(() => {
    async function fetchModel() {
      try {
        if (!hasSupabaseCredentials()) {
          setError('credentials_missing');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('models')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        setModel(data);
      } catch (error) {
        console.error('Error fetching model:', error);
        setError('fetch_error');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchModel();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error === 'credentials_missing') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Configuración Requerida</h2>
          <p className="text-gray-600 mb-6">
            Para ver los detalles del modelo, necesitas configurar la conexión con Supabase. Por favor, sigue estos pasos:
          </p>
          <ol className="text-left text-gray-600 space-y-3 mb-6">
            <li>1. Busca el botón "Connect to Supabase" en la parte superior derecha de la pantalla</li>
            <li>2. Haz clic en el botón para iniciar la configuración</li>
            <li>3. Sigue las instrucciones para conectar tu proyecto con Supabase</li>
          </ol>
          <div className="mt-6">
            <a
              href="/modelos"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Volver a Modelos
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (error === 'fetch_error') {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-600">Error al cargar los detalles del modelo. Por favor, intenta nuevamente más tarde.</p>
        <a
          href="/modelos"
          className="mt-4 inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Volver a Modelos
        </a>
      </div>
    );
  }

  if (!model) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <img
            src={model.main_image}
            alt={model.name}
            className="w-full h-[600px] object-cover rounded-lg shadow-lg"
          />
          <div className="grid grid-cols-3 gap-4">
            {model.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${model.name} gallery`}
                className="w-full h-32 object-cover rounded-lg shadow-md hover:opacity-75 transition-opacity cursor-pointer"
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{model.name}</h1>
          
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div className="space-y-2">
              <p><span className="font-semibold">Altura:</span> {model.height}cm</p>
              <p><span className="font-semibold">Busto:</span> {model.bust}cm</p>
              <p><span className="font-semibold">Cintura:</span> {model.waist}cm</p>
              <p><span className="font-semibold">Cadera:</span> {model.hips}cm</p>
            </div>
            <div className="space-y-2">
              <p><span className="font-semibold">Calzado:</span> {model.shoe_size}</p>
              <p><span className="font-semibold">Ojos:</span> {model.eyes}</p>
              <p><span className="font-semibold">Cabello:</span> {model.hair}</p>
            </div>
          </div>

          <div className="pt-6">
            <a
              href="/modelos"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Volver a Modelos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}