import express from "express";
import { getVisitorReport } from "../controllers/reportController.js";

const router = express.Router();

router.get("/", getVisitorReport);

export default router;