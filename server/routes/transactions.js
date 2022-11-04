import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.get("/", async (req, res) => {
  // During sorting if we provide -1 then latest will come first and if 1 then latest will come last
  const transaction = await Transaction.find({}).sort({ createdAt: -1 });
  res.json(transaction);
});

router.post("/", async (req, res) => {
  const { amount, description, date } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    date,
  });
  await transaction.save();
  res.json({ message: "Success" });
});

export default router;
