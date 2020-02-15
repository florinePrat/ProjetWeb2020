const bookingController = require('../../../controllers/bookingController');

module.exports = async (req, res, next) => {
    try{
        const bookingObject = req.file ?
            {
                ...JSON.parse(req.body.booking),
            } : {...req.body};
        await bookingController.modifyBooking(bookingObject,req.params.id);
        return res.status(200).json({
            message: 'Objet modifié !',
        });
    }catch{
        return res.status(500).json({
            error : "Impossible de modifier cette reservation"
        }) ;
    }
};
