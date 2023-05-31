const { Schema, model } = require("mongoose");
import settingsConfig from "../constants/layoutSettings";

const UserLayout = new Schema(
  {
    settigns: {
      type: Object,
      default: settingsConfig,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("UserLayout", UserLayout);
