const express = require("express");
const { regUser, login } = require("../controller/userController");

const userRouter = express.Router();

userRouter.post("/register", regUser);
userRouter.post("/login", login);

module.exports = userRouter;
