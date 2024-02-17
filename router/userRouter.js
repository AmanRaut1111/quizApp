const express = require("express");
const { regUser, login } = require("../controller/userController");
const isValidToken = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/register", regUser);
userRouter.post("/login", isValidToken, login);

module.exports = userRouter;
