const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refreshToken', authController.refreshToken);

module.exports = router;
