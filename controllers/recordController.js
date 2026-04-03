const Record = require("../models/Record");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

// Create record
exports.createRecord = async (req, res) => {
  const { amount, type, category, userId } = req.body;

  // Validate user existence
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(400, "Invalid userId: User does not exist");
  }

  if (!amount || amount <= 0) {
    throw new ApiError(400, "Invalid amount");
  }

  if (!["income", "expense"].includes(type)) {
    throw new ApiError(400, "Type must be income or expense");
  }

  if (!category) {
    throw new ApiError(400, "Category is required");
  }

  const record = await Record.create(req.body);

  res.status(201).json({ success: true, data: record });
};

// Get records with filters
exports.getRecords = async (req, res) => {
  const { type, category } = req.query;

  let filter = {};

  if (type) filter.type = type;
  if (category) filter.category = category;

  const records = await Record.find(filter);

  res.json({ success: true, data: records });
};

// Update record
exports.updateRecord = async (req, res) => {
  const updatedRecord = await Record.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedRecord) {
    throw new ApiError(404, "Record not found");
  }

  res.json({ success: true, data: updatedRecord });
};

// Delete record
exports.deleteRecord = async (req, res) => {
  const record = await Record.findByIdAndDelete(req.params.id);

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  res.json({ success: true, message: "Record deleted" });
};