import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    visitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model(
  "Activity",
  activitySchema
);

export default Activity;