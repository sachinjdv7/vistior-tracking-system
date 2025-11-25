import bcrypt from "bcryptjs";
import { User } from "../models/users.model";

const createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({
        message: "username, password and role required",
      });
    }

    const existedUser = await User.findOne({ username });

    if (existedUser) {
      return res.status(409).json({
        message: "User already existed",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashPassword, role });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log("Error while creating user", error);
    res.status(500).json({ error: "server error" });
  }
};

export { createUser };
