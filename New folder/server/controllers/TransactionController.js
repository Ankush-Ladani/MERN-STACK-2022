import Transaction from "../models/Transaction.js";

export const index = async (req, res) => {
  const transaction = await Transaction.find({}).sort({ createdAt: -1 });
  res.json({ data: transaction, message: "Successfull" });
};

export const deleteTransaction = async (req, res) => {
  await Transaction.deleteOne({ _id: req.params.id });
  res.json({ message: "success" });
};

export const addTransaction = async (req, res) => {
  const { amount, description, date } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    date,
  });
  await transaction.save();
  res.json({ message: "Success" });
};

export const updateTransaction = async (req, res) => {
  await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
  res.json({ message: "Updated Successfully" });
};
