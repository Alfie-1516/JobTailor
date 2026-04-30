
import { tokenValidator } from "../components/tokenValidator.js";
import { addWorkExperience, updateWorkExperience, getWorkExperience, deleteWorkExperience } from "../api/workExperience_endoints/workExperience_CRUD.js";
import { addWorkExperienceDescription, updateWorkExperienceDescription, deleteWorkExperienceDescription } from "../api/workExperience_endoints/workExperienceDescription_CRUD.js";

//Add work experience
export const addWorkExperienceHandler = async (req, res) => {
    try {
      const user = await tokenValidator(req);
      res.status(200).json(await addWorkExperience(req.body.workExperience, user));
    } catch (error) {
      res.status(500).json({ error: "Failed to add work experience: " + error.message });
    }
  };
  
//Update work experience
export const updateWorkExperienceHandler = async (req, res) => {
try {
    const user = await tokenValidator(req);
    res.status(200).json(await updateWorkExperience(req.body, user));
} catch (error) {
    res.status(500).json({ error: "Failed to update work experience: " + error.message });
}
};

//Get work experience
export const getWorkExperienceHandler = async (req, res) => {
try {
    const user = await tokenValidator(req);
    res.status(200).json(await getWorkExperience(user));
} catch (error) {
    res.status(500).json({ error: "Failed to get work experience: " + error.message });
}
};

//Delete work experience
export const deleteWorkExperienceHandler = async (req, res) => {
try {
    const user = await tokenValidator(req);
    res.status(200).json(await deleteWorkExperience(req.body.workExperience, user));
} catch (error) {
    res.status(500).json({ error: "Failed to delete work experience: " + error.message });
}
};
//Add description
export const addWorkExperienceDescriptionHandler = async (req, res) => {
try {
    const user = await tokenValidator(req);
    res.status(200).json(await addWorkExperienceDescription(req.body.description, user));
} catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add description: " + error.message });
}
};

//Edit description
export const updateWorkExperienceDescriptionHandler = async (req, res) => {
try {
    const user = await tokenValidator(req);
    res.status(200).json(await updateWorkExperienceDescription(req.body.description, user));
} catch (error) {
    res.status(500).json({ error: "Failed to edit description: " + error.message });
}
};

//Delete work experience description
export const deleteWorkExperienceDescriptionHandler = async (req, res) => {
try {
    const user = await tokenValidator(req);
    console.log(user);
    console.log(req.body.description);
    res.status(200).json(await deleteWorkExperienceDescription(req.body.description, user));
} catch (error) {
    res.status(500).json({ error: "Failed to delete description: " + error.message });
}
};