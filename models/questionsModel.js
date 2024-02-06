const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    quizName: {
        type: String,
        require: true,
    },
    options: {
        type: Array,
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: new Date(),
    },

    updatedAt: {
        type: Date,
        default: new Date(),
    },
});

module.exports = mongoose.model("question", questionSchema);
