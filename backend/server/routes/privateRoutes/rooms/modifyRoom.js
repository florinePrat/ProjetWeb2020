const roomController = require('../../../controllers/roomController');
module.exports = async (req, res, next) => {

    try{
        const roomObject = req.file ?
            {
                ...JSON.parse(req.body.room),
            } : {...req.body};
        const room =await roomController.modifyRoom(roomObject,req.params.id);
        if(!room) {
            //if data is empty we return 400 status
            return res.status(400).json({error: "Aucune salle"});
        }else{
            return res.status(200).json(room);
        }

    }catch(e){
        console.log(e);
        return res.status(500).json({
            error : "Impossible de modifier cette salle"
        }) ;
    }
};
