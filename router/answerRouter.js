const express = require('express');
const { submitAnswer, getUserQuiz } = require('../controller/answerController');



const answerRouter = express.Router();

answerRouter.post('/submit', submitAnswer);
answerRouter.get('/getUserQuiz', getUserQuiz)

module.exports = answerRouter