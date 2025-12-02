import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverRoutes from "./routes/serverRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/server", serverRoutes);
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
