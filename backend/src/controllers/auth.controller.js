import { User } from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new ApiError(400, "Username and password are required");
    }

    const user = await User.findOne({ username });

    if (!user) {
      throw new ApiError(400, "Invalid username or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid username or password");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: user.name, token },
          "User login successfully"
        )
      );
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(error?.statusCode || 500)
      .json(
        new ApiResponse(
          error?.statusCode || 500,
          null,
          error?.message || "Server error"
        )
      );
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res
    .status(200)
    .json(new ApiResponse(200, null, "User logged out successfully"));
};

const getCurrentUser = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized request");
    }
    const { id } = req.user;

    const user = await User.findById(id).select("-password");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, { user }, "User fetched successfully"));
  } catch (error) {
    console.error("Error fetching current user:", error);
    res
      .status(error?.statusCode || 500)
      .json(
        new ApiResponse(
          error?.statusCode || 500,
          null,
          error?.message || "Server error"
        )
      );
  }
};

export { login, logout, getCurrentUser };
