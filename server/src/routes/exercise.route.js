const express = require('express');
const router = express.Router();
const ExerciseController = require('../app/controllers/ExerciseController');

router.post('/create', ExerciseController.create);
router.get('/', ExerciseController.index);

module.exports = router;
