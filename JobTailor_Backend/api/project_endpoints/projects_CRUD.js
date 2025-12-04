import { supabase } from "../../supabaseClient.js";
import getUserIdFromAuthId from "../../components/getUserIdFromAuthId.js";

export async function addProject(project, user) {
  const userId = await getUserIdFromAuthId(user.id);
  project.user_id = userId;
  const { data, error } = await supabase
    .from("tbl_projects")
    .insert(project);

  if (error) {
    throw new Error(`Failed to add project: ${error.message}`);
  }

  return {
    message: "Project added successfully",
    project: data,
  };
}

export async function getProjects(user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_projects")
    .select("*, tbl_project_description(*)")
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Failed to get projects: ${error.message}`);
  }

  return {
    message: "Projects fetched successfully",
    projects: data,
  };
}

export async function updateProject(project, user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_projects")
    .update(project)
    .eq("user_id", userId)
    .eq("id", project.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update project: ${error.message}`);
  }

  return {
    message: "Project updated successfully",
    project: data,
  };
}

export async function deleteProject(project, user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_projects")
    .delete()
    .eq("user_id", userId)
    .eq("id", project.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to delete project: ${error.message}`);
  }

  return {
    message: "Project deleted successfully",
    project: data,
  };
}