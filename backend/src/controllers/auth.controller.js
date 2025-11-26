import { User } from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const user = await User.findOne({ username });

  if (!user)
    return res.status(400).json({
      message: "invalid username or password",
    });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid)
    return res.status(400).json({
      message: "invalid username or password",
    });

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

  res.status(200).json({
    message: "user login successfully",
    user: user.name,
    token,
  });
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};

const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized request" });
    }
    const { id } = req.user;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { login, logout, getCurrentUser };
