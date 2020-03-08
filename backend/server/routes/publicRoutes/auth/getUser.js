const userController = require('../../../controllers/userController');

module.exports = async (req, res, next) => {
    try{
        const user = await userController.getUserById(req.params.id);
        if(!user) {
            //if data is empty we return 400 status
            return res.status(400).json({error: "Aucun utilisateur"});
        }else{
            return res.status(200).json({
                phoneNumber: user.phoneNumber,
                imageUrl : user.imageUrl,
                success: true,
                message: 'Connected !'
            });
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            error : "Impossible de récupérer les categories"
        }) ;
    }
};
