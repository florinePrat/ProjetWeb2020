const roomController = require('../../../controllers/roomController');
module.exports = async (req, res, next) => {

    try{
        const room = await roomController.getAllSearchRooms(req.query.category, req.query.city);
        return res.status(200).json({
            room : room
        });
    }catch{
        return res.status(500).json({
            error : "Impossible de récupérer les salles recherché"
        }) ;
    }
};
