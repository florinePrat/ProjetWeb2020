const bookingController = require('../../../controllers/bookingController');

module.exports = async (req, res, next) => {

    try{
        const booking = await bookingController.getBookingByRoom(req.params.id);
        console.log('booooking: ', booking[0].date[0].start);
        return res.status(200).json({
            booking : booking
        });
    }catch{
        return res.status(500).json({
            error : "Impossible de récupérer la reservation de ce user"
        }) ;
    }
};
