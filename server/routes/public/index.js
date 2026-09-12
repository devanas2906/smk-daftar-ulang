const express = require('express');
const router = express.Router();

const schoolRouter = require('./school.js');
const masterRouter = require('./master.js');

router.use('/schools', schoolRouter);
router.use('/master', masterRouter);

module.exports = router;