const express = require("express");
const router = express.Router();

const authorize = require("../middleware/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordController");

// Admin can create
router.post("/", authorize(["admin"]), asyncHandler(createRecord));

// Admin and Analyst can view
router.get("/", authorize(["admin", "analyst"]), asyncHandler(getRecords));

// Admin can update
router.patch("/:id", authorize(["admin"]), asyncHandler(updateRecord));

// Only Admin can delete
router.delete("/:id", authorize(["admin"]), asyncHandler(deleteRecord));

module.exports = router;