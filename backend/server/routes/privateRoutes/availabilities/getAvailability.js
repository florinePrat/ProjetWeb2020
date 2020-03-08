const availabilityController = require('../../../controllers/availabilityController');

module.exports = async (req, res, next) => {
    try{
        const availability = await availabilityController.getAvailability(req.params.roomId);
        if(!availability){
            //if data is empty we return 400 status
            return res.status(400).json({error: "Aucune availability"});
        }else{
            return res.status(200).json({
                availability : availability
            });
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            error : "Impossible de récupérer cette reservation"
        }) ;
    }

};
