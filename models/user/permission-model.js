const { Schema, model } = require("mongoose");

const PermissionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    roleId: { type: Schema.Types.ObjectId, ref: "Role" },
  },
  { timestamps: true }
);

module.exports = model("Permission", PermissionSchema);
