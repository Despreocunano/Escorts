import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY;

// For static site generation, return a mock client during build
const mockClient = {
  from: () => ({
    select: () => ({ data: [] }),
    insert: () => ({ data: null }),
    update: () => ({ data: null }),
    delete: () => ({ data: null }),
    eq: () => ({ data: null }),
    single: () => ({ data: null }),
    order: () => ({ data: [] })
  }),
  auth: {
    getSession: () => ({ data: { session: null } }),
    signInWithPassword: () => ({ data: null }),
    signOut: () => ({ data: null })
  }
};

export const supabase = import.meta.env.SSR && (!supabaseUrl || !supabaseKey)
  ? mockClient as any
  : createClient(
      supabaseUrl || '',
      supabaseKey || ''
    );