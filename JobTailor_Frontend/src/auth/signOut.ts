import { supabase } from "@/lib/supabaseClient";

export async function signOut() {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}