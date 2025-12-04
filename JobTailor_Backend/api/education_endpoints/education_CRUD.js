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
    education: data,
  };
}
