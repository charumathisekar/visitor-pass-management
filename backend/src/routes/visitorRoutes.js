import express from "express";
import {
  registerVisitor,
  getVisitors,
  approveVisitor,
  rejectVisitor,
  checkInVisitor,
  checkOutVisitor,
} from "../controllers/visitorController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", protect, registerVisitor);

router.get("/", protect, getVisitors);

router.put("/:id/approve", protect, approveVisitor);

router.put("/:id/reject", protect, rejectVisitor);

router.put("/:id/checkin", protect, checkInVisitor);

router.put("/:id/checkout", protect, checkOutVisitor);

export default router;