import Activity from "../models/Activity.js";

export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("user", "name email role")
      .populate("visitor", "visitorName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      activities,
    });
  } catch (error) {
    console.error("GET ACTIVITIES ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};