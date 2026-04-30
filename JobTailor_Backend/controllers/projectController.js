import { addProject, getProjects, updateProject, deleteProject } from "../api/project_endpoints/projects_CRUD.js";
import { addProjectDescription, updateProjectDescription, deleteProjectDescription } from "../api/project_endpoints/projectDescription_CRUD.js";
import { tokenValidator } from "../components/tokenValidator.js";

//Add project
export const addProjectHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await addProject(req.body.project, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to add project: " + error.message });
  }
};
//Get projects
export const getProjectsHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await getProjects(user));
  } catch (error) {
    res.status(500).json({ error: "Failed to get projects: " + error.message });
  }
};
//Update project
export const updateProjectHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await updateProject(req.body.project, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to update project: " + error.message });
  }
};
//Delete project
export const deleteProjectHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await deleteProject(req.body.project, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project: " + error.message });
  }
};
//Add project description
export const addProjectDescriptionHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await addProjectDescription(req.body.projectDescription, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to add project description: " + error.message });
  }
};  
//Update project description
export const updateProjectDescriptionHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await updateProjectDescription(req.body.projectDescription, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to update project description: " + error.message });
  }
};
//Delete project description
export const deleteProjectDescriptionHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await deleteProjectDescription(req.body.projectDescription, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project description: " + error.message });
  }
};