const Booking = require('../../../models/booking');
module.exports = (req, res, next) => {
    Booking.findOne({_id: req.params.id})
        .then(booking => res.status(200).json(booking))
        .catch(error => res.status(404).json({error}));
};
