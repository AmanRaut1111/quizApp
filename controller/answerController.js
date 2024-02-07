const { default: mongoose, Mongoose } = require("mongoose");
const answerschema = require("../models/answerschema");
const answerModel = require("../models/answerschema");

const submitAnswer = async (req, res) => {
    try {
        const { userId, quizName, givenAnswer, questionId } = req.body;

        const answerData = await answerModel({
            userId: userId,
            quizName: quizName,
            givenAnswer: givenAnswer,
            questionId: questionId,
        });

        const data = await answerData.save();
        if (data) {
            res
                .status(200)
                .json({
                    message: "Answer submitted sucessfully...!",
                    status: true,
                    statusCode: 200,
                    data: data,
                });
        } else {
            res
                .status(400)
                .json({
                    message: "Something Went wrong..!",
                    status: false,
                    statusCode: 400,
                });
        }
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({
                message: "Something Went Wrong..! ",
                status: false,
                statusCode: 500,
            });
    }
};

const getUserQuiz = async (req, res) => {
    try {
        const { userId, quizName } = req.query;
        const data = await answerschema.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    quizName: quizName,
                },
            },
            {
                $lookup: {
                    from: "questions",
                    localField: "questionId",
                    foreignField: "_id",
                    as: "quizData",
                },
            },
            {
                $unwind: {
                    path: "$quizData",
                },
            },
            {
                $project: {
                    givenAnswer: 1,
                    quizData: 1,
                    score: {
                        $cond: {
                            if: {
                                $eq: ["$givenAnswer", "$quizData.correctAnswer"],
                            },
                            then: 1,
                            else: 0,
                        },
                    },
                },
            },
        ]);

        if (data) {
            res
                .status(200)
                .json({
                    message: "Quiz Data found Sucessfully...!",
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

const getQuizScore = async (req, res) => {
    try {
        const { quizName, userId } = req.query;
        const scoreData = await answerschema.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    quizName: quizName,
                },
            },
            {
                $lookup: {
                    from: "questions",
                    localField: "questionId",
                    foreignField: "_id",
                    as: "quizData",
                },
            },
            {
                $unwind: {
                    path: "$quizData",
                },
            },
            {
                $project: {
                    givenAnswer: 1,
                    quizData: 1,
                    score: {
                        $cond: {
                            if: {
                                $eq: ["$givenAnswer", "$quizData.correctAnswer"],
                            },
                            then: 1,
                            else: 0,
                        },
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalScore: {
                        $sum: "$score",
                    },
                },
            },
        ]);
        if (scoreData) {
            res
                .status(200)
                .json({
                    message: "data found Sucessfully...!",
                    status: true,
                    statusCode: 200,
                    data: scoreData,
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
        return res
            .status(500)
            .json({
                message: "Something Went Wrong...!",
                status: false,
                statusCode: 500,
            });
    }
};

module.exports = { submitAnswer, getUserQuiz, getQuizScore };
