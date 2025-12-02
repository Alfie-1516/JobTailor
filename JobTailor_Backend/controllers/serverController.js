import getUserDetails from "../api/user_endpoints/getUserDetails.js"
import updateUserDetails from "../api/user_endpoints/updateUserDetails.js"
import { tokenValidator } from "../components/tokenValidator.js";
import addWorkExperience from "../api/workExperience_endoints/addWorkExperience.js";
import updateWorkExperience from "../api/workExperience_endoints/updateWorkExerience.js";
import getWorkExperience from "../api/workExperience_endoints/getWorkExperience.js";
import addWorkExperienceDescription from "../api/workExperience_endoints/addDescription.js";

// Get user details
export const getUserDetailsHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await getUserDetails(user));
  } catch (error) {
    res.status(500).json({ error: "Failed to get user details" });
  }
};

//Update user details
export const updateUserDetailsHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await updateUserDetails(req.body.updates, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to update user details" });
  }
};

//Add work experience
export const addWorkExperienceHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await addWorkExperience(req.body.workExperience, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to add work experience" });
  }
};

//Update work experience
export const updateWorkExperienceHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await updateWorkExperience(req.body.workExperience, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to update work experience" });
  }
};

//Get work experience
export const getWorkExperienceHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await getWorkExperience(user));
  } catch (error) {
    res.status(500).json({ error: "Failed to get work experience" });
  }
};


//Add description
export const addWorkExperienceDescriptionHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await addWorkExperienceDescription(req.body.description, user));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add description" });
  }
};