const express = require('express');
const Question = require('../models/Question');
const advancedResults = require('../middleware/advancedResults');

const { askQuestion, getQuestions } = require('../controllers/questions');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, authorize('user'), askQuestion);
router
    .route('/')
    .get(advancedResults(Question, 'answers'), getQuestions);

module.exports = router;