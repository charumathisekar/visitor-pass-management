import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/protected", protect, (req, res) => {
  res.json({
    message: "You accessed a protected API",
    user: req.user,
  });
});

router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin",
    user: req.user,
  });
});

router.get(
  "/receptionist",
  protect,
  authorize("receptionist"),
  (req, res) => {
    res.json({
      message: "Welcome Receptionist",
      user: req.user,
    });
  }
);

router.get("/employee", protect, authorize("employee"), (req, res) => {
  res.json({
    message: "Welcome Employee",
    user: req.user,
  });
});

export default router;