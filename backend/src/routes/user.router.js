import express from "express";
import { createUser, getAllUser } from "../controllers/user.controller.js";
import { isAdmin, isUserLoggedIn } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/create", isUserLoggedIn, isAdmin, createUser);
userRouter.get("/list", isUserLoggedIn, isAdmin, getAllUser);

export { userRouter };
