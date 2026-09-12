const express = require('express');
const router = express.Router();

const { verifyToken, requireRole, requirePasswordChange } = require('../../middlewares/auth-middleware.js');

const accountRouter = require('./account.js');
const reRegistrationRouter = require('./reregistration.js');
const notificationRouter = require('./notification.js');
const settingsRouter = require('./settings.js');

router.use(verifyToken, requireRole('student'), requirePasswordChange);

router.use('/account', accountRouter);
router.use('/re-registrations', reRegistrationRouter);
router.use('/notifications', notificationRouter);
router.use('/settings', settingsRouter);

module.exports = router;
