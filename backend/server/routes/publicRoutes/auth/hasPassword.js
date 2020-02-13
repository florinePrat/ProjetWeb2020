const userController = require('../../../controllers/userController');
module.exports = async (req, res, next) => {
    try{
        const email = req.body;
        if(!email) {
            //if data is empty we return 400 status
            return res.status(400).json({error : "Aucun email saisi"});
        }else if(!email.toLowerCase().match(regEmail)){
            return res.status(400).json({error : "Format de l'email incorrect"});
        } else {
            const email = email.toLowerCase();
            const user = await userController.getUserByEmail(email);

            return  res.status(200).json(
                user.password !== null
            );
        }

    } catch(error) {
        return  res.status(401).json({
            error: "Cet email n'est pas dans notre base de données, essayez de vous inscrire."
        });
    }
};
