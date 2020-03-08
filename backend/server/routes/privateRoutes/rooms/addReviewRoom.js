const roomController = require('../../../controllers/roomController');
const bookingController = require('../../../controllers/bookingController');
module.exports = async (req, res, next) => {

    try{
        const roomObject = req.file ?
            {
                ...JSON.parse(req.body.room),
            } : {...req.body};
        const room = await roomController.addReview(roomObject.reviews,req.params.id);
        if(!room){
            //if data is empty we return 400 status
            console.log("error");
            return res.status(400).json({error: "Aucune room"});

        }else{
            console.log(room);
            await bookingController.modifyBooking({state:'archived'},roomObject._id);
            return res.status(200).json(room);
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            error : "Impossible de modifier cette salle"
        }) ;
    }
};
