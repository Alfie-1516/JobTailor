import { supabase } from "../../supabaseClient.js";

export async function signup(firstName, lastName, email, password) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    throw new Error(authError.message);
  }

  if (!authData.user) {
    throw new Error("User creation failed");
  }

  const { data: userData, error: insertError } = await supabase
    .from("tbl_users")
    .insert({
      first_name: firstName,
      last_name: lastName,
      email: email,
      auth_id: authData.user.id,
    })
    .select()
    .single();

  if (insertError) {
    throw new Error("Failed to create user profile: " + insertError.message);
  }

  if (!authData.session) {
    return {
      message: "Please check your email to confirm your account",
      user: userData,
      requiresEmailConfirmation: true,
    };
  }

  return {
    access_token: authData.session.access_token,
    refresh_token: authData.session.refresh_token,
    user: userData,
    expires_in: authData.session.expires_in,
  };
}

export default signup;

