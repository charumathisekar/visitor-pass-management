import Visitor from "../models/Visitor.js";
import Activity from "../models/Activity.js";

// Register Visitor
export const registerVisitor = async (req, res) => {
  try {
    const {
      visitorName,
      phone,
      purpose,
      personToMeet,
      visitDate,
    } = req.body;

    if (
      !visitorName ||
      !phone ||
      !purpose ||
      !personToMeet ||
      !visitDate
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const visitor = await Visitor.create({
      visitorName,
      phone,
      purpose,
      personToMeet,
      visitDate,
      registeredBy: req.user.userId,
    });

    await Activity.create({
      action: "REGISTER",
      description: `Visitor ${visitor.visitorName} was registered`,
      user: req.user.userId,
      visitor: visitor._id,
    });

    res.status(201).json({
      message: "Visitor registered successfully",
      visitor,
    });
  } catch (error) {
    console.error("REGISTER VISITOR ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get All Visitors
export const getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find()
      .populate("registeredBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Visitors fetched successfully",
      visitors,
    });
  } catch (error) {
    console.error("GET VISITORS ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Approve Visitor
export const approveVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
console.log("CHECK OUT NAME:", visitor?.visitorName);
console.log("CHECK OUT STATUS:", visitor?.status);
console.log("CHECK OUT ID:", req.params.id);
    if (!visitor) {
      return res.status(404).json({
        message: "Visitor not found",
      });
    }

    if (visitor.status !== "Pending") {
      return res.status(400).json({
        message: "Only pending visitors can be approved",
      });
    }

    visitor.status = "Approved";

    await visitor.save();

    await Activity.create({
      action: "APPROVE",
      description: `Visitor ${visitor.visitorName} was approved`,
      user: req.user.userId,
      visitor: visitor._id,
    });

    res.status(200).json({
      message: "Visitor approved successfully",
      visitor,
    });
  } catch (error) {
    console.error("APPROVE ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Reject Visitor
export const rejectVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        message: "Visitor not found",
      });
    }

    if (visitor.status !== "Pending") {
      return res.status(400).json({
        message: "Only pending visitors can be rejected",
      });
    }

    visitor.status = "Rejected";

    await visitor.save();

    await Activity.create({
      action: "REJECT",
      description: `Visitor ${visitor.visitorName} was rejected`,
      user: req.user.userId,
      visitor: visitor._id,
    });

    res.status(200).json({
      message: "Visitor rejected successfully",
      visitor,
    });
  } catch (error) {
    console.error("REJECT ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Check In Visitor
export const checkInVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    console.log("CHECK IN VISITOR:", visitor);
    console.log("CHECK IN STATUS:", visitor?.status);

    if (!visitor) {
      return res.status(404).json({
        message: "Visitor not found",
      });
    }

    if (visitor.status !== "Approved") {
      return res.status(400).json({
        message: "Only approved visitors can check in",
      });
    }

    visitor.status = "Checked In";

    await visitor.save();

    

    await Activity.create({
      action: "CHECK_IN",
      description: `Visitor ${visitor.visitorName} checked in`,
      user: req.user.userId,
      visitor: visitor._id,
    });

    res.status(200).json({
      message: "Visitor checked in successfully",
      visitor,
    });
  } catch (error) {
    console.error("CHECK IN ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Check Out Visitor
export const checkOutVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        message: "Visitor not found",
      });
    }

    // Only Checked In visitor can Check Out
    if (visitor.status !== "Checked In") {
      return res.status(400).json({
        message: "Only checked-in visitors can check out",
      });
    }

    visitor.status = "Checked Out";

    await visitor.save();

    await Activity.create({
      action: "CHECK_OUT",
      description: `Visitor ${visitor.visitorName} checked out`,
      user: req.user.userId,
      visitor: visitor._id,
    });

    res.status(200).json({
      message: "Visitor checked out successfully",
      visitor,
    });
  } catch (error) {
    console.error("CHECK OUT ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};