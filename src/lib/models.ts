import { supabase } from './supabase';

export interface Model {
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
  age?: number;
  weight?: number;
  skin_tone?: string;
  schedule?: string;
  location?: string;
  whatsapp?: string;
  description?: string;
  gallery?: string[];
  shoe_size?: number;
  eyes?: string;
  hair?: string;
  created_at?: string;
  updated_at?: string;
}

export async function getAllModels(): Promise<Model[]> {
  const { data, error } = await supabase
    .from('models')
    .select('*')
    .order('name');

  if (error) throw new Error(`Error fetching models: ${error.message}`);
  if (!data) return [];
  return data;
}

export async function getModelById(id: string): Promise<Model | null> {
  const { data, error } = await supabase
    .from('models')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(`Error fetching model: ${error.message}`);
  if (!data) return null;
  return data;
}

export async function getAllModelIds(): Promise<{ id: string }[]> {
  const { data, error } = await supabase
    .from('models')
    .select('id');

  if (error) throw new Error(`Error fetching model IDs: ${error.message}`);
  if (!data) return [];
  return data;
}