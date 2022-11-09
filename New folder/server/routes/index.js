import express from "express";
import TransactionsApi from "./TransactionsApi.js";
import RegisterUserApi from "./AuthApi.js";
import UserApi from "./UserApi.js";
const router = express.Router();

router.use("/transaction", TransactionsApi);
router.use("/auth", RegisterUserApi);
router.use("/user", UserApi);

export default router;
