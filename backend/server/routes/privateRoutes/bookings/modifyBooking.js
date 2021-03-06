const bookingController = require('../../../controllers/bookingController');

module.exports = async (req, res, next) => {
    try{
        const bookingObject = req.file ?
            {
                ...JSON.parse(req.body.booking),
            } : {...req.body};
        console.log('bbbboookingg , ', req.body);
        const book = await bookingController.modifyBooking(bookingObject,req.params.id);
        if(!book){
            //if data is empty we return 400 status
            return res.status(400).json({error: "Aucune booking"});
        }else{
            console.log(book.state);
            return res.status(200).json(book);
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            error : "Impossible de modifier cette reservation"
        }) ;
    }
};
