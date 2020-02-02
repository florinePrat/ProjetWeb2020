const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bookingCtrl = require('../controllers/booking');

router.post('/', auth, bookingCtrl.createBooking);
router.put('/:id', auth, bookingCtrl.modifyBooking);
router.delete('/:id', auth, bookingCtrl.deleteBooking);
router.get('/:id', auth, bookingCtrl.getOneBooking);
router.get('/byUser/:id', auth, bookingCtrl.getBookingByUser);
router.get('/byOwner/:id', auth, bookingCtrl.getBookingByOwner);

module.exports = router;
