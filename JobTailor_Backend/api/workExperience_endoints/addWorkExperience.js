import { supabase } from "../../supabaseClient.js";
import getUserIdFromAuthId from "../../components/getUserIdFromAuthId.js";

export async function addWorkExperience(workExperience, user) {
    const userId = await getUserIdFromAuthId(user.id);
    workExperience.user_id = userId;
    const { data, error } = await supabase
      .from("tbl_work_experience")
      .insert(workExperience)

    if (error) {
      throw new Error(`Failed to add work experience: ${error.message}`);
    }

    return {
      message: "Work experience added successfully",
      workExperience: data,
    };

}

export default addWorkExperience;