const questionModel = require("../models/questionsModel");

const addQuestion = async (req, res) => {
    try {
        const { question, quizName, options, correctAnswer } = req.body;

        const Questiondata = await questionModel({
            question: question,
            quizName: quizName,
            options: options,
            correctAnswer: correctAnswer,
        });

        const data = await Questiondata.save();
        if (data) {
            res
                .status(200)
                .json({
                    message: "Question is Added Sucessfully..!",
                    status: true,
                    statusCode: 200,
                    data: data,
                });
        } else {
            res
                .status(400)
                .json({
                    message: "Something Went Wrong...!",
                    status: false,
                    statusCode: 400,
                });
        }
    } catch (error) {
        console.log(error);

        res
            .status(500)
            .json({
                message: "Something Went Wrong...!",
                status: false,
                statusCode: 500,
            });
    }
};

const getAllQuestions = async (req, res) => {
    try {
        const { quizName } = req.query;
        const questionsData = await questionModel.findOne({ quizName });

        if (questionsData) {
            res
                .status(200)
                .json({
                    message: "Questions Found Sucessfully...!",
                    status: true,
                    statusCode: 200,
                    data: questionsData,
                });
        } else {
            res
                .status(400)
                .json({
                    message: "Something Went Wrong...!",
                    status: false,
                    statusCode: 400,
                });
        }
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Something Went Wrong...!",
                status: false,
                statusCode: 500,
            });
        console.log(error);
    }
};

module.exports = { getAllQuestions, addQuestion };
