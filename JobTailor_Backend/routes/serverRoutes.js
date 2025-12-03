import express from "express";
import { 
    getUserDetailsHandler,
    updateUserDetailsHandler } from "../controllers/serverController.js";
import { addWorkExperienceHandler, updateWorkExperienceHandler, getWorkExperienceHandler, deleteWorkExperienceHandler } from "../controllers/workExperienceController.js";
import { addWorkExperienceDescriptionHandler, updateWorkExperienceDescriptionHandler, deleteWorkExperienceDescriptionHandler } from "../controllers/workExperienceController.js";

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
export default router;
