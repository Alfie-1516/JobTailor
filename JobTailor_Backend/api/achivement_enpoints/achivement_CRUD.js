import { supabase } from "../../supabaseClient.js";
import getUserIdFromAuthId from "../../components/getUserIdFromAuthId.js";

export async function addAchivement(achivement, user) {
  const userId = await getUserIdFromAuthId(user.id);
  achivement.user_id = userId;
  const { data, error } = await supabase
    .from("tbl_achivements")
    .insert(achivement);

  if (error) {
    throw new Error(`Failed to add achivement: ${error.message}`);
  }

  return {
    message: "Achivement added successfully",
    achivement: data,
  };
}

export async function getAchivements(user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_achivements")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Failed to get achivements: ${error.message}`);
  }

  return {
    message: "Achivements fetched successfully",
    achivements: data,
  };
}

export async function updateAchivement(achivement, user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_achivements")
    .update(achivement)
    .eq("user_id", userId)
    .eq("id", achivement.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update achivement: ${error.message}`);
  }

  return {
    message: "Achivement updated successfully",
    achivement: data,
  };
}

export async function deleteAchivement(achivement, user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_achivements")
    .delete()
    .eq("user_id", userId)
    .eq("id", achivement.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to delete achivement: ${error.message}`);
  }

  return {
    message: "Achivement deleted successfully",
    achivement: data,
  };
}