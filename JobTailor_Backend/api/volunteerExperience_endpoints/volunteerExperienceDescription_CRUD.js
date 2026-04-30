import { supabase } from "../../supabaseClient.js";
import getUserIdFromAuthId from "../../components/getUserIdFromAuthId.js";

export async function addVolunteerExperienceDescription(volunteerExperienceDescription, user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_volunteer_experience_description")
    .insert(volunteerExperienceDescription)
    .select(`*, tbl_volunteer_experience!inner(user_id)`)
    .eq("tbl_volunteer_experience.user_id", userId)
    .single();

  if (error) {
    throw new Error(`Failed to add volunteer experience description: ${error.message}`);
  }

  return {
    message: "Volunteer experience description added successfully",
    volunteerExperienceDescription: data,
  };
}

export async function updateVolunteerExperienceDescription(volunteerExperienceDescription, user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_volunteer_experience_description")
    .update(volunteerExperienceDescription)
    .eq("id", volunteerExperienceDescription.id)
    .select(`*, tbl_volunteer_experience!inner(user_id)`)
    .eq("tbl_volunteer_experience.user_id", userId)
    .single();

  if (error) {
    throw new Error(`Failed to update volunteer experience description: ${error.message}`);
  }

  return {
    message: "Volunteer experience description updated successfully",
    volunteerExperienceDescription: data,
  };
}

export async function deleteVolunteerExperienceDescription(volunteerExperienceDescription, user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_volunteer_experience_description")
    .delete()
    .eq("id", volunteerExperienceDescription.id)
    .select(`*, tbl_volunteer_experience!inner(user_id)`)
    .eq("tbl_volunteer_experience.user_id", userId)
    .single();

  if (error) {
    throw new Error(`Failed to delete volunteer experience description: ${error.message}`);
  }

  return {
    message: "Volunteer experience description deleted successfully",
    volunteerExperienceDescription: data,
  };
}