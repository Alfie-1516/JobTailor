import { supabase } from "../../supabaseClient.js";
import getUserIdFromAuthId from "../../components/getUserIdFromAuthId.js";

export async function addVolunteerExperience(volunteerExperience, user) {
  const userId = await getUserIdFromAuthId(user.id);
  volunteerExperience.user_id = userId;
  const { data, error } = await supabase
    .from("tbl_volunteer_experience")
    .insert(volunteerExperience);

  if (error) {
    throw new Error(`Failed to add volunteer experience: ${error.message}`);
  }

  return {
    message: "Volunteer experience added successfully",
    volunteerExperience: data,
  };
}

export async function getVolunteerExperience(user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_volunteer_experience")
    .select(`*, tbl_volunteer_experience_description(*)`)
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Failed to get volunteer experience: ${error.message}`);
  }

  return {
    message: "Volunteer experience fetched successfully",
    volunteerExperience: data,
  };
}

export async function updateVolunteerExperience(volunteerExperience, user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_volunteer_experience")
    .update(volunteerExperience)
    .eq("user_id", userId)
    .eq("id", volunteerExperience.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update volunteer experience: ${error.message}`);
  }

  return {
    message: "Volunteer experience updated successfully",
    volunteerExperience: data,
  };
}

export async function deleteVolunteerExperience(volunteerExperience, user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_volunteer_experience")
    .delete()
    .eq("user_id", userId)
    .eq("id", volunteerExperience.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to delete volunteer experience: ${error.message}`);
  }

  return {
    message: "Volunteer experience deleted successfully",
    volunteerExperience: data,
  };
}