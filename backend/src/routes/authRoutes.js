import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { loginLimiter, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Simple routes without express-validator middleware to avoid unexpected 500s
router.post("/register", register);
router.post("/login", loginLimiter, login);
router.post("/logout", logout);

// Get current user profile + subscription info
router.get("/me", protect, (req, res) => {
  const user = req.user;
  res.json({
    id: user._id,
    email: user.email,
    isMaster: user.isMaster,
    subscriptionActive: user.subscriptionActive,
    subscriptionExpiry: user.subscriptionExpiry,
    subscriptionPlan: user.subscriptionPlan,
    deviceId: user.deviceId,
  });
});

export default router;


