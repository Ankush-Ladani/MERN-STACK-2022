import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import Transaction from "./models/Transaction.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = 4000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

await mongoose.connect(process.env.MONGO_URL);
console.log("MongoDB connection is successful");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/transaction", async (req, res) => {
  // During sorting if we provide -1 then latest will come first and if 1 then latest will come last
  const transaction = await Transaction.find({}).sort({ createdAt: 1 });
  res.json(transaction);
});

app.post("/transaction", async (req, res) => {
  const { amount, description, date } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    date,
  });
  await transaction.save();
  res.json({ message: "Success" });
});

app.listen(PORT, () => {
  console.log("Server is running at http://localhost:4000");
});
