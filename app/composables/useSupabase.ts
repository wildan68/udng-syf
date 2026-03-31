import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let browserClient: SupabaseClient | null = null

/**
 * Client Supabase (anon key dari runtimeConfig).
 * Dipakai di client; pastikan SUPABASE_URL & SUPABASE_KEY di .env terisi.
 */
export function useSupabase(): SupabaseClient | null {
  if (import.meta.server) {
    return null
  }
  const config = useRuntimeConfig()
  const url = config.public.supabaseUrl as string | undefined
  const key = config.public.supabaseKey as string | undefined
  if (!url || !key) {
    return null
  }
  if (!browserClient) {
    browserClient = createClient(url, key)
  }
  return browserClient
}
