import { createClient } from '@supabase/supabase-js';

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// These variables will be available at runtime
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// During build time, use dummy values to allow static generation
const isDevelopment = import.meta.env.DEV;
const url = isDevelopment || isValidUrl(supabaseUrl) ? supabaseUrl : 'https://placeholder-url.supabase.co';
const key = isDevelopment || supabaseKey ? supabaseKey : 'placeholder-key';

export const supabase = createClient(url, key);

// Function to check if we have real credentials
export function hasSupabaseCredentials() {
  return isValidUrl(supabaseUrl) && !!supabaseKey;
}