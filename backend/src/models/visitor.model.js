import mongoose from "mongoose";
import validator from "validator";

const visitorSchema = new mongoose.Schema(
  {
    visitorNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      match: [/^VN\d{3,6}$/, "Visitor number must be like VN101"],
    },

    visitorName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 40,
    },

    mobileNumber: {
      type: String,
      required: true,
      validate: {
        validator: validator.isMobilePhone,
        message: "Invalid mobile number",
      },
    },

    contactPerson: {
      type: String,
      required: true,
      trim: true,
    },

    purpose: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    numberOfPersons: {
      type: Number,
      min: 1,
      max: 50,
      default: 1,
    },

    vehicleNumber: {
      type: String,
      trim: true,
      uppercase: true,
      match: [/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/, "Invalid vehicle number"],
    },

    inTime: { type: Date, default: Date.now },
    outTime: { type: Date },

    totalTimeSpent: {
      type: Number,
      min: 0,
    },

    photoUrl: {
      type: String,
      validate: {
        validator: validator.isURL,
        message: "Invalid photo URL",
      },
    },

    meetingStatus: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Visitor = mongoose.model("Visitor", visitorSchema);
