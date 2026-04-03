const User = require("../models/User");

// Middleware to check the role of the user from header
const authorize = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const role = req.headers.role;

      if (!role) {
        return res.status(401).json({
          success: false,
          message: "Role header missing",
        });
      }

      if (!allowedRoles.includes(role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
};

module.exports = authorize;