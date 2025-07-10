import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverRoutes from "./routes/serverRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/JobTailor")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
app.use("/api", serverRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
