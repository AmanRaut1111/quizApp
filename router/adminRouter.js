const express = require('express');
const { registerAdmin, adminLogin } = require('../controller/adminController');
const auth = require('../middleware/auth');

const adminRouter = express.Router();

adminRouter.post('/add', registerAdmin);
adminRouter.post('/login', auth, adminLogin)


module.exports = adminRouter