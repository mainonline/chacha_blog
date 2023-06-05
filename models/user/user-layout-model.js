const { Schema, model } = require("mongoose");
const { settingsConfig } = require("../../constants/layoutSettings");

const UserLayout = new Schema(
  {
    settings: {
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
