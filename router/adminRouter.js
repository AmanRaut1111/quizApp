const express = require('express');
const { registerAdmin, adminLogin } = require('../controller/adminController');

const adminRouter = express.Router();

adminRouter.post('/add', registerAdmin);
adminRouter.post('/login', adminLogin)


module.exports = adminRouter