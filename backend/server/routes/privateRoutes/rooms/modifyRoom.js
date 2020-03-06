const roomController = require('../../../controllers/roomController');
module.exports = async (req, res, next) => {

    try{
        const roomObject = req.file ?
            {
                ...JSON.parse(req.body.room),
            } : {...req.body};
        const room =await roomController.modifyRoom(roomObject,req.params.id);
        return res.status(200).json(room);
    }catch{
        return res.status(500).json({
            error : "Impossible de modifier cette salle"
        }) ;
    }
};
