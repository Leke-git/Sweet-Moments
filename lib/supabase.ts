import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client initialization.
 * The URL and Anon Key are retrieved from the .env file via process.env.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if both required environment variables are present and not empty strings
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl!, supabaseAnonKey!) 
  : null as any;
