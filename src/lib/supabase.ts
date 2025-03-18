import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Las variables de entorno SUPABASE_URL y SUPABASE_ANON_KEY son requeridas. ' +
    'Por favor, haz clic en el botón "Connect to Supabase" en la parte superior derecha para configurar la conexión.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);