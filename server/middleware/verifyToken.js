import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(createError(401, "You are not authenticated"));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(createError(401, "You are not authenticated"));
    }

    const decoded = jwt.verify(token, process.env.JWT);
    req.user = decoded; // { id: ... }

    next();
  } catch (err) {
    // 🔥 IMPORTANT FIX
    if (err.name === "JsonWebTokenError") {
      return next(createError(401, "Invalid token"));
    }

    if (err.name === "TokenExpiredError") {
      return next(createError(401, "Token expired"));
    }

    next(createError(401, "Authentication failed"));
  }
};
