const express = require('express');
const { submitAnswer, getUserQuiz, getQuizScore } = require('../controller/answerController');



const answerRouter = express.Router();

answerRouter.post('/submit', submitAnswer);
answerRouter.get('/getUserQuiz', getUserQuiz)
answerRouter.get('/getUserScore', getQuizScore)

module.exports = answerRouter