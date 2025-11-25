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

export { login };
