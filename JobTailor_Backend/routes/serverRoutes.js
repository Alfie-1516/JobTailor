import express from "express";
import { 
    getUserDetailsHandler,
    updateUserDetailsHandler,
    addWorkExperienceHandler, 
    updateWorkExperienceHandler, 
    getWorkExperienceHandler,
    addWorkExperienceDescriptionHandler } from "../controllers/serverController.js";

const router = express.Router();

// User routes
router.get("/user", getUserDetailsHandler);
router.put("/user", updateUserDetailsHandler);

// Work experience routes
router.post("/workExperience", addWorkExperienceHandler);
router.put("/workExperience", updateWorkExperienceHandler);
router.get("/workExperience", getWorkExperienceHandler);
router.post("/workExperience/description", addWorkExperienceDescriptionHandler);

export default router;
