const availabilityController = require('../../../controllers/availabilityController');

module.exports = async (req, res, next) => {

    try{
        const availabilityObject = req.body;
        const availability = await availabilityController.createAvailability(availabilityObject);
        console.log(availability);
        console.log(req.body);
        return res.status(201).json({
            message: 'Availability enregistré !',
            availabilityId: availability._id,
            openedWeekDays : availability.openedWeekDays,
            openedDates : availability.openedDates,
            roomId : availability.roomId
        });
    }catch{
        return res.status(500).json({
            error : "Impossible de créer cette reservation"
        }) ;
    }
};
