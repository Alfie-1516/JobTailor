import { supabase } from "../../supabaseClient.js";
import getUserIdFromAuthId from "../../components/getUserIdFromAuthId.js";

export async function addDescription(description, user) {
    const userId = await getUserIdFromAuthId(user.id);
  
    const userHasAccess = await verifyuserAccessToWorkExperience(userId, description.work_experience_id);

    if (!userHasAccess) {
      throw new Error("User does not have access to work experience");
    }

    const { data, error } = await supabase
      .from("tbl_work_experience_descriptions")
      .insert(description);

    if (error) {
      throw new Error(`Failed to add description: ${error.message}`);
    }

    return {
      message: "Description added successfully",
      description: data,
    };
}

async function verifyuserAccessToWorkExperience(userId, workExperienceId) {

    const { data: workExperience, error } = await supabase
      .from("tbl_work_experience")
      .select("*")
      .eq("user_id", userId)
      .eq("id", workExperienceId);


    if (error) {
      throw new Error(`Failed to verify user access to work experience: ${error.message}`);
    }

    return workExperience && workExperience.length > 0;
}

export default addDescription;