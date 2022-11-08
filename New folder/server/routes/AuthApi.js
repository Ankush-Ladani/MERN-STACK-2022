import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import jwt from "jsonwebtoken";
import User from "../models/User.js";

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  // 406 not Acceptable
  if (userExists) {
    return res.status(406).json({
      message: "User is Already Registered",
    });
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  // console.log(hashedPassword);

  const user = await User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await user.save();

  res.status(201).send({ message: "User Created" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(406).json({
      message: "User Not Found in DB",
    });
    return;
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    res.status(406).json({
      message: "Password is incorrect",
    });
    return;
  }

  const payload = {
    username: email,
    _id: user._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  // console.log(token);
  res.json({ message: "succesfully logged in.", token });
});

export default router;
