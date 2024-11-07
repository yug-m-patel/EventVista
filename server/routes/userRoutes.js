const express = require('express');
const eventController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', eventController.createUser);
router.post('/login',eventController.loginUser);

module.exports = router;