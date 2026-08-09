import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import reportRoutes from "./src/routes/reportRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import visitorRoutes from "./src/routes/visitorRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import activityRoutes from "./src/routes/activityRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/activities", activityRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

startServer();