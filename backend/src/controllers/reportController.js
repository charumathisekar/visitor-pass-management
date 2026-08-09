import Visitor from "../models/Visitor.js";

export const getVisitorReport = async (req, res) => {
  try {
    const total = await Visitor.countDocuments();

    const pending = await Visitor.countDocuments({
      status: "Pending",
    });

    const approved = await Visitor.countDocuments({
      status: "Approved",
    });

    const rejected = await Visitor.countDocuments({
      status: "Rejected",
    });

    const checkedIn = await Visitor.countDocuments({
      status: "Checked In",
    });

    const checkedOut = await Visitor.countDocuments({
      status: "Checked Out",
    });

    res.status(200).json({
      total,
      pending,
      approved,
      rejected,
      checkedIn,
      checkedOut,
    });
  } catch (error) {
    console.error("REPORT ERROR:", error);

    res.status(500).json({
      message: "Failed to generate report",
    });
  }
};