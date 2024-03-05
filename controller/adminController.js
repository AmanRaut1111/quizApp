const adminModel = require("../models/admin");
const passwordhelper = require("../helpers/password");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { otpGenerator, client } = require("../helpers/optpGenerator");
const twilio = require("twilio");

const registerAdmin = async (req, res) => {
    try {
        const { userName, password, phoneNo } = req.body;
        const adminData = await adminModel({
            userName: userName,
            password: await passwordhelper.hash(password),
            phoneNo: phoneNo,
        });

        const data = await adminData.save();

        if (data) {
            res.status(200).json({
                message: "Admin Registered sucessfully...!",
                status: true,
                statusCode: 200,
                data: data,
            });
        } else {
            res.status(400).json({
                message: "Something went Wrong...!",
                status: false,
                statusCode: 400,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went Wrong...!",
            status: false,
            statusCode: 500,
        });
    }
};

const sendOtp = async (req, res) => {
    try {
        const { phoneNo } = req.body;

        const check = await adminModel.findOne({ phoneNo });
        if (check) {
            const otp = await otpGenerator();
            client.messages.create({
                body: ` Dear ${check.userName}  ${otp} is your one time password (OTP).Thank You,Team Nodejs`,
                from: process.env.from,
                to: process.env.to,
            });

            const data = await adminModel.updateOne({
                otp: otp,
                otp_generated_at: new Date(),
            });
            if (data) {
                res.status(200).json({
                    message: "OTP sent Sucessfully..!",
                    status: true,
                    statusCode: 200,
                });
            } else {
                res.statu(400).json({
                    message: "Something Went wrong...!",
                    status: false,
                    statusCode: 400,
                });
            }
        } else {
            res.status(401).json({
                message:
                    " Not Found...!, Please enter Your registered mobile number...!",
                status: false,
                statusCode: 401,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something Went wrong..!",
            status: false,
            statusCode: 500,
        });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { phoneNo, otp } = req.body;

        console.log(otp);

        const check = await adminModel.findOne({ phoneNo: phoneNo });

        console.log(check.otp);
        if (!(check.otp === otp)) {
            return res.status(401).json({ message: "Invalid Otp" });
        } else {
            res.status(200).json({
                message: "OTP verify sucessfully...!",
                status: true,
                statsuCode: 200,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const adminLogin = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const check = await adminModel.findOne({ userName });
        if (check) {
            const matchPassword = await passwordhelper.passwordCompare(
                password,
                check.password
            );

            if (matchPassword) {
                res.status(200).json({
                    message: "Admin Login Sucessfully...!",
                    status: true,
                    statusCode: 200,
                });
            } else {
                res.status(401).json({
                    message: "Invalid crediantial..!",
                    status: false,
                    statusCode: 401,
                });
            }
        } else {
            res.status(404).json({
                message: "User is not found try again !",
                status: false,
                statusCode: 404,
            });
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something Went Wrong...!",
            status: false,
            statsuCode: 500,
        });
    }
};

module.exports = {
    registerAdmin,
    adminLogin,
    verifyOtp,
    sendOtp,
};
