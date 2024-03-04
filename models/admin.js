const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({


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
