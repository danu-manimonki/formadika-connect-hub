
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nbxswbevtirsqrdxtsnf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ieHN3YmV2dGlyc3FyZHh0c25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0Mjg1MjEsImV4cCI6MjA2MTAwNDUyMX0.HH-4NHOsrraS9HLqIATLIW2q9BJFQPVTLwBcmBChGgE";

// Buat client Supabase dengan konfigurasi autentikasi yang tepat
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true, // Simpan sesi di localStorage
    autoRefreshToken: true, // Refresh token otomatis
  }
});
