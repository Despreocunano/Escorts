import { supabase } from '../lib/supabase';
import type { Model } from '../types/database.types';

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
        .order('is_featured', { ascending: false })
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching models:', error);
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
        .order('is_featured', { ascending: false })
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching models:', error);
      throw error;
    }
  }

  async getFilteredModels(filters: {
    hasVideos?: boolean;
    hasVisibleFace?: boolean;
    hasExperiences?: boolean;
    isAvailableNow?: boolean;
    isOnPromotion?: boolean;
  }): Promise<Model[]> {
    try {
      let query = supabase
        .from('models')
        .select('*')
        .eq('is_active', true);

      if (filters.hasVideos) {
        query = query.not('videos', 'is', null).gt('videos', '{}');
      }
      
      if (filters.isAvailableNow) {
        query = query.eq('is_available', true);
      }

      if (filters.isOnPromotion) {
        query = query.eq('on_promotion', true);
      }

      const { data, error } = await query
        .order('is_featured', { ascending: false })
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching filtered models:', error);
      throw error;
    }
  }
}