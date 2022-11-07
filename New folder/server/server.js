import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import connect from "./database/mongdb.js";
import TransactionsApi from "./routes/TransactionsApi.js";
import RegisterUserApi from "./routes/AuthApi.js";
import dotenv from "dotenv";
import passport from "passport";
import passportConfig from "./config/passport.js";

dotenv.config();
const PORT = 4000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/transaction", TransactionsApi);
app.use("/auth", RegisterUserApi);

await connect();

app.listen(PORT, () => {
  console.log("Server is running at http://localhost:4000");
});
