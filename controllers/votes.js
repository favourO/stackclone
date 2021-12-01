const Answers = require('../models/Answer');
const Question = require('../models/Question');
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');


//
exports.voteQuestions = asyncHandler(async (req, res, next) => {
    req.body.question = req.params.questionId;

    req.body.user = req.user.id
    
    const question = await Question.findById(req.params.questionId);
    if(!question) {
        return next(new ErrorResponse(`No question with the id of ${req.params.questionId}`), 404);
    }
})