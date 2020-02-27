const roomController = require('../../../controllers/roomController');
module.exports = async (req, res, next) => {

    try{
        const room = await roomController.getRoomByUser(req.params.id);
        console.log('test :', room[0]._id);
        return res.status(200).json({
            room : room
        });
    }catch{
        return res.status(500).json({
            error : "Impossible de récupérer la salle de ce user"
        }) ;
    }
};
