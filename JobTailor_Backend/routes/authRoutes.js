import express from "express";
import {
  loginHandler,
  signupHandler,
  logoutHandler,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/login", loginHandler);
router.post("/signUp", signupHandler);
router.post("/logout", logoutHandler);

export default router;

