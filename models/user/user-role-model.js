const { Schema, model } = require("mongoose");

const UserRoleSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    role: { type: Schema.Types.ObjectId, ref: "Role" },
  },
);

module.exports = model("UserRole", UserRoleSchema);
