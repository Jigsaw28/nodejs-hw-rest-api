const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth");
const {auth} = require("../../middlewares");

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get("/current", auth, authController.getCurrent);

router.post("/logout", auth, authController.logout);

router.patch("/subscription", auth, authController.updateSubscribe)

module.exports = router;