import { createClient } from '@supabase/supabase-js';

// These variables will be available at runtime
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseKey || ''
);