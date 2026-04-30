import { addAchivement, getAchivements, updateAchivement, deleteAchivement } from "../api/achivement_enpoints/achivement_CRUD.js";
import { tokenValidator } from "../components/tokenValidator.js";

//Add achivement
export const addAchivementHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await addAchivement(req.body.achivement, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to add achivement: " + error.message });
  }
};

//Get achivements
export const getAchivementsHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await getAchivements(user));
  } catch (error) {
    res.status(500).json({ error: "Failed to get achivements: " + error.message });
  }
};
//Update achivement
export const updateAchivementHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await updateAchivement(req.body.achivement, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to update achivement: " + error.message });
  }
};
//Delete achivement
export const deleteAchivementHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await deleteAchivement(req.body.achivement, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to delete achivement: " + error.message });
  }
};