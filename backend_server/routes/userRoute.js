const express = require('express');
const router = express.Router();

// import route handlers
const {sendOTP, signup , login,changePassword} = require('../controllers/Auth.js');
const {resetPassword,resetPasswordToken} = require('../controllers/resetPassword.js');
const { auth } = require('../middlewares/auth.js');

// map with the handler
router.post("/verify-otp",sendOTP);
router.post("/signup",signup);
router.post("/login",login);

router.put("/changepassword",auth, changePassword);

router.post("/reset-password-token",resetPasswordToken);
router.post("/reset-password",resetPassword);

module.exports = router;