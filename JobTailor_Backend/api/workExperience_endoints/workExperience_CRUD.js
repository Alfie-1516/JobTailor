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

export async function getWorkExperience(user) {
    const userId = await getUserIdFromAuthId(user.id);
    const { data, error } = await supabase
      .from("tbl_work_experience")
      .select(`*, tbl_work_experience_descriptions(*)`)
      .eq("user_id", userId);

    if (error) {
      throw new Error(`Failed to get work experience: ${error.message}`);
    }

    return {
      message: "Work experience fetched successfully",
      workExperience: data,
    };
}

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

export async function deleteWorkExperience(workExperience, user) {
    const userId = await getUserIdFromAuthId(user.id);
    const { data, error } = await supabase
      .from("tbl_work_experience")
      .delete()
      .eq("user_id", userId)
      .eq("id", workExperience.id);

    if (error) {
      throw new Error(`Failed to delete work experience: ${error.message}`);
    }

    return {
      message: "Work experience deleted successfully",
      workExperience: data,
    };

}
