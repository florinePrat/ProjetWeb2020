const express = require('express');
const router = express.Router();

router.use('/room', require('./rooms'));
router.use('/booking', require('./bookings'));

module.exports = router;

