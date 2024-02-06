const express = require('express');
const { addQuestion, getAllQuestions } = require('../controller/questionController');

const questionRouter = express.Router();


questionRouter.post('/addQuestion', addQuestion);
questionRouter.get('/getQuestions', getAllQuestions)



module.exports = questionRouter