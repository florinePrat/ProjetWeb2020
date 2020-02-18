const availabilityController = require('../../../controllers/availabilityController');

module.exports = async (req, res, next) => {
    try{
        const availabilityObject = req.file ?
            {
                ...JSON.parse(req.body.availability),
            } : {...req.body};
        await availabilityController.modifyAvailability(availabilityObject,req.params.id);
        return res.status(200).json({
            message: 'Objet modifié !',
        });
    }catch{
        return res.status(500).json({
            error : "Impossible de modifier cette reservation"
        }) ;
    }
};
