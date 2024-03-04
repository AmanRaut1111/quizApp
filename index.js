const express = require("express");
const db = require("./config/db");
const twilio = require('twilio');
require("dotenv").config();
const questionRouter = require("./router/questionRouter");
const userRouter = require("./router/userRouter");
const answerRouter = require("./router/answerRouter");
const adminRouter = require("./router/adminRouter");



const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to Quiz");
});



app.use(express.json());

app.use("/", questionRouter);

app.use("/user", userRouter);
app.use("/answer", answerRouter);
app.use('/admin', adminRouter)

app.listen(process.env.PORT, () => {
    console.log("server is listening on port 5000");
});
