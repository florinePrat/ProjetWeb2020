const Booking = require('../../../models/booking');
module.exports = (req, res, next) => {
    Booking.findOne({_id: req.params.id})
        .then(booking => {
            Booking.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: 'Objet supprimé !'}))
                .catch(error => res.status(400).json({error}));
            //})
        })
        .catch(error => res.status(500).json({error}))
};
