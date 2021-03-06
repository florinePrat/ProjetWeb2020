const bookingController = require('../../../controllers/bookingController');

module.exports = async (req, res, next) => {
    try{
        const booking = await bookingController.getBookingByUser(req.params.id);
        if(!booking){
            //if data is empty we return 400 status
            return res.status(400).json({error: "Aucune booking"});
        }else{
            console.log('bbbbbbbbb: ', booking);
            return res.status(200).json({
                booking : booking
            });
        }
    }catch (error){
        console.log(error);
        return res.status(500).json({
            error : "Impossible de récupérer la reservation de ce user"
        }) ;
    }
};
