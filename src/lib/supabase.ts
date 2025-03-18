import { createClient } from '@supabase/supabase-js';

// These variables will be available at runtime in the browser
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    'Supabase credentials not found. Please make sure you have connected to Supabase using the "Connect to Supabase" button.'
  );
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');