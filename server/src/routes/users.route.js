const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/UsersController');
const { authenToken } = require('../middlewares/auth.middlewares');

router.put('/update/:id', usersController.update);
router.delete('/delete/:id', usersController.delete);
router.get('/', usersController.index);

module.exports = router;
