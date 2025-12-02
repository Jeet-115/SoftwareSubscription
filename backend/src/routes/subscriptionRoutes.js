import express from "express";
import {
  createOrder,
  handleWebhook,
} from "../controllers/subscriptionController.js";
import WebhookLog from "../models/WebhookLog.js";
import { adminKeyCheck } from "../middleware/adminKey.js";

const router = express.Router();

// (1) Create Razorpay order
router.post("/create-order", createOrder);

// (3) Razorpay webhook (signature-validated)
router.post("/webhook", handleWebhook);

// Admin-only: view recent webhook logs (for debugging)
router.get("/admin/webhook-logs", adminKeyCheck, async (req, res) => {
  try {
    const logs = await WebhookLog.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    res.json(logs);
  } catch (err) {
    console.error("Error fetching webhook logs:", err);
    res.status(500).json({ message: "Failed to fetch webhook logs" });
  }
});

export default router;


