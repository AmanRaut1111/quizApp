const express = require('express');
const { registerAdmin, adminLogin, sendOtp, verifyOtp, updatePassword } = require('../controller/adminController');
const isValidToken = require('../middleware/auth');

const adminRouter = express.Router();

adminRouter.post('/add', registerAdmin);
adminRouter.post('/login', isValidToken, adminLogin);
adminRouter.post('/sendOtp', sendOtp)
adminRouter.post('/verifyOtp', verifyOtp);
adminRouter.post('/updatePassword/:_id', updatePassword)


module.exports = adminRouter