import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const missingEnvError = new Error("Missing Supabase environment variables");
type SupabaseClientType = ReturnType<typeof createClient>;

const createMissingEnvClient = (): SupabaseClientType =>
  new Proxy({} as SupabaseClientType, {
    get() {
      throw missingEnvError;
    },
  });

export const hasSupabaseEnv = Boolean(supabaseUrl && supabaseKey);
export const supabase: SupabaseClientType = hasSupabaseEnv
  ? createClient(supabaseUrl as string, supabaseKey as string)
  : createMissingEnvClient();

export default supabase;
