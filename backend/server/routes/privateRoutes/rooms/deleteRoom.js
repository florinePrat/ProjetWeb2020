const roomController = require('../../../controllers/roomController');
module.exports = async (req, res, next) => {

    try{
        await roomController.deleteRoom(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Objet supprimé !'
        });
    }catch{
        return res.status(500).json({
            error : "Impossible de supprimer cette salle"
        }) ;
    }
};
