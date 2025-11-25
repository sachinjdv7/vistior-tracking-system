import express from "express";
import { createUser, getAllUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.get("/list", getAllUser);

export { userRouter };
