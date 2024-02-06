const mongoose = require('mongoose');

const userSchenma = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    phoneNo: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('user', userSchenma)