import { supabase } from '../lib/supabase';
import type { Model, ModelCategory } from '../types/database.types';

export class ModelsService {
  private static instance: ModelsService;
  
  private constructor() {}

  public static getInstance(): ModelsService {
    if (!ModelsService.instance) {
      ModelsService.instance = new ModelsService();
    }
    return ModelsService.instance;
  }

  async getAllModels(): Promise<Model[]> {
    try {
      const { data, error } = await supabase
        .from('models')
        .select('*')
        .eq('is_active', true)
        .order('model_category', { ascending: true })
        .order('is_featured', { ascending: false })
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  }

  async getModelsByCategory(category: ModelCategory): Promise<Model[]> {
    try {
      const { data, error } = await supabase
        .from('models')
        .select('*')
        .eq('is_active', true)
        .eq('model_category', category)
        .order('is_featured', { ascending: false })
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching models by category:', error);
      throw error;
    }
  }

  async getModelsByArea(area: string): Promise<Model[]> {
    try {
      const { data, error } = await supabase
        .from('models')
        .select('*')
        .eq('is_active', true)
        .eq('area', area)
        .order('model_category', { ascending: true })
        .order('is_featured', { ascending: false })
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching models by area:', error);
      throw error;
    }
  }

  async getUniqueAreas(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('models')
        .select('area')
        .eq('is_active', true)
        .not('area', 'is', null);

      if (error) throw error;
      
      const areas = Array.from(new Set(data.map(model => model.area)));
      return areas.filter(Boolean).sort();
    } catch (error) {
      console.error('Error fetching unique areas:', error);
      throw error;
    }
  }

  async getModelById(id: string): Promise<Model | null> {
    try {
      const { data, error } = await supabase
        .from('models')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching model by id:', error);
      throw error;
    }
  }

  async searchModels(query: string): Promise<Model[]> {
    try {
      const { data, error } = await supabase
        .from('models')
        .select('*')
        .eq('is_active', true)
        .or(`
          name.ilike.%${query}%,
          description.ilike.%${query}%,
          area.ilike.%${query}%,
          location.ilike.%${query}%
        `)
        .order('model_category', { ascending: true })
        .order('is_featured', { ascending: false })
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching models:', error);
      throw error;
    }
  }
}