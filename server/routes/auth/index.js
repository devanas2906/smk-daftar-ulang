const express = require('express');
const router = express.Router();

const registerOtpRouter = require('./register-otp.js');
const registerRouter = require('./register.js');
const loginRouter = require('./login.js');
const forgotPasswordRouter = require('./forgot-password.js');
const changePasswordRouter = require('./change-password.js');
const checkStatusRouter = require('./check-status.js');

router.use('/register', registerOtpRouter);
router.use('/register', registerRouter);
router.use('/', loginRouter);
router.use('/forgot-password', forgotPasswordRouter);
router.use('/', changePasswordRouter);
router.use('/', checkStatusRouter);

module.exports = router;
