const adminModel = require('../models/admin');
const passwordhelper = require('../helpers/password');
require("dotenv").config();
const jwt = require('jsonwebtoken');




const registerAdmin = async (req, res) => {
    try {
        const { userName, phoneNo, password } = req.body

        const admindata = await adminModel({
            userName: userName,
            phoneNo: phoneNo,
            password: await passwordhelper.hash(password)
        })

        const data = await admindata.save();

        const token = jwt.sign({ _id: data._id }, process.env.SECRET_KEY, { expiresIn: "1y" })
        if (data) {
            res.status(200).json({ message: "Admin added sucesssfully...!", status: 200, statsuCode: 200, data: data, token: token })
        } else {
            res.status(400).json({ message: "Something Went Wrong...!", status: false, statusCode: 400 })
        }
    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Something Went Wrong...!", status: false, statusCode: 500 })
    }
};



const adminLogin = async (req, res) => {
    try {
        const { userName, password } = req.body
        const check = await adminModel.findOne({ userName });
        if (check) {
            const matchPassword = await passwordhelper.passwordCompare(password, check.password);

            if (matchPassword) {
                res.status(200).json({ message: "Admin Login Sucessfully...!", status: true, statusCode: 200 })
            } else {
                res.status(401).json({ message: "Invalid crediantial..!", status: false, statusCode: 401 })
            }
        } else {
            res.status(404).json({ message: "User is not found try again !", status: false, statusCode: 404 })
        }
    } catch (error) {
        console.log(error);


        res.status(500).json({ message: "Something Went Wrong...!", status: false, statsuCode: 500 })
    }
}

module.exports = {
    registerAdmin, adminLogin
}
