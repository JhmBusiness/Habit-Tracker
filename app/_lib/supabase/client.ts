// _lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Wrap in a function
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase URL or Anon Key is not defined in environment variables."
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
