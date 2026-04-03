const express = require("express");
const router = express.Router();

const authorize = require("../middleware/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} = require("../controllers/userController");

// Only admin can create users
router.post("/", authorize(["admin"]), asyncHandler(createUser));

// Only admin can view users
router.get("/", authorize(["admin"]), asyncHandler(getUsers));

// Only admin can update users
router.patch("/:id", authorize(["admin"]), asyncHandler(updateUser));

//Only admin can delete users
router.delete("/:id", authorize(["admin"]), asyncHandler(deleteUser));

module.exports = router;