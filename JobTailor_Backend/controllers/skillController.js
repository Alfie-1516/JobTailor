import { addSkill, getSkills, updateSkill, deleteSkill } from "../api/skills_endpoints/skills_CRUD.js";
import { tokenValidator } from "../components/tokenValidator.js";

//Add skill
export const addSkillHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await addSkill(req.body.skill, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to add skill: " + error.message });
  }
}; 

//Get skills
export const getSkillsHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await getSkills(user));
  } catch (error) {
    res.status(500).json({ error: "Failed to get skills: " + error.message });
  }
};

//Update skill
export const updateSkillHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await updateSkill(req.body.skill, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to update skill: " + error.message });
  }
};

//Delete skill
export const deleteSkillHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await deleteSkill(req.body.skill, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to delete skill: " + error.message });
  }
};