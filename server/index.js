import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import UserRouter from "./routes/Users.js";
import ProductRouter from "./routes/Products.js";

dotenv.config();

const app = express();

/* ---------------- SECURITY MIDDLEWARE ---------------- */

// CORS
app.use(cors());

// Secure headers
app.use(helmet());

// Body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Rate limit ONLY for API routes (IMPORTANT)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200, // dev ke liye thoda high
  skipSuccessfulRequests: true,
  message: "Too many requests, please slow down."
});

// Apply limiter only on /api
app.use("/api", apiLimiter);

/* ---------------- ROUTES ---------------- */

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the secure server!",
  });
});

app.use("/api/user", UserRouter);
app.use("/api/products", ProductRouter);

/* ---------------- ERROR HANDLER ---------------- */

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

/* ---------------- DATABASE ---------------- */

const ConnectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_DB);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB error:", err.message);
  }
};

/* ---------------- START SERVER ---------------- */

const PORT = process.env.PORT || 5000;

const StartServer = async () => {
  try {
    await ConnectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error:", error.message);
  }
};

StartServer();