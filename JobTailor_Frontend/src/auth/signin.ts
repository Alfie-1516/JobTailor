import { routes } from "@/constants/routes";
import { supabase } from "@/lib/supabaseClient";

export async function signin(username: string, password: string) {
  try {
    await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });



  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

export async function signinWithGoogle() {
  try {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${routes.dashboard}`,
      }
    });

  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
}