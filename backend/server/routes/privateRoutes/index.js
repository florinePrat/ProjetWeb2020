const express = require('express');
const router = express.Router();

router.use('/room', require('./rooms'));
router.use('/booking', require('./bookings'));
router.post('/image-upload', require('./image-upload'));

module.exports = router;

