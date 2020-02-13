const Booking = require('../../../models/booking');

module.exports = (req, res, next) => {
    const bookingObject = req.file ?
        {
            ...JSON.parse(req.body.booking),
        } : {...req.body};
    Booking.updateOne({_id: req.params.id}, {...bookingObject, _id: req.params.id})
        .then(() => res.status(200).json({
            message: 'Objet modifié !',
            success: true,
        }))
        .catch(error => res.status(400).json({error}));
};
