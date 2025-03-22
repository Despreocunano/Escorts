import React, { useState, useEffect } from 'react';
import type { Model } from '../../types/database.types';
import { supabase } from '../../lib/supabase';

interface ModelProfileProps {
  model: Model;
}

export default function ModelProfile({ model }: ModelProfileProps) {
  const [rate, setRate] = useState<number | undefined>(model.rate);

  useEffect(() => {
    const channel = supabase
      .channel(`model-rate-detail-${model.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'models',
          filter: `id=eq.${model.id}`
        },
        (payload: any) => {
          if (payload.new && typeof payload.new.rate !== 'undefined') {
            setRate(payload.new.rate);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [model.id]);

  return (
    <div className="w-full md:w-[400px] flex-shrink-0">
      <div className="rounded-2xl overflow-hidden aspect-[3/4] mb-6">
        <img
          src={model.main_image}
          alt={model.name}
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
      </div>
      <div className="text-center">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-[#1A1A1A] p-4 rounded-lg">
            <p className="text-gray-400">Tarifa</p>
            <p className="text-white text-sm">
              {rate ? `$${rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}` : 'Consultar'}
            </p>
          </div>
          <div className="bg-[#1A1A1A] p-4 rounded-lg">
            <p className="text-gray-400">Ubicación</p>
            <p className="text-white text-sm">{model.area || 'No especificada'}</p>
          </div>
        </div>
        {model.whatsapp && (
          <a
            href={`https://wa.me/${model.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Contactar por WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}