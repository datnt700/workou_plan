const express = require('express');
const router = express.Router();
const programController = require('../app/controllers/ProgramController');
const { authenToken } = require('../middlewares/auth.middlewares');

router.get('/', programController.index);

module.exports = router;
