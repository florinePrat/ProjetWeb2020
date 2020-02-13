const Room = require('../../../models/room');
module.exports = (req, res, next) => {
    Room.find({state:"published"})
        .then(rooms => res.status(200).json(rooms))
        .catch(error => res.status(400).json({error}));
};
