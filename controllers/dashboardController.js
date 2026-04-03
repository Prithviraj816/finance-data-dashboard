const Record = require("../models/Record");

exports.getSummary = async (req, res) => {
  const records = await Record.find();

  const totalIncome = records
    .filter(r => r.type === "income")
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpense = records
    .filter(r => r.type === "expense")
    .reduce((sum, r) => sum + r.amount, 0);

  const balance = totalIncome - totalExpense;

  res.json({
    success: true,
    data: {
      totalIncome,
      totalExpense,
      balance,
    },
  });
};