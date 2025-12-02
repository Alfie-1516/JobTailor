import { supabase } from "../../supabaseClient.js";
import getUserIdFromAuthId from "../../components/getUserIdFromAuthId.js";

export async function getWorkExperience(user) {
    const userId = await getUserIdFromAuthId(user.id);
    const { data, error } = await supabase
      .from("tbl_work_experience")
      .select("*")
      .eq("user_id", userId)
      .select()

    if (error) {
      throw new Error(`Failed to get work experience: ${error.message}`);
    }

    return {
      message: "Work experience fetched successfully",
      workExperience: data,
    };
}

export default getWorkExperience;