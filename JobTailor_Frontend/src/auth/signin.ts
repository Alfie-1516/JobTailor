import { routes } from "@/constants/routes";
import { supabase } from "@/lib/supabaseClient";

export async function signin(username: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;

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