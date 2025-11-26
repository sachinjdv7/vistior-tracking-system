import bcrypt from "bcryptjs";
import { User } from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createUser = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      throw new ApiError(400, "Username, password and role are required");
    }

    const existedUser = await User.findOne({ username });

    if (existedUser) {
      throw new ApiError(409, "User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashPassword, role });

    await newUser.save();

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { username: newUser.username },
          "User created successfully"
        )
      );
  } catch (error) {
    console.error("Error while creating user:", error);
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

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");

    res
      .status(200)
      .json(new ApiResponse(200, { users }, "All users fetched successfully"));
  } catch (error) {
    console.error("Error while fetching all users:", error);
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

export { createUser, getAllUser };
