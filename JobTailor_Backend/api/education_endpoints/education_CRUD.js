import { supabase } from "../../supabaseClient.js";
import getUserIdFromAuthId from "../../components/getUserIdFromAuthId.js";

export async function addEducation(education, user) {
  const userId = await getUserIdFromAuthId(user.id);
  education.user_id = userId;
  const { data, error } = await supabase
    .from("tbl_education")
    .insert(education);
  if (error) {
    throw new Error(`Failed to add education: ${error.message}`);
  }

  return {
    message: "Education added successfully",
    data: data,
  };
}

export async function getEducation(user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_education")
    .select("*")
    .eq("user_id", userId);


    if (error) {
      throw new Error(`Failed to get education: ${error.message}`);
    }

    return {
      message: "Education fetched successfully",
      data: data,
    };
}

export async function updateEducation(education, user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_education")
    .update(education)
    .eq("user_id", userId)
    .eq("id", education.id)
    .select()
    .single();

    if (error) {
      throw new Error(`Failed to update education: ${error.message}`);
    }

    return {
      message: "Education updated successfully",
      data: data,
    };
}

export async function deleteEducation(education, user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_education")
    .delete()
    .eq("user_id", userId)
    .eq("id", education.id)
    .select()
    .single();

    if (error) {
      throw new Error(`Failed to delete education: ${error.message}`);
    }

    return {
      message: "Education deleted successfully",
      data: data,
    };
}

