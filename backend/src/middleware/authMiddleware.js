import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import User from "../models/User.js";

// Website auth - protect routes using JWT stored in httpOnly cookie
export const protect = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ") &&
        req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-passwordHash");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Not authorized" });
  }
};

// Software auth - validate softwareToken and subscription expiry
export const softwareAuth = async (req, res, next) => {
  try {
    const token =
      req.headers["x-software-token"] ||
      (req.body && req.body.softwareToken) ||
      null;

    if (!token) {
      return res.status(401).json({ code: "NO_SOFTWARE_TOKEN" });
    }

    const user = await User.findOne({ softwareToken: token });
    if (!user) {
      return res.status(401).json({ code: "INVALID_SOFTWARE_TOKEN" });
    }

    // Master users bypass expiry & device lock checks
    if (!user.isMaster) {
      if (!user.subscriptionActive || !user.subscriptionExpiry) {
        return res.status(403).json({ code: "SUBSCRIPTION_INACTIVE" });
      }

      if (user.subscriptionExpiry.getTime() <= Date.now()) {
        return res.status(403).json({ code: "SUBSCRIPTION_EXPIRED" });
      }
    }

    req.softwareUser = user;
    next();
  } catch (err) {
    console.error("Software auth error:", err);
    return res.status(401).json({ code: "SOFTWARE_AUTH_FAILED" });
  }
};

// Rate limiter for auth routes
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});


