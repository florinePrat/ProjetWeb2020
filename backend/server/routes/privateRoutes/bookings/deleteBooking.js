const bookingController = require('../../../controllers/bookingController');

module.exports = async (req, res, next) => {
    try{
        await bookingController.deleteBooking(req.params.id);
        return res.status(200).json({
            message: 'Objet supprimé !'
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            error : "Impossible de supprimer les categories"
        }) ;
    }
};
