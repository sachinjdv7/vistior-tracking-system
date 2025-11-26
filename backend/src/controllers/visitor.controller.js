import { Visitor } from "../models/visitor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const visitorIn = async (req, res) => {
  try {
    const {
      visitorNumber,
      visitorName,
      mobileNumber,
      contactPerson,
      purpose,
      numberOfPersons,
      vehicleNumber,
    } = req.body;

    if (!req.user) {
      throw new ApiError(401, "Unauthorized request");
    }

    if (
      !visitorNumber ||
      !visitorName ||
      !mobileNumber ||
      !contactPerson ||
      !purpose
    ) {
      throw new ApiError(400, "All required fields must be provided");
    }

    const existingVisitor = await Visitor.findOne({
      visitorNumber,
      outTime: { $exists: false },
    });

    if (existingVisitor) {
      throw new ApiError(409, "Visitor already checked in");
    }

    const visitor = await Visitor.create({
      visitorNumber,
      visitorName,
      mobileNumber,
      contactPerson,
      purpose,
      numberOfPersons,
      vehicleNumber,
      inTime: new Date(),
      createdBy: req.user.id,
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { visitorId: visitor._id },
          "Visitor checked in successfully"
        )
      );
  } catch (error) {
    console.error("Error while tracking visitor in:", error);
    return res
      .status(error?.statusCode || 500)
      .json(
        new ApiResponse(
          error?.statusCode || 500,
          null,
          error?.message || "Server error"
        )
      );
  }
};

const visitorOut = async (req, res) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized request");
    }

    const { visitorId } = req.params;

    const visitor = await Visitor.findById(visitorId);

    if (!visitor) {
      throw new ApiError(404, "User not found");
    }

    if (visitor.outTime) {
      throw new ApiError(400, "Visitor already checked out");
    }

    const outTime = new Date();
    const totalTimeSpent = Math.round((outTime - visitor.inTime) / 60000);

    visitor.outTime = outTime;
    visitor.totalTimeSpent = totalTimeSpent;
    visitor.status = "OUT";
    visitor.updatedBy = req.user.id;

    await visitor.save();

    res
      .status(200)
      .json(new ApiResponse(200, visitor, "Visitor checked out successfully"));
  } catch (error) {
    console.error("Error while tracking visitor out:", error);
    res
      .status(error?.statusCode || 500)
      .json(
        new ApiResponse(
          error?.statusCode || 500,
          null,
          error?.message || "Server error"
        )
      );
  }
};

const updateMeetingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const { visitorId } = req.params;

    const visitor = await Visitor.findById(visitorId);

    if (!visitor) {
      throw new ApiError(404, "visitor not found");
    }

    visitor.meetingStatus = status;
    visitor.updatedBy = req.user.id;

    await visitor.save();
  } catch (error) {
    console.error("Error while updating meeting error:", error);
    res
      .status(error?.statusCode || 500)
      .json(
        new ApiResponse(
          error?.statusCode || 500,
          null,
          error?.message || "Server error"
        )
      );
  }
};

const getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });

    res
      .status(200)
      .json(
        new ApiResponse(200, { visitors }, "All visitors fetched successfully")
      );
  } catch (error) {
    console.error("Error while tracking visitor out:", error);
    res
      .status(error?.statusCode || 500)
      .json(
        new ApiResponse(
          error?.statusCode || 500,
          null,
          error?.message || "Server error"
        )
      );
  }
};

const getAllAssignedVisitors = async (req, res) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized request");
    }

    const assignedTo = req.user.username;

    const visitors = await Visitor.find({
      contactPerson: assignedTo,
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, { visitors }, "All visitors fetched successfully")
      );
  } catch (error) {
    console.error("Error while fetching assigned visitors:", error);
    res
      .status(error?.statusCode || 500)
      .json(
        new ApiResponse(
          error?.statusCode || 500,
          null,
          error?.message || "Server error"
        )
      );
  }
};

export {
  visitorIn,
  visitorOut,
  updateMeetingStatus,
  getAllVisitors,
  getAllAssignedVisitors,
};
