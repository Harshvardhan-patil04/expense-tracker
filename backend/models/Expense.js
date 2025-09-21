const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: String,
  amount: Number,
  comments: String,
}, { timestamps: true });

module.exports = mongoose.model("Expense", ExpenseSchema);
