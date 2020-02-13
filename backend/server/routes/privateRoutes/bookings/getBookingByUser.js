const Booking = require('../../../models/booking');
let recentDate = new Date();

module.exports = (req, res, next) => {
    Booking.find({$and : [{customerId: req.params.id}, {date : {$gt: recentDate}}]})
        .then(bookings => res.status(200).json(bookings))
        .catch(error => res.status(400).json({error}));
};
