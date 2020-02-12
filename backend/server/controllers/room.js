const Room = require('../models/room');
const fs = require('fs');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');

exports.createRoom = (req, res, next) => {
    const roomObject = req.body;
    const room = new Room({
        ...roomObject,
    });
    room.save()
        .then(() => res.status(201).json({
            message: 'Objet enregistré !',
            success: true,
            roomId: room._id,

        }))
        .catch(error => res.status(400).json({error}));
};

exports.modifyRoom = (req, res, next) => {
    const roomObject = req.file ?
        {
            ...JSON.parse(req.body.room),
        } : {...req.body};
    Room.updateOne({_id: req.params.id}, {...roomObject, _id: req.params.id})
        .then(() => res.status(200).json({
            message: 'Objet modifié !',
            success: true,
        }))
        .catch(error => res.status(400).json({error}));
};

exports.deleteRoom = (req, res, next) => {
    Room.findOne({_id: req.params.id})
        .then(() => {
            Room.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: 'Objet supprimé !'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}))
};

exports.getOneRoom = (req, res, next) => {
    Room.findOne({_id: req.params.id})
        .then(room => res.status(200).json(room))
        .catch(error => res.status(404).json({error}));
};

exports.getAllRooms = (req, res, next) => {
    Room.find({state:"published"})
        .then(rooms => res.status(200).json(rooms))
        .catch(error => res.status(400).json({error}));
};

exports.getAllSearchRooms = (req, res, next) => {
    if (req.params.category !== 'null' && req.params.city !== 'null') {
        Room.find(
            {$and :
                    [
                        {$and: [ { category : req.params.category }, { city : req.params.city  } ] },
                        { state : "published" }
                    ]
            })
            .then(rooms => res.status(200).json(rooms))
            .catch(error => res.status(400).json({error}));
    } else {
        Room.find(
            {
                $and:
                    [
                        {$or: [{category: req.params.category}, {city: req.params.city}]},
                        {state: "published"}
                    ]
            })
            .then(rooms => {console.log(rooms), res.status(200).json(rooms)})
            .catch(error => res.status(400).json({error}));
    }};

exports.getRoomByUser = (req, res, next) => {
    Room.find({userId: req.params.id})
        .then(rooms => res.status(200).json(rooms))
        .catch(error => res.status(400).json({error}));
};


