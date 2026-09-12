const express = require('express');
const router = express.Router();

const publicRouters = require('./public/index.js');
const authRouters = require('./auth/index.js');
const adminRouters = require('./admin/index.js');
const studentRouters = require('./student/index.js');
const sharedRouters = require('./shared/index.js');

router.use('/public', publicRouters);
router.use('/auth', authRouters);
router.use('/admin', adminRouters);
router.use('/student', studentRouters);
router.use('/shared', sharedRouters);

module.exports = router;