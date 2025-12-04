import { supabase } from "../../supabaseClient.js";

export async function login(email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Authenticate against Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error("Invalid credentials", error.message);
  }

  // Get user data from your tbl_users
  const { data: userData } = await supabase
    .from("tbl_users")
    .select("*")
    .eq("auth_id", data.user.id)
    .single();

  // Send back tokens + user data
  return {
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    user: userData,
    expires_in: data.session.expires_in,
  };
}

export default login;

