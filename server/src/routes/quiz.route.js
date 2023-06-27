const express = require('express');
const router = express.Router();
const quizController = require('../app/controllers/QuizController');
const { authenToken } = require('../middlewares/auth.middlewares');

// router.put('/update/:id', quizController.update);
// router.delete('/delete/:id', quizController.delete);
router.post('/store_option', quizController.store_option);
router.get('/', quizController.index);

module.exports = router;
