import { supabase } from "../../supabaseClient.js";
import getUserIdFromAuthId from "../../components/getUserIdFromAuthId.js";

export async function addProjectDescription(projectDescription, user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_project_description")
    .insert(projectDescription)
    .select(`*, tbl_projects!inner(user_id)`)
    .eq("tbl_projects.user_id", userId)
    .single();

  if (error) {
    throw new Error(`Failed to add project description: ${error.message}`);
  }

  return {
    message: "Project description added successfully",
    projectDescription: data,
  };
}


export async function updateProjectDescription(projectDescription, user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
  .from("tbl_project_description")
  .update({ description: projectDescription.description })
  .eq("id", projectDescription.id)
  .select(`
    *,
    tbl_projects!inner(user_id)
  `)
  .eq("tbl_projects.user_id", userId)
  .single();

  if (error) {
    throw new Error(`Failed to update project description: ${error.message}`);
  }

  return {
    message: "Project description updated successfully",
    projectDescription: data,
  };
}

export async function deleteProjectDescription(projectDescription, user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
  .from("tbl_project_description")
  .delete()
  .eq("id", projectDescription.id)
  .select(`
    *,
    tbl_projects!inner(user_id)
  `)
  .eq("tbl_projects.user_id", userId)
  .single();

  if (error) {
    throw new Error(`Failed to delete project description: ${error.message}`);
  }

  return {
    message: "Project description deleted successfully",
    projectDescription: data,
  };
}