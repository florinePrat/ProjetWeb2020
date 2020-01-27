const Room = require('../models/room');
const fs = require('fs');

exports.createRoom = (req, res, next) => {
    const roomObject = JSON.parse(req.body.room);
    delete roomObject._id;
    const room = new Room({
        ...roomObject,
        //imageUrl:  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    room.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyRoom = (req, res, next) => {
    const roomObject = req.file ?
        {
            ...JSON.parse(req.body.room),
            imageUrl:  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...req.body};
    Room.updateOne({ _id: req.params.id }, { ...roomObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteRoom =  (req, res, next) => {
    Room.findOne({_id: req.params.id})
        .then(room =>{
            const filename = room.imageUrl.split('/images/')[1];
            fs.unlink( `images/${filename}`, () =>{
                Room.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }))
};

exports.getOneRoom = (req, res, next) => {
    Room.findOne({ _id: req.params.id })
        .then(room => res.status(200).json(room))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllRooms = (req, res, next) => {
    Room.find()
        .then(rooms => res.status(200).json(rooms))
        .catch(error => res.status(400).json({ error }));
};

