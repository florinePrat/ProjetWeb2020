const availabilityController = require('../../../controllers/availabilityController');

module.exports = async (req, res, next) => {
    try{
        const availabilityObject = req.body;
        console.log('availability object : ', availabilityObject);
        const availability = await availabilityController.createAvailability(availabilityObject);
        if(!availability){
            //if data is empty we return 400 status
            return res.status(400).json({error: "Aucune availability"});
        }else{
            console.log(availability);
            console.log(req.body);
            return res.status(201).json({
                message: 'Availability enregistré !',
                availabilityId: availability._id,
                openedWeekDays : availability.openedWeekDays,
                openedDates : availability.openedDates,
                roomId : availability.roomId
            });
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            error : "Impossible de créer cette reservation"
        }) ;
    }
};
