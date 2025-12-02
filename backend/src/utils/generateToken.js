import crypto from "crypto";
import jwt from "jsonwebtoken";

export const generateSoftwareToken = () => {
  // Cryptographically secure random token for software auth
  return `SW-${crypto.randomBytes(24).toString("hex")}`;
};

export const generateJwtToken = (userId) => {
  let secret = process.env.JWT_SECRET;

  if (!secret) {
    // Fallback for local development to avoid hard crashes.
    // For production you should always set JWT_SECRET in the environment.
    secret = "dev-secret-change-me";
    console.warn(
      "JWT_SECRET is not set; using insecure development secret. Set JWT_SECRET in .env for production."
    );
  }

  return jwt.sign({ id: userId }, secret, {
    expiresIn: "1d", // Website session validity
  });
};


