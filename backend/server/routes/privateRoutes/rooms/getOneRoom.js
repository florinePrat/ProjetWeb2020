const roomController = require('../../../controllers/roomController');
module.exports = async (req, res, next) => {

    try{
        const room = await roomController.getOneRoom(req.params.id);
        return res.status(200).json(room);
    }catch{
        return res.status(500).json({
            error : "Impossible de récupérer cette salle"
        }) ;
    }

};
