const availabilityController = require('../../../controllers/availabilityController');

module.exports = async (req, res, next) => {
    try{
        await availabilityController.deleteAvailability(req.params.id);
        return res.status(200).json({
            message: 'Objet supprimé !'
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            error : "Impossible de supprimer les categories"
        }) ;
    }
};
