const express = require("express");
const { regUser, login, forgotPassword, updatePassword } = require("../controller/userController");
const isValidToken = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/register", regUser);
userRouter.post("/login", isValidToken, login);
userRouter.post('/forgotPassword/:id', isValidToken, forgotPassword);
userRouter.put('/updatePassword/:id', isValidToken, updatePassword)

module.exports = userRouter;
