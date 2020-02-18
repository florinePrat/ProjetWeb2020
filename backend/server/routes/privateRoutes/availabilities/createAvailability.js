const availabilityController = require('../../../controllers/availabilityController');

module.exports = async (req, res, next) => {

    try{
        const availabilityObject = req.body;
        const availability = await availabilityController.createAvailability(availabilityObject);
        return res.status(201).json({
            message: 'Availability enregistré !',
            AvailabilityId: availability._id,
            dispo : availability.dispo,
            roomId : availability.roomId
        });
    }catch{
        return res.status(500).json({
            error : "Impossible de créer cette reservation"
        }) ;
    }
};
