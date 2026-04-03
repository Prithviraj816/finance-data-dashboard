const express = require("express");
const router = express.Router();
const { getSummary } = require("../controllers/dashboardController");
const authorize = require("../middleware/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");

// Analyst, Admin and Viewer can access dashboard
router.get("/summary", authorize(["admin", "analyst", "viewer"]), asyncHandler(getSummary));

module.exports = router;