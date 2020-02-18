const express = require('express');
const router = express.Router();

router.use('/room', require('./rooms'));
router.use('/booking', require('./bookings'));
router.use('/availability', require('./availabilities'));
router.post('/image-upload', require('./image-upload'));
router.use('/user', require('./users'));

module.exports = router;

