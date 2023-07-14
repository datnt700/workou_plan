const express = require('express');
const router = express.Router();
const answerController = require('../app/controllers/AnswerController');
const { authenToken } = require('../middlewares/auth.middlewares');

router.get('/', answerController.index);

module.exports = router;
