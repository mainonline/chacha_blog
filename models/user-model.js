const { Schema, model, mongoose } = require("mongoose");
const { settingsConfig } = require("../constants/layoutSettings");

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: { type: Object, default: null },
    banned: { type: Boolean, default: false },
    layout: { type: Object, default:  settingsConfig },
    roles: [{ type: String, ref: "Role" }],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
