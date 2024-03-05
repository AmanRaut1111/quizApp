const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    phoneNo: {
        type: Number,
        required: true,
    },

    otp: {
        type: String,
    },
    otp_generated_at: {
        type: Date,
        default: new Date(),
    },

    upadtedOn: {
        type: Date,
        default: new Date(),
    },
});

module.exports = mongoose.model("admin", adminSchema);
