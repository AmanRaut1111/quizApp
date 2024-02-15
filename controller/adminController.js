const adminModel = require('../models/admin');
const passwordhelper = require('../helpers/password')




const registerAdmin = async (req, res) => {
    try {
        const { userName, phoneNo, password } = req.body

        const admindata = await adminModel({
            userName: userName,
            phoneNo: phoneNo,
            password: await passwordhelper.hash(password)
        })

        const data = await admindata.save();
        if (data) {
            res.status(200).json({ message: "Admin added sucesssfully...!", status: 200, statsuCode: 200, data: data })
        } else {
            res.status(400).json({ message: "Something Went Wrong...!", status: false, statusCode: 400 })
        }
    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Something Went Wrong...!", status: false, statusCode: 500 })
    }
}

module.exports = registerAdmin