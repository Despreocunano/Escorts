import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY;

// For static site generation, return a mock client during build
if (import.meta.env.SSR && (!supabaseUrl || !supabaseKey)) {
  const mockClient = {
    from: () => ({
      select: () => ({ data: [] }),
      insert: () => ({ data: null }),
      update: () => ({ data: null }),
      delete: () => ({ data: null }),
      eq: () => ({ data: null })
    }),
    auth: {
      getSession: () => ({ data: { session: null } }),
      signInWithPassword: () => ({ data: null }),
      signOut: () => ({ data: null })
    }
  };
  
const supabase = mockClient as any;
} else {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials. Please check your environment variables.');
  }
  
const supabase = createClient(supabaseUrl, supabaseKey);
const supabaseClient = supabase;
const supabaseExport = supabaseClient;
}