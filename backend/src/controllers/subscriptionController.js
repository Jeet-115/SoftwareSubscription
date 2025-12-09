import crypto from "crypto";
import User from "../models/User.js";
import WebhookLog from "../models/WebhookLog.js";
import { razorpayInstance } from "../utils/razorpay.js";
import { generateSoftwareToken } from "../utils/generateToken.js";

// Helper: determine amount and plan metadata based on requested plan
const getPlanConfig = (planType) => {
  // All test plans currently 20 minutes
  const durationMinutes = 20;
  // const durationDays = 365;
  const amountInRupees = planType === "renewal" ? 1 : 2; // "trial"=2, "renewal"=1 by default

  return {
    amountPaise: amountInRupees * 100,
    durationMs: durationMinutes * 60 * 1000,
    // const durationMs = durationDays * 24 * 60 * 60 * 1000;
    planName: "YEARLY",
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

    const requestedPlanType = planType || "trial";

    // A user who has never had a subscription before MUST purchase a "trial" plan.
    if (!user.subscriptionPlan && requestedPlanType === "renewal") {
      return res.status(400).json({ 
        message: "You must purchase a trial plan first. Renewals are only for existing or past subscribers." 
      });
    }

    // A user who has had a subscription before can ONLY purchase "renewal" plans.
    if (user.subscriptionPlan && requestedPlanType === "trial") {
      return res.status(400).json({ 
        message: "You have already purchased a trial plan. You can only renew your subscription now." 
      });
    }

    const planConfig = getPlanConfig(requestedPlanType);

    const options = {
      amount: planConfig.amountPaise,
      currency: "INR",
      receipt: `order_rcpt_${Date.now()}`      ,
      notes: {
        email: user.email,
        planType: requestedPlanType,
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

    // Razorpay always sends the signature header
    const signature = req.headers["x-razorpay-signature"];
    if (!signature) {
      console.warn("Missing x-razorpay-signature header");
      return res.status(400).send("Signature missing");
    }

    // === IMPORTANT: obtain the exact raw payload string ===
    // express.raw puts the raw Buffer into req.body (Buffer) for our route.
    // We must convert that Buffer to the EXACT utf8 string that Razorpay sent.
    // Fallback: if req.body is already a string, use it. Otherwise JSON.stringify.
    let rawBody;
    if (Buffer.isBuffer(req.body)) {
      rawBody = req.body.toString("utf8");
    } else if (typeof req.body === "string") {
      rawBody = req.body;
    } else {
      // Last resort (shouldn't happen for express.raw), but keep for safety
      rawBody = JSON.stringify(req.body);
    }

    // Optional: create a log entry before validation
    const log = await WebhookLog.create({
      eventType: req.body?.event || "unknown",
      rawBody,
      headers: req.headers,
      processed: false,
    });

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    console.log("EXPECTED SIGNATURE ->", expectedSignature);

    if (signature !== expectedSignature) {
      console.warn("Invalid Razorpay webhook signature");
      log.processed = false;
      log.error = "Invalid signature";
      await log.save();
      return res.status(400).send("Invalid signature");
    }

    // Parse the event payload (we now trust rawBody)
    const event = JSON.parse(rawBody);

    // We expect payment entity with notes containing email
    const paymentEntity = event?.payload?.payment?.entity;
    const email = paymentEntity?.notes?.email;
    const planType = paymentEntity?.notes?.planType || "trial";

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

    const planConfig = getPlanConfig(planType);
    const now = Date.now();
    let expiry;

    if (planType === "renewal" && user.subscriptionActive && user.subscriptionExpiry) {
      // Extend existing subscription
      expiry = new Date(user.subscriptionExpiry.getTime() + planConfig.durationMs);
    } else {
      // New subscription or trial
      expiry = new Date(now + planConfig.durationMs);
    }

    user.subscriptionActive = true;
    user.subscriptionPlan = "YEARLY";
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
