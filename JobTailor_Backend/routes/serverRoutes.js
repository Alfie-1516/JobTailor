import express from "express";
import {
  getUserDetailsHandler,
  updateUserDetailsHandler,
} from "../controllers/userController.js";
import {
  addWorkExperienceHandler,
  updateWorkExperienceHandler,
  getWorkExperienceHandler,
  deleteWorkExperienceHandler,
} from "../controllers/workExperienceController.js";
import {
  addWorkExperienceDescriptionHandler,
  updateWorkExperienceDescriptionHandler,
  deleteWorkExperienceDescriptionHandler,
} from "../controllers/workExperienceController.js";
import { addEducationHandler, updateEducationHandler, deleteEducationHandler, getEducationHandler } from "../controllers/educationController.js";
import { addSkillHandler, getSkillsHandler, updateSkillHandler, deleteSkillHandler } from "../controllers/skillController.js";
import { addCertificationHandler, getCertificationsHandler, updateCertificationHandler, deleteCertificationHandler } from "../controllers/certificationController.js";
import { addAchivementHandler, getAchivementsHandler, updateAchivementHandler, deleteAchivementHandler } from "../controllers/achivementController.js";
import { addProjectHandler, getProjectsHandler, updateProjectHandler, deleteProjectHandler, addProjectDescriptionHandler, updateProjectDescriptionHandler, deleteProjectDescriptionHandler   } from "../controllers/projectController.js";
import { addVolunteerExperienceHandler, getVolunteerExperienceHandler, updateVolunteerExperienceHandler, deleteVolunteerExperienceHandler } from "../controllers/volunteerExperiencController.js";
import { addVolunteerExperienceDescriptionHandler, updateVolunteerExperienceDescriptionHandler, deleteVolunteerExperienceDescriptionHandler } from "../controllers/volunteerExperiencController.js";
const router = express.Router();

// User routes
router.get("/user", getUserDetailsHandler);
router.put("/user", updateUserDetailsHandler);

// Work experience routes
router.post("/workExperience", addWorkExperienceHandler);
router.put("/workExperience", updateWorkExperienceHandler);
router.get("/workExperience", getWorkExperienceHandler);
router.delete("/workExperience", deleteWorkExperienceHandler);

// Work experience description routes
router.post("/workExperience/description", addWorkExperienceDescriptionHandler);
router.put("/workExperience/description", updateWorkExperienceDescriptionHandler);
router.delete("/workExperience/description", deleteWorkExperienceDescriptionHandler);

// Education routes
router.post("/education", addEducationHandler);
router.put("/education", updateEducationHandler);
router.delete("/education", deleteEducationHandler);
router.get("/education", getEducationHandler);

// Skills routes
router.post("/skill", addSkillHandler);
router.get("/skill", getSkillsHandler);
router.put("/skill", updateSkillHandler);
router.delete("/skill", deleteSkillHandler);

// Certifications routes
router.post("/certification", addCertificationHandler);
router.get("/certification", getCertificationsHandler);
router.put("/certification", updateCertificationHandler);
router.delete("/certification", deleteCertificationHandler);

// Achivements routes
router.post("/achivement", addAchivementHandler);
router.get("/achivement", getAchivementsHandler);
router.put("/achivement", updateAchivementHandler);
router.delete("/achivement", deleteAchivementHandler);

// Projects routes
router.post("/project", addProjectHandler);
router.get("/project", getProjectsHandler);
router.put("/project", updateProjectHandler);
router.delete("/project", deleteProjectHandler);

// Project description routes
router.post("/project/description", addProjectDescriptionHandler);
router.put("/project/description", updateProjectDescriptionHandler);
router.delete("/project/description", deleteProjectDescriptionHandler);

// Volunteer experience routes
router.post("/volunteerExperience", addVolunteerExperienceHandler);
router.get("/volunteerExperience", getVolunteerExperienceHandler);
router.put("/volunteerExperience", updateVolunteerExperienceHandler);
router.delete("/volunteerExperience", deleteVolunteerExperienceHandler);

// Volunteer experience description routes
router.post("/volunteerExperience/description", addVolunteerExperienceDescriptionHandler);
router.put("/volunteerExperience/description", updateVolunteerExperienceDescriptionHandler);
router.delete("/volunteerExperience/description", deleteVolunteerExperienceDescriptionHandler);
export default router;
