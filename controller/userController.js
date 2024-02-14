const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

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
        const token = jwt.sign({ id: userData._id }, "Aman", { expiresIn: "1y" });
        const data = await userData.save();

        if (data) {
            res
                .status(200)
                .json({
                    message: "User  is Registered Sucessfully...!",
                    status: true,
                    statusCode: 200,
                    data: data,
                    token: token,
                });
        } else {
            res
                .status(400)
                .json({
                    message: "Something Went Wrong..!",
                    status: false,
                    statusCode: 400,
                });
        }
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({
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
                    res
                        .status(200)
                        .json({
                            message: "User login Sucessfully..!",
                            status: true,
                            statusCode: 200,
                        });
                } else {
                    res
                        .status(400)
                        .json({
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
            res
                .status(400)
                .json({
                    message: "Something Went Wrong...!",
                    status: false,
                    statuCode: 400,
                });
        }
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({
                message: "Something Went Wrong...!",
                status: false,
                statuCode: 500,
            });
    }
};

module.exports = { regUser, login };
