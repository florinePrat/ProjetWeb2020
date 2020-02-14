const roomController = require('../../../controllers/roomController');
module.exports = async (req, res, next) => {

    try{
        const room = await roomController.getAllRooms();
        return res.status(200).json({
            success: true,
            room : room
        });
    }catch{
        return res.status(500).json({
            error : "Impossible de récupérer les salles"
        }) ;
    }
};
