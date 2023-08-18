const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth");
const {auth, upload} = require("../../middlewares");

router.post('/register', authController.register);

router.get("/verify/:verificationCode", authController.verifyEmail)

router.post("/verify", authController.resendVerifyEmail);

router.post('/login', authController.login);

router.get("/current", auth, authController.getCurrent);

router.post("/logout", auth, authController.logout);

router.patch("/subscription", auth, authController.updateSubscribe);

router.patch("/avatars", auth, upload.single("avatar"), authController.updateAvatar )

module.exports = router;