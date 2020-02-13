require('dotenv').config();
const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

module.exports = async (req, res, next) => {
    try{
        const jwt = require('jsonwebtoken');
        const userController = require('../../../controllers/userController');
        const {email, password} = req.body;
        if(!email) {
            //if data is empty we return 400 status
            return res.status(400).json({error : "Aucun email saisi"});
        }else if(!password){
            return res.status(400).json({error : "Aucun mot de passe saisi"});
        }else if(!email.toLowerCase().match(regEmail)){
            return res.status(400).json({error : "Format de l'email incorrect"});
        } else {
            const user = await userController.getUserByEmail(email.toLowerCase());
            if(user.password !== null){
                //comparing encrypted password of user
                const bcrypt = require('bcryptjs');
                const match = await  bcrypt.compare(password,user.password.toString());
                if(match){
                    //if password compare is true, we return token
                    const tokenUser = {
                        id: user._id,
                        email: user.email,
                        firstName: user.firstName
                    };
                    const token = jwt.sign(tokenUser, process.env.tokenkey, {expiresIn: '200000h'});
                    //return satuts OK with token
                    return  res.status(200).json({
                        success: true,
                        message: 'Connected !',
                        token: token,
                        firstName: user.firstName,
                        imageUrl: user.imageUrl,
                        userId: user._id,
                    });
                }
                else{
                    console.log('mot de passe incorrect');
                    return  res.status(401).json({
                        error: 'mot de passe incorrect'
                    });
                }
            }else {
                await userController.createPassword(user._id,password);
                const tokenUser = {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName
                };
                const token = jwt.sign(tokenUser, process.env.tokenkey, {expiresIn: '200000h'});
                //return satuts OK with token
                return  res.status(200).json({
                    success: true,
                    message: 'Connected !',
                    token: token,
                    firstName: user.firstName,
                    imageUrl: user.imageUrl,
                    userId: user._id,
                });
            }

        }
    } catch(error) {
        console.log(error)
        return  res.status(401).json({
            error: "Cet email n'est pas dans notre base de données, essayez de vous inscrire."
        });
    }
};
