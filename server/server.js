const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};
connect();
console.log("CONNECTION SUCCESSFUL");

// import express from "express";
// ? We can import express from 'express' but for that we have to set "type" : "module" in package.json
const app = express();

app.use(cors());

const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Good Morning");
});

app.listen(PORT, () => console.log(`Server is Running at ${PORT} PORT`));
