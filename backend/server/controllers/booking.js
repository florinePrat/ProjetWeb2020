
const Booking = require('../models/booking');

exports.createBooking = (req, res, next) => {
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

exports.modifyBooking = (req, res, next) => {
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

exports.deleteBooking = (req, res, next) => {
    Booking.findOne({_id: req.params.id})
        .then(booking => {
            Booking.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: 'Objet supprimé !'}))
                .catch(error => res.status(400).json({error}));
            //})
        })
        .catch(error => res.status(500).json({error}))
};

exports.getOneBooking = (req, res, next) => {
    Booking.findOne({_id: req.params.id})
        .then(booking => res.status(200).json(booking))
        .catch(error => res.status(404).json({error}));
};

let recentDate = new Date();

exports.getBookingByUser = (req, res, next) => {
    Booking.find({$and : [{customerId: req.params.id}, {date : {$gt: recentDate}}]})
        .then(bookings => res.status(200).json(bookings))
        .catch(error => res.status(400).json({error}));
};

exports.getBookingByOwner = (req, res, next) => {
    Booking.find({$and : [{ownerId: req.params.id}, {state: "awaitingValidation"}, {date : {$gt: recentDate}}]})
        .then(bookings => res.status(200).json(bookings))
        .catch(error => res.status(400).json({error}));
};

