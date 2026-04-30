import { supabase } from "../../supabaseClient.js";

export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return { message: "User signed out successfully" };
  } catch (err) {
    throw new Error(err.message);
  }
}

export default logout;