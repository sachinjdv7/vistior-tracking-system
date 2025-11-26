import express from "express";
import { createUser, getAllUser } from "../controllers/user.controller.js";
import {
  authrizeRoles,
  isAdmin,
  isUserLoggedIn,
} from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/create", isUserLoggedIn, authrizeRoles("admin"), createUser);
userRouter.get("/list", isUserLoggedIn, authrizeRoles("admin"), getAllUser);

export { userRouter };
