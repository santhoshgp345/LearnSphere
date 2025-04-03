const express = require('express');
const router = express.Router();

// import route handlers
const {auth,isStudent} = require('../middlewares/auth.js');
const {capturePayment, verifySignature,sendPaymentSuccessEmail} = require('../controllers/paymentHandler.js')

// map with the handler
router.post("/capture-payment",auth,isStudent,capturePayment);
router.post("/verify-signature",verifySignature);
router.post("/sendPaymentSuccessEmail", /*auth, isStudent, */ sendPaymentSuccessEmail);


module.exports = router;