import { supabase } from "../../supabaseClient.js";

export async function getUserDetails(user) {

  const { data: userDetails, error } = await supabase
    .from("tbl_users")
    .select("*")
    .eq("auth_id", user.id)
    .single();


  if (error) throw error;

  if (!userDetails) {
    throw new Error("No user found with the provided id");
  }

  return userDetails;

  };

export default getUserDetails;