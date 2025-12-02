import { supabase } from "../../supabaseClient.js";
import getUserIdFromAuthId from "../../components/getUserIdFromAuthId.js";

export async function updateWorkExperience(workExperience, user) {
    const userId = await getUserIdFromAuthId(user.id);
    const { data, error } = await supabase
      .from("tbl_work_experience")
      .update(workExperience)
      .eq("user_id", userId)
      .eq("id", workExperience.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to add work experience: ${error.message}`);
    }

    return {
      message: "Work experience added successfully",
      workExperience: data,
    };

}

export default updateWorkExperience;