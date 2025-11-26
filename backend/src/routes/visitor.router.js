import express from "express";
import { visitorIn } from "../controllers/visitor.controller.js";

const visitorRouter = express.Router();

visitorRouter.post("/check-in ", visitorIn);

export { visitorRouter };
