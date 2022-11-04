import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import database from "./database/mongodb.js";
import dotenv from "dotenv";
import TransactionRoutes from "./routes/transactions.js";
dotenv.config();

const PORT = 4000;
const app = express();

await database();

app.use(cors());
app.use(bodyParser.json());
app.use("/transaction", TransactionRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running at http://localhost:4000");
});
