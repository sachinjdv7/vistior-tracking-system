import express from "express";
import { getCurrentUser, login, logout } from "../controllers/auth.controller.js";
import { isUserLoggedIn } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me",isUserLoggedIn, getCurrentUser);

export { authRouter };
