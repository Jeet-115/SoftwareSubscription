import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateJwtToken, generateSoftwareToken } from "../utils/generateToken.js";

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

// POST /auth/register
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      email: email.toLowerCase(),
      passwordHash,
      isMaster: isMasterEmail(email), // if email is in master list, flag as master
    });

    // For master users set unlimited subscription + no device lock
    if (user.isMaster) {
      user.subscriptionActive = true;
      user.subscriptionExpiry = new Date("2099-01-01T00:00:00Z");
      user.subscriptionPlan = "test";
      user.deviceId = null;
      user.softwareToken = generateSoftwareToken();
    }

    await user.save();

    const token = generateJwtToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(201)
      .json({
        message: "User registered",
        token,
        user: {
          id: user._id,
          email: user.email,
          isMaster: user.isMaster,
        },
      });
  } catch (err) {
    console.error("Register error:", err);
    res
      .status(500)
      .json({ message: err.message || "Server error during registration" });
  }
};

// POST /auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If email is in MASTER_ACCOUNTS, ensure master flags are applied
    if (isMasterEmail(user.email)) {
      user.isMaster = true;
      user.subscriptionActive = true;
      user.subscriptionExpiry = new Date("2099-01-01T00:00:00Z");
      user.subscriptionPlan = "test";
      user.deviceId = null; // no device lock
      if (!user.softwareToken) {
        user.softwareToken = generateSoftwareToken();
      }
      await user.save();
    }

    const token = generateJwtToken(user._id);

    // If this is a master user, expose the ADMIN_KEY value in the response
    // so the frontend can use it (e.g. send as x-admin-key header) to view
    // protected admin resources like webhook logs.
    const adminKey = user.isMaster ? process.env.ADMIN_KEY || null : null;

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Logged in",
        token,
        user: {
          id: user._id,
          email: user.email,
          isMaster: user.isMaster,
        },
        adminKey,
      });
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(500)
      .json({ message: err.message || "Server error during login" });
  }
};

// POST /auth/logout
export const logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
    .status(200)
    .json({ message: "Logged out" });
};


