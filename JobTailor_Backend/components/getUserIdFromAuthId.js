import { supabase } from "../supabaseClient.js";

export async function getUserIdFromAuthId(authId) {
    const { data, error } = await supabase
      .from("tbl_users")
      .select("id")
      .eq("auth_id", authId)
      .single();

    if (error) {
      throw new Error(`Failed to get user id: ${error.message}`);
    }

    return data.id;
}

export default getUserIdFromAuthId;