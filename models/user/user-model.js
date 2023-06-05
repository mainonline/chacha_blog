const { Schema, model, mongoose } = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: { type: Object, default: null },
    banned: { type: Boolean, default: false },
    layoutId: { type: Schema.Types.ObjectId, ref: "UserLayout" },
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
