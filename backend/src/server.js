import 'dotenv/config';

import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
// NOTE: express-mongo-sanitize currently does not work well with Express 5
// because Express 5's request object exposes req.query as a read-only getter.
// This causes "Cannot set property query of #<IncomingMessage>" errors.
// If you want to re‑enable it later, either downgrade to Express 4
// or use a different sanitization approach.
// import mongoSanitize from "express-mongo-sanitize";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import deviceRoutes from "./routes/deviceRoutes.js";
import legalRoutes from "./routes/legalRoutes.js";



// Connect to MongoDB
connectDB();

const app = express();

// Basic security headers
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// CORS
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("CORS blocked for origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Raw body for Razorpay webhooks (must come BEFORE express.json)
app.use(
  "/subscription/webhook",
  express.raw({ type: "application/json" })
);

// Body parsers for everything else
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Disabled due to incompatibility with Express 5 (see note above).
// app.use(mongoSanitize());

// Health check
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Routes
app.use("/auth", authRoutes);
app.use("/subscription", subscriptionRoutes);
app.use("/software", deviceRoutes);
app.use("/legal", legalRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Subscription backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


