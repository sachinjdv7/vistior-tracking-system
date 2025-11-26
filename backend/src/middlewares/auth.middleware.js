import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const isUserLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    const status = error?.statusCode || 500;
    return res
      .status(status)
      .json(new ApiResponse(status, null, error?.message || "Server error"));
  }
};

// const isAdmin = (req, res, next) => {
//   try {
//     if (req.user.role !== "admin") {
//       throw new ApiError(403, "Access denied: Admin role required");
//     }
//     next();
//   } catch (error) {
//     console.error("Admin middleware error:", error);
//     const status = error?.statusCode || 500;
//     return res
//       .status(status)
//       .json(new ApiResponse(status, null, error?.message || "Server error"));
//   }
// };

export const authrizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const { role } = req.user;
      if (!allowedRoles.includes(role)) {
        throw new ApiError(
          403,
          "Access denied: you don't have permission to access this resource"
        );
      }
      next();
    } catch (error) {
      console.error("authrizeRoles middleware error:", error);
      const status = error?.statusCode || 500;
      return res
        .status(status)
        .json(new ApiResponse(status, null, error?.message || "Server error"));
    }
  };
};

export { isUserLoggedIn, isAdmin };
