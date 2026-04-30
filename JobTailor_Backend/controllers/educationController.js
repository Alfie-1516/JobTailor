import { tokenValidator } from "../components/tokenValidator.js";
import { addEducation, updateEducation, deleteEducation, getEducation } from "../api/education_endpoints/education_CRUD.js";

//Add education
export const addEducationHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await addEducation(req.body.education, user));
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add education: " + error.message });
  }
};

//Get education
export const getEducationHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await getEducation(user));
  } catch (error) {
    res.status(500).json({ error: "Failed to get education: " + error.message });
  }
};
//Update education
export const updateEducationHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await updateEducation(req.body.education, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to update education: " + error.message });
  }
};

//Delete education
export const deleteEducationHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await deleteEducation(req.body.education, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to delete education: " + error.message });
  }
};