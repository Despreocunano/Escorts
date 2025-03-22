import React, { useState, useEffect } from 'react';
import type { Model } from '../../types/database.types';
import { supabase } from '../../lib/supabase';
import ModelProfile from './ModelProfile';
import ModelDetails from './ModelDetails';
import ModelGallery from './ModelGallery';

interface ModelDetailContainerProps {
  model: Model;
}

export default function ModelDetailContainer({ model: initialModel }: ModelDetailContainerProps) {
  const [model, setModel] = useState<Model>(initialModel);
  const [rate, setRate] = useState<number | undefined>(initialModel.rate);
  const [isOnline, setIsOnline] = useState<boolean>(initialModel.is_online);

  useEffect(() => {
    // Subscribe to model changes
    const channel = supabase
      .channel(`model-updates-${model.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'models',
          filter: `id=eq.${model.id}`
        },
        (payload: any) => {
          if (payload.new) {
            // Update rate if it changed
            if (typeof payload.new.rate !== 'undefined') {
              setRate(payload.new.rate);
            }
            // Update online status if it changed
            if (typeof payload.new.is_online !== 'undefined') {
              setIsOnline(payload.new.is_online);
            }
            // Update full model data
            setModel(currentModel => ({
              ...currentModel,
              ...payload.new
            }));
          }
        }
      )
      .subscribe();

    // Fetch latest data on mount
    const fetchLatestData = async () => {
      const { data } = await supabase
        .from('models')
        .select('*')
        .eq('id', model.id)
        .single();
      
      if (data) {
        setModel(data);
        setRate(data.rate);
        setIsOnline(data.is_online);
      }
    };

    fetchLatestData();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [model.id]);

  const modelWithUpdates: Model = {
    ...model,
    rate,
    is_online: isOnline
  };

  return (
    <div className="min-h-screen bg-black text-white pt-36 pb-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-start mb-24">
          <ModelProfile model={modelWithUpdates} />
          <ModelDetails model={modelWithUpdates} />
        </div>
        <ModelGallery model={modelWithUpdates} />
      </div>
    </div>
  );
}