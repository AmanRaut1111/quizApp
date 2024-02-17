const bcrypt = require("bcrypt");
const userModel = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


const regUser = async (req, res) => {
    try {
        const { userName, email, password, phoneNo } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const userData = await userModel({
            userName: userName,
            email: email,
            password: hash,
            phoneNo: phoneNo,
        });
        const token = jwt.sign({ _id: userData._id }, process.env.SECRET_KEY, { expiresIn: process.env.expiresIn });
        const data = await userData.save();

        if (data) {
            res.status(200).json({
                message: "User  is Registered Sucessfully...!",
                status: true,
                statusCode: 200,
                data: data,
                token: token,
            });
        } else {
            res.status(400).json({
                message: "Something Went Wrong..!",
                status: false,
                statusCode: 400,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something Went Wrong..!",
            status: false,
            statusCode: 500,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if ((email, password)) {
            const checkUser = await userModel.findOne({ email });
            if (checkUser) {
                const matchpassword = await bcrypt.compare(
                    password,
                    checkUser.password
                );
                if (matchpassword) {
                    res.status(200).json({
                        message: "User login Sucessfully..!",
                        status: true,
                        statusCode: 200,
                    });
                } else {
                    res.status(400).json({
                        message: "Password does not Match..!",
                        status: false,
                        statusCode: 400,
                    });
                }
            } else {
                res
                    .status(400)
                    .json({ mesage: "User is Not Found", status: false, statuCode: 400 });
            }
        } else {
            res.status(400).json({
                message: "Something Went Wrong...!",
                status: false,
                statuCode: 400,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something Went Wrong...!",
            status: false,
            statuCode: 500,
        });
    }
};


const forgotPassword = async (req, res) => {


    try {

        const { id } = req.params
        const findUser = await userModel.findById(id)

        if (findUser) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.user,
                    pass: process.env.pass
                },
            });

            const mailoption = {
                from: process.env.from,
                to: findUser.email,
                subject: "passsword update",
                html: '<p>Click  below link  for update the password  <br><br> <link> http://localhost:3000/recoverpassword <link/> </p>'


            };

            const mailData = await transporter.sendMail(mailoption);
            if (mailData) {
                res.status(200).json({ message: "Mail Send Sucessfully to  your registered Email Address,please check...!", status: true, statusCode: 200 })
            } else {


                res.status(400).json({ mesage: "Something Went Wrong", status: false, statusCode: 400 })
            }

        } else {
            res.status(401).json({ message: "This Email is Not Found...please Try Again...!", status: false, statusCode: 401 })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mesage: "Something Went Wrong", status: false, statusCode: 500 })
    }
}


module.exports = { regUser, login, forgotPassword };
