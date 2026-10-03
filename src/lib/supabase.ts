import { createClient } from '@supabase/supabase-js';

// The URL and publishable key are designed to be public: they only allow what the
// database's row-level security policies permit (reading published chapters).
// Everything else requires the signed-in admin account.
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? 'https://ryyuuyqcifxlqrmfhjef.supabase.co';
const SUPABASE_KEY = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ?? 'sb_publishable_qwyD3G58_JWRjY1JVLNQCg_xsyrl2dZ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true }
});
