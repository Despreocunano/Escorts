import { supabase } from './supabase';
import type { Model } from './types';

export async function getAllModels() {
  const { data, error } = await supabase
    .from('models')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
}

export async function getModelById(id: string) {
  const { data, error } = await supabase
    .from('models')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createModel(modelData: Partial<Model>) {
  const { data, error } = await supabase
    .from('models')
    .insert([modelData]);
  
  if (error) throw error;
  return data;
}

export async function updateModel(id: string, modelData: Partial<Model>) {
  const { data, error } = await supabase
    .from('models')
    .update(modelData)
    .eq('id', id);
  
  if (error) throw error;
  return data;
}

export async function deleteModel(id: string) {
  const { error } = await supabase
    .from('models')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

export async function checkAdminStatus(userId: string) {
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
}