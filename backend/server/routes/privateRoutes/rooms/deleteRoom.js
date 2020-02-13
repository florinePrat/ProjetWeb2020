const Room = require('../../../models/room');
module.exports = (req, res, next) => {
    Room.findOne({_id: req.params.id})
        .then(() => {
            Room.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: 'Objet supprimé !'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}))
};
