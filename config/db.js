const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.DB).then(() => {
    console.log("connected to db");
}).catch((error) => {
    console.log(error);
})