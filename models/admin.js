const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },

    phone: {
        type: Number,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("admin", adminSchema);
