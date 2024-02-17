const express = require('express');
const { registerAdmin, adminLogin } = require('../controller/adminController');
const isValidToken = require('../middleware/auth');

const adminRouter = express.Router();

adminRouter.post('/add', registerAdmin);
adminRouter.post('/login', isValidToken, adminLogin)


module.exports = adminRouter