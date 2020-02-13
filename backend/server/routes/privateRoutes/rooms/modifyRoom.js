const Room = require('../../../models/room');
module.exports = (req, res, next) => {
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
