const Question = require('../models/Question');
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    create a single question
// @route   /api/questions
// @access  Private
exports.askQuestion = asyncHandler(async (req, res, next) => {
    // Add user to request.body
    req.body.user = req.user.id

    const question = await Question.create(req.body);

    res.status(201).json({
        status: 'success',
        count: question.length,
        data: question
    })
    
})


// @desc    get all questions
// @route   /api/questions
// @access  Public
exports.getQuestions = asyncHandler(async (req, res, next) => {
    // Get question is access through a route that uses the advance result
    res
    .status(200)
    .json(res.advancedResults);   
})