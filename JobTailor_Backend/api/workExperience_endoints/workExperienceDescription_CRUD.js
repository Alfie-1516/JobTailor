import supabase from "../../supabaseClient.js";
import getUserIdFromAuthId from "../../components/getUserIdFromAuthId.js";

export async function updateWorkExperienceDescription(description, user) {
    const userId = await getUserIdFromAuthId(user.id);

    const { data, error } = await supabase
    .from("tbl_work_experience_descriptions")
    .update({ description: description.description })
    .eq("id", description.id)
    .select(`
      *,
      tbl_work_experience!inner(user_id)
    `)
    .eq("tbl_work_experience.user_id", userId)
    .single();

    if (error) {
      throw new Error(`Failed to edit description: ${error.message}`);
    }

    return {
      message: "Description edited successfully",
      description: data,
    };
}

export async function addWorkExperienceDescription(description, user) {
    const userId = await getUserIdFromAuthId(user.id);

    const { data, error } = await supabase
      .from("tbl_work_experience_descriptions")
      .insert(description)
      .select(`*, tbl_work_experience!inner(user_id)`)
      .eq("tbl_work_experience.user_id", userId)
      .single();

    if (error) {
      throw new Error(`Failed to add description: ${error.message}`);
    }

    return {
      message: "Description added successfully",
      description: data,
    };
}


export async function deleteWorkExperienceDescription(description, user) {
    const userId = await getUserIdFromAuthId(user.id);
    const { data, error } = await supabase
    .from("tbl_work_experience_descriptions")
    .delete()
    .eq("id", description.id)
    .select(`
      *,
      tbl_work_experience!inner(user_id)
    `)
    .eq("tbl_work_experience.user_id", userId)
    .single();

    if (error) {
      throw new Error(`Failed to delete description: ${error.message}`);
    }

    return {
      message: "Description deleted successfully",
      description: data,
    };
}