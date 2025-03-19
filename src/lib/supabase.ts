import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

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

// During SSR, if we don't have the environment variables, use the mock client
export const supabase = import.meta.env.SSR && (!supabaseUrl || !supabaseKey)
  ? mockClient as any
  : createClient(
      supabaseUrl!,
      supabaseKey!,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true
        }
      }
    );