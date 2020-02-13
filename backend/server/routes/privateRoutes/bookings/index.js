const express = require('express');
const router = express.Router();


router.post('/',  require('./createBooking'));
router.put('/:id',  require('./modifyBooking'));
router.delete('/:id',  require('./deleteBooking'));
router.get('/:id',  require('./getOneBooking'));
router.get('/byUser/:id', require('./getBookingByUser'));
router.get('/byOwner/:id',  require('./getBookingByOwner'));

module.exports = router;
