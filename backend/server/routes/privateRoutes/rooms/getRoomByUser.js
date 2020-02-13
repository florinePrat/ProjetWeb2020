const Room = require('../../../models/room');
module.exports = (req, res, next) => {
    console.log('je suis passé par ici');
    Room.find({userId: req.params.id})
        .then(rooms => {console.log('rooms', rooms),res.status(200).json(rooms)})
        .catch(error => res.status(400).json({error}));
};
