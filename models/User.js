const mongoose = require("mongoose");

const Record = require("./Record");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    role: {
      type: String,
      enum: ["viewer", "analyst", "admin"],
      default: "viewer",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

userSchema.post("findOneAndDelete", async function (user) {
  if (user) {
    await Record.deleteMany({ userId: user._id });
  }
});

module.exports = mongoose.model("User", userSchema);