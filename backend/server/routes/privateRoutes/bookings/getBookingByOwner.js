const Booking = require('../../../models/booking');
let recentDate = new Date();

module.exports = (req, res, next) => {
    Booking.find({$and : [{ownerId: req.params.id}, {state: "awaitingValidation"}, {date : {$gt: recentDate}}]})
        .then(bookings => res.status(200).json(bookings))
        .catch(error => res.status(400).json({error}));
};
