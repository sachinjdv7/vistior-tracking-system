import express from "express";
import { visitorIn, visitorOut } from "../controllers/visitor.controller.js";

const visitorRouter = express.Router();

visitorRouter.post("/check-in ", visitorIn);
visitorRouter.patch("/check-out ", visitorOut);

export { visitorRouter };
