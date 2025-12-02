import express from "express";
import { getUserById } from "../controllers/userController.js";

const router = express.Router();

// User routes
router.get("/", getUserById);
export default router;
