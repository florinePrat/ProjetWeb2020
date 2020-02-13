const Room = require('../../../models/room');
module.exports = (req, res, next) => {
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
