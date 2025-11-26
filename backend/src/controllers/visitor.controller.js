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

    console.log("req id in visitor in ", req.user.id);

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
      return res.status(409).json({
        message: "Visitor already checked in",
      });
    }

    const visitor = new Visitor({
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

    await visitor.save();

    res
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


export { visitorIn };
