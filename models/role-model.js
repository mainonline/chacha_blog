const { Schema, model } = require("mongoose");

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Role", RoleSchema);
