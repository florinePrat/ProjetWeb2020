const Room = require('../../../models/room');
module.exports = (req, res, next) => {
    Room.findOne({_id: req.params.id})
        .then(room => res.status(200).json(room))
        .catch(error => res.status(404).json({error}));
};
