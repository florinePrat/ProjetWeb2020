const Booking = require('../../../models/booking');

module.exports = (req, res, next) => {
    if (req.body.ownerId === req.body.userId) {
        return res.status(400).json({error: "Impossible de réserver sa propre salle..."});
    }else{
        const bookingObject = req.body;
        const booking = new Booking({
            ...bookingObject,
        });
        booking.save()
            .then(() => res.status(201).json({
                message: 'Objet enregistré !',
                success: true,
                bookingId: booking._id,

            }))
            .catch(error => res.status(400).json({error}));
    }
};
