import crypto from "crypto";
import User from "../models/User.js";
import WebhookLog from "../models/WebhookLog.js";
import { razorpayInstance } from "../utils/razorpay.js";
import { generateSoftwareToken } from "../utils/generateToken.js";

// Helper: determine amount and plan metadata based on requested plan
const getPlanConfig = (planType) => {
  // All test plans currently 20 minutes
  const durationMinutes = 20;
  const amountInRupees = planType === "renewal" ? 1 : 2; // "trial"=2, "renewal"=1 by default

  return {
    amountPaise: amountInRupees * 100,
    durationMs: durationMinutes * 60 * 1000,
    planName: "test",
  };
};

// (1) Create Razorpay order
// POST /subscription/create-order
export const createOrder = async (req, res) => {
  try {
    if (!razorpayInstance) {
      return res
        .status(500)
        .json({ message: "Razorpay is not configured on the server" });
    }

    const { email, planType } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const planConfig = getPlanConfig(planType || "trial");

    const options = {
      amount: planConfig.amountPaise,
      currency: "INR",
      receipt: `order_rcpt_${Date.now()}`,
      notes: {
        email: user.email,
        planType: planType || "trial",
      },
    };

    const order = await razorpayInstance.orders.create(options);

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Create order error:", err);
    return res.status(500).json({ message: "Could not create order" });
  }
};

// (3) Razorpay webhook handler
// POST /subscription/webhook
export const handleWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) {
      console.error("RAZORPAY_WEBHOOK_SECRET not configured");
      return res.status(500).send("Webhook secret not configured");
    }

    if (!req.headers["x-razorpay-signature"]) {
      return res.status(400).send("Signature missing");
    }

    const rawBody =
      req.rawBody && typeof req.rawBody === "string"
        ? req.rawBody
        : req.rawBody
        ? req.rawBody.toString("utf8")
        : JSON.stringify(req.body);

    // Optional: create a log entry before validation
    const log = await WebhookLog.create({
      eventType: req.body?.event || "unknown",
      rawBody,
      headers: req.headers,
      processed: false,
    });

    const signature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.warn("Invalid Razorpay webhook signature");
      log.processed = false;
      log.error = "Invalid signature";
      await log.save();
      return res.status(400).send("Invalid signature");
    }

    const event = JSON.parse(rawBody);

    // We expect payment entity with notes containing email
    const paymentEntity = event?.payload?.payment?.entity;
    const email = paymentEntity?.notes?.email;

    if (!email) {
      console.error("No email in payment notes");
      log.processed = false;
      log.error = "Email not in payment notes";
      await log.save();
      return res.status(400).send("Email not found in payment notes");
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.error("User not found for email from webhook:", email);
      log.processed = false;
      log.error = "User not found";
      await log.save();
      return res.status(404).send("User not found");
    }

    // Activate subscription for 20 minutes (test)
    const now = Date.now();
    const expiry = new Date(now + 20 * 60 * 1000);

    user.subscriptionActive = true;
    user.subscriptionPlan = "test";
    user.subscriptionExpiry = expiry;

    if (!user.softwareToken) {
      user.softwareToken = generateSoftwareToken();
    }

    await user.save();

    log.processed = true;
    await log.save();

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).send("Webhook processing failed");
  }
};


