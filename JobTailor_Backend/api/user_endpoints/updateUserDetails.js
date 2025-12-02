import { supabase } from "../../supabaseClient.js";

export async function updateUserDetails(updatedData, user) {

    // Update user
    const { data, error } = await supabase
      .from("tbl_users")
      .update(updatedData)
      .eq("auth_id", user.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }


    return {
      message: "User details updated successfully",
      user: data,
    };

}



export default updateUserDetails;