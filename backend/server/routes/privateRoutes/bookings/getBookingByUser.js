const bookingController = require('../../../controllers/bookingController');

module.exports = async (req, res, next) => {

    try{
        const booking = await bookingController.getBookingByUser(req.params.id);
        console.log('bbbbbbbbb: ', booking);
        return res.status(200).json({
            booking : booking
        });
    }catch (error){
        console.log(error);
        return res.status(500).json({
            error : "Impossible de récupérer la reservation de ce user"
        }) ;
    }
};
