import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import connect from "./database/mongdb.js";

import dotenv from "dotenv";
import passport from "passport";
import passportConfig from "./config/passport.js";
import routes from "./routes/index.js";
dotenv.config();
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/", routes);

await connect();

app.listen(PORT, HOST, () => {
  console.log("Server is running at http://localhost:4000");
});
