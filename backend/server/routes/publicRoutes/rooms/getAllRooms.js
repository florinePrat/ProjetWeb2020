const roomController = require('../../../controllers/roomController');
module.exports = async (req, res, next) => {

    try{
        const room = await roomController.getAllRooms();
        if(!room) {
            //if data is empty we return 400 status
            return res.status(400).json({error: "Aucune salle"});
        }else {
            return res.status(200).json({
                room: room
            });
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            error : "Impossible de récupérer les salles"
        }) ;
    }
};
