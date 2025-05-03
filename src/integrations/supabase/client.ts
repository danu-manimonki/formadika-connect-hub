
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nbxswbevtirsqrdxtsnf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ieHN3YmV2dGlyc3FyZHh0c25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0Mjg1MjEsImV4cCI6MjA2MTAwNDUyMX0.HH-4NHOsrraS9HLqIATLIW2q9BJFQPVTLwBcmCBChGgE";

// Set API URL for edge functions
const API_URL = import.meta.env.MODE === 'development' 
  ? 'http://localhost:54321'
  : SUPABASE_URL;

// Add API_URL to window for access in components
if (typeof window !== 'undefined') {
  window.API_URL = API_URL;
}

// Make API_URL available globally
declare global {
  interface Window {
    API_URL: string;
  }
}

// Assign to import.meta.env for use in components
if (import.meta.env.VITE_API_URL === undefined) {
  import.meta.env.VITE_API_URL = API_URL;
}

// Create Supabase client with proper authentication configuration
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true, // Store session in localStorage
    autoRefreshToken: true, // Auto-refresh token when needed
  }
});
