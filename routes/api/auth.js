const express = require("express");
const router = express.Router();

const authController = require('../../controllers/auth/authController');

router.post('/register', authController.register);

router.post('/login',);

module.exports = router;