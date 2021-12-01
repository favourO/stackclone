const express = require('express');

const { answer } = require('../controllers/answers');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.post('/:questionId', protect, authorize('user'), answer);


module.exports = router;