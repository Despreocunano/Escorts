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
}

export async function getAllModels() {
  const { data, error } = await supabase
    .from('models')
    .select('*')
    .order('name');

  if (error) throw error;
  return data as Model[];
}

export async function getModelById(id: string) {
  const { data, error } = await supabase
    .from('models')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Model;
}

export async function getAllModelIds() {
  const { data, error } = await supabase
    .from('models')
    .select('id');

  if (error) throw error;
  return data;
}