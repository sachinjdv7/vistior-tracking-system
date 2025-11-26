import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "../models/users.model.js";

dotenv.config({ path: "../../.env" });

async function seedAdmin() {
  try {
    console.log("connecting to the database");
    await mongoose.connect(`${process.env.MONGODB_URI}/visitor-app`);

    const existedAdmin = await User.findOne({ role: "admin" });

    if (existedAdmin) {
      console.log("Admin user already existed");
      process.exit(0);
    }

    const hashPassword = await bcrypt.hash("admin@1234", 10);

    const adminUser = new User({
      username: "admin",
      password: hashPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully!!!");

    await mongoose.connection.close(); 
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin", error);
    process.exit(1);
  }
}

seedAdmin();
