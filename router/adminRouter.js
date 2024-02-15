const express = require('express');
const registerAdmin = require('../controller/adminController');

const adminRouter = express.Router();

adminRouter.post('/add', registerAdmin);


module.exports = adminRouter