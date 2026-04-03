const User = require("../models/User");


const ApiError = require("../utils/ApiError");

// Create user
exports.createUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new ApiError(400, "Name and email are required");
  }

  const user = await User.create(req.body);

  res.status(201).json({ success: true, data: user });
};

// Get all users
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ success: true, data: users });
};

// Update user
exports.updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json({ success: true, data: updatedUser });
};

//Delete user
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.json({
    success: true,
    message: "User and related records deleted",
  });
};