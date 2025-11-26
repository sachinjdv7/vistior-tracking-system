import express from "express";
import {
  getAllAssignedVisitors,
  getAllVisitors,
  updateMeetingStatus,
  visitorIn,
  visitorOut,
} from "../controllers/visitor.controller.js";
import {
  authrizeRoles,
  isUserLoggedIn,
} from "../middlewares/auth.middleware.js";

const visitorRouter = express.Router();

visitorRouter.post(
  "/check-in",
  isUserLoggedIn,
  authrizeRoles("security"),
  visitorIn
);
visitorRouter.patch(
  "/check-out/:visitorId",
  isUserLoggedIn,
  authrizeRoles("security"),
  visitorOut
);
visitorRouter.patch(
  "/meeting-status/:visitorId",
  isUserLoggedIn,
  authrizeRoles("manager", "hr"),
  updateMeetingStatus
);
visitorRouter.get(
  "/list",
  isUserLoggedIn,
  authrizeRoles("admin", "security"),
  getAllVisitors
);

visitorRouter.get(
  "/assigned",
  isUserLoggedIn,
  authrizeRoles("manager", "hr"),
  getAllAssignedVisitors
);

export { visitorRouter };
