const bookingController = require('../../../controllers/bookingController');

module.exports = async (req, res, next) => {
    try{
        const booking = await bookingController.getOneBooking(req.params.id);
        if(!booking){
            //if data is empty we return 400 status
            return res.status(400).json({error: "Aucune booking"});
        }else{
            return res.status(200).json({
                booking : booking
            });
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            error : "Impossible de récupérer cette reservation"
        }) ;
    }

};
