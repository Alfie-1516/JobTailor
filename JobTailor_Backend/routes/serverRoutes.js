import express from "express";
import { generateResume, generateCoverLetter, generateInterviewNotes } from "../controllers/serverController.js";
import { getAllAboutUsers, getAboutUserById, createAboutUser, updateAboutUser, deleteAboutUser } from "../controllers/AboutUserController.js";


const router = express.Router();

// Base route
router.get("/", (req, res) => {
  res.json({ message: "JobTailor Backend server is running!" });
});

router.post("/generate-resume", generateResume);
router.post("/generate-cover-letter", generateCoverLetter);
router.post("/generate-interview-notes", generateInterviewNotes);

router.get("/about-users", getAllAboutUsers);
router.get("/about-users/:id", getAboutUserById);
router.post("/about-users", createAboutUser);
router.put("/about-users/:id", updateAboutUser);
router.delete("/about-users/:id", deleteAboutUser);

export default router;
