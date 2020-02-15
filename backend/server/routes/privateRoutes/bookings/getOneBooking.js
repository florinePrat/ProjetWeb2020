const bookingController = require('../../../controllers/bookingController');
module.exports = async (req, res, next) => {

    try{
        const booking = await bookingController.getOneBooking(req.params.id);
        return res.status(200).json({
            booking : booking
        });
    }catch{
        return res.status(500).json({
            error : "Impossible de récupérer cette reservation"
        }) ;
    }

};
