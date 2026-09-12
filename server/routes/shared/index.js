const express = require('express');
const router = express.Router();

const { verifyToken, requireRole } = require('../../middlewares/auth-middleware.js');
const reRegistrationRouter = require('./reregistration.js');

router.use(verifyToken, requireRole('admin', 'student'));
router.use('/re-registrations', reRegistrationRouter);

module.exports = router;