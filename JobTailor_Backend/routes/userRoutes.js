import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  getUserByUsername,
} from "../controllers/userController.js";

const router = express.Router();

// User routes
router.get("/", getAllUsers); // GET /api/users
router.post("/login", login); // POST /api/users/login
router.get("/username/:username", getUserByUsername); // GET /api/users/username/:username
router.get("/:id", getUserById); // GET /api/users/:id
router.post("/", createUser); // POST /api/users
router.put("/:id", updateUser); // PUT /api/users/:id
router.delete("/:id", deleteUser); // DELETE /api/users/:id

export default router;
