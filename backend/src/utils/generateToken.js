import crypto from "crypto";
import jwt from "jsonwebtoken";

export const generateSoftwareToken = () => {
  // Cryptographically secure random token for software auth
  return `SW-${crypto.randomBytes(24).toString("hex")}`;
};

export const generateJwtToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }

  return jwt.sign({ id: userId }, secret, {
    expiresIn: "1d", // Website session validity
  });
};


