import { addVolunteerExperience, getVolunteerExperience, updateVolunteerExperience, deleteVolunteerExperience } from "../api/volunteerExperience_endpoints/volunteerExperienc_CRUD.js";
import { addVolunteerExperienceDescription, updateVolunteerExperienceDescription, deleteVolunteerExperienceDescription } from "../api/volunteerExperience_endpoints/volunteerExperienceDescription_CRUD.js";
import { tokenValidator } from "../components/tokenValidator.js";

//Add volunteer experience
export const addVolunteerExperienceHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await addVolunteerExperience(req.body.volunteerExperience, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to add volunteer experience: " + error.message });
  }
};  
//Get volunteer experience
export const getVolunteerExperienceHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await getVolunteerExperience(user));
  } catch (error) {
    res.status(500).json({ error: "Failed to get volunteer experience: " + error.message });
  }
};
//Update volunteer experience
export const updateVolunteerExperienceHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await updateVolunteerExperience(req.body.volunteerExperience, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to update volunteer experience: " + error.message });
  }
};
//Delete volunteer experience
export const deleteVolunteerExperienceHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await deleteVolunteerExperience(req.body.volunteerExperience, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to delete volunteer experience: " + error.message });
  }
};
//Add volunteer experience description
export const addVolunteerExperienceDescriptionHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await addVolunteerExperienceDescription(req.body.volunteerExperienceDescription, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to add volunteer experience description: " + error.message });
  }
};
//Update volunteer experience description
export const updateVolunteerExperienceDescriptionHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await updateVolunteerExperienceDescription(req.body.volunteerExperienceDescription, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to update volunteer experience description: " + error.message });
  }
};
//Delete volunteer experience description
export const deleteVolunteerExperienceDescriptionHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await deleteVolunteerExperienceDescription(req.body.volunteerExperienceDescription, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to delete volunteer experience description: " + error.message });
  }
};