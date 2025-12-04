import { supabase } from "../../supabaseClient.js";
import getUserIdFromAuthId from "../../components/getUserIdFromAuthId.js";

export async function addSkill(skill, user) {
  const userId = await getUserIdFromAuthId(user.id);
  skill.user_id = userId;
  const { data, error } = await supabase
    .from("tbl_skills")
    .insert(skill);

  if (error) {
    throw new Error(`Failed to add skill: ${error.message}`);
  }

  return {
    message: "Skill added successfully",
    skill: data,
  };
}

export async function getSkills(user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_skills")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Failed to get skills: ${error.message}`);
  }

  return {
    message: "Skills fetched successfully",
    skills: data,
  };
}

export async function updateSkill(skill, user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_skills")
    .update(skill)
    .eq("user_id", userId)
    .eq("id", skill.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update skill: ${error.message}`);
  }

  return {
    message: "Skill updated successfully",
    skill: data,
  };
}

export async function deleteSkill(skill, user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_skills")
    .delete()
    .eq("user_id", userId)
    .eq("id", skill.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to delete skill: ${error.message}`);
  }

  return {
    message: "Skill deleted successfully",
    skill: data,
  };
}