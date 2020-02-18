const availabilityController = require('../../../controllers/availabilityController');
module.exports = async (req, res, next) => {

    try{
        const availability = await availabilityController.getAvailability(req.params.roomId);
        return res.status(200).json({
            availability : availability
        });
    }catch{
        return res.status(500).json({
            error : "Impossible de récupérer cette reservation"
        }) ;
    }

};
