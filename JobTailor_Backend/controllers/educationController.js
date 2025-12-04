import { tokenValidator } from "../components/tokenValidator.js";
import { addEducation } from "../api/education_endpoints/education_CRUD.js";

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
