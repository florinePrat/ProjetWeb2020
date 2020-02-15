const userController = require('../../../controllers/userController');
module.exports = async (req, res, next) => {

    try{
        const userObject = req.file ?
            {
                ...JSON.parse(req.body.user),
            } : {...req.body};
        await userController.changeAvatar(userObject,req.params.id);
        console.log('image url update : ',req.body);
        return res.status(200).json({
            message: 'User modifié !',
        });
    }catch{
        return res.status(500).json({
            error : "Impossible de modifier ce user"
        }) ;
    }
};
