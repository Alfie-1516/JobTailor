import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "JobTailor Backend server is running!" });
});

export default router;
