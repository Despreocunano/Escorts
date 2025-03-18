import { createClient } from '@supabase/supabase-js';

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// These variables will be available at runtime in the browser
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Default to a dummy URL during build time
const fallbackUrl = 'https://placeholder-url.supabase.co';
const fallbackKey = 'placeholder-key';

// Use fallback values during build, but real values at runtime
const url = isValidUrl(supabaseUrl) ? supabaseUrl : fallbackUrl;
const key = supabaseKey || fallbackKey;

export const supabase = createClient(url, key);

// Export a function to check if we have real credentials
export function hasSupabaseCredentials() {
  return isValidUrl(supabaseUrl) && !!supabaseKey;
}