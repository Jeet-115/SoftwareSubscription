import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateSoftwareToken } from "../utils/generateToken.js";

const parseMasterAccounts = () => {
  const raw = process.env.MASTER_ACCOUNTS || "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
};

const isMasterEmail = (email) => {
  const masters = parseMasterAccounts();
  return masters.includes(email.toLowerCase());
};

// POST /software/login
export const softwareLogin = async (req, res) => {
  try {
    const { email, password, deviceId } = req.body || {};

    if (!email || !password || !deviceId) {
      return res.status(400).json({
        success: false,
        code: "MISSING_FIELDS",
        message: "email, password, and deviceId are required",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        code: "INVALID_CREDENTIALS",
        message: "Invalid credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        code: "INVALID_CREDENTIALS",
        message: "Invalid credentials",
      });
    }

    const master = user.isMaster || isMasterEmail(user.email);

    if (master) {
      // Ensure master flags are consistent
      user.isMaster = true;
      user.subscriptionActive = true;
      user.subscriptionExpiry = new Date("2099-01-01T00:00:00Z");
      user.subscriptionPlan = "YEARLY";
      user.deviceId = null; // no device lock
      if (!user.softwareToken) {
        user.softwareToken = generateSoftwareToken();
      }
      await user.save();

      return res.status(200).json({
        success: true,
        softwareToken: user.softwareToken,
        subscriptionExpiry: user.subscriptionExpiry,
        deviceId: null,
        isMaster: true,
      });
    }

    // Non-master user checks
    if (!user.subscriptionActive || !user.subscriptionExpiry) {
      return res.status(403).json({
        success: false,
        code: "SUBSCRIPTION_INACTIVE",
        message: "Subscription is not active",
      });
    }

    if (user.subscriptionExpiry.getTime() <= Date.now()) {
      return res.status(403).json({
        success: false,
        code: "SUBSCRIPTION_EXPIRED",
        message: "Subscription expired",
      });
    }

    if (!user.softwareToken) {
      user.softwareToken = generateSoftwareToken();
    }

    // Device lock logic
    if (!user.deviceId) {
      user.deviceId = deviceId;
    } else if (user.deviceId !== deviceId) {
      return res.status(403).json({
        success: false,
        code: "DEVICE_LOCKED",
        message: "Account is locked to another device",
      });
    }

    await user.save();

    return res.status(200).json({
      success: true,
      softwareToken: user.softwareToken,
      subscriptionExpiry: user.subscriptionExpiry,
      deviceId: user.deviceId,
      isMaster: false,
    });
  } catch (err) {
    console.error("Software login error:", err);
    return res.status(500).json({
      success: false,
      code: "SERVER_ERROR",
      message: "Server error",
    });
  }
};

// ADMIN: POST /admin/reset-device
export const resetDevice = async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.deviceId = null;
    await user.save();

    return res.status(200).json({ message: "Device lock reset" });
  } catch (err) {
    console.error("Reset device error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ADMIN: POST /admin/make-master
export const makeMaster = async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isMaster = true;
    user.subscriptionActive = true;
    user.subscriptionExpiry = new Date("2099-01-01T00:00:00Z");
    user.subscriptionPlan = "YEARLY";
    user.deviceId = null;
    if (!user.softwareToken) {
      user.softwareToken = generateSoftwareToken();
    }

    await user.save();

    return res.status(200).json({ message: "User promoted to master" });
  } catch (err) {
    console.error("Make master error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


