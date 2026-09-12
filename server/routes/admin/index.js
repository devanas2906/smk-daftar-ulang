const express = require('express');
const router = express.Router();

const { verifyToken, requireRole } = require('../../middlewares/auth-middleware.js');

const accountRouter = require('./account.js');
const studentRouter = require('./student.js');
const reRegistrationRouter = require('./reregistration.js');
const deleteRequestRouter = require('./delete-request.js');
const masterRouter = require('./master.js');
const settingsRouter = require('./settings.js');
const schoolSettingsRouter = require('./school-settings.js');

router.use(verifyToken, requireRole('admin'));

router.use('/account', accountRouter);
router.use('/students', studentRouter);
router.use('/re-registrations', reRegistrationRouter);
router.use('/delete-requests', deleteRequestRouter);
router.use('/master', masterRouter);
router.use('/settings', settingsRouter);
router.use('/schools', schoolSettingsRouter);

module.exports = router;