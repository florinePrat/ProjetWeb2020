require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

module.exports = async (req, res, next) => {
    try {
        const jwt = require('jsonwebtoken');
        const userController = require('../../../controllers/userController');
        const { email, firstName, phoneNumber} = req.body;
        if (!email){
            return res.status(400).json({error : "Aucun email saisi"});
        }else if (!email.toLowerCase().match(regEmail)){
            return res.status(400).json({error : "Format de l'email incorrect"});
        }else if (!firstName){
            return res.status(400).json({error : "Aucun prénom saisi"});
        }else if (!phoneNumber){
            return res.status(400).json({error : "Aucun numéro de téléphone saisi"});
        }
        const userExist = await userController.getUserByEmail(email);
        if (userExist){
            return res.status(400).json({error : "Cet email est déjà utilisé"});
        }
        else {
            //creation of user in database
            const user = await userController.createUser(email.toLowerCase(), firstName, phoneNumber);
            console.log('mon user' , user);
            //if success token creation of 1day
            const tokenUser = {
                id: user._id,
                email: user.email,
                firstName: user.firstName
            };
            console.log('mon token user' , tokenUser);
            const token = jwt.sign(tokenUser, process.env.tokenkey, {expiresIn: '200000h'});
            console.log('mon token' , token);
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: user.email.toString(),
                from: 'louer-ma-salle@gmail.com',
                subject: 'Vous êtes bien inscrit',
                text: 'Félicitations',
                html: "<strong>Félicitations, vous venez de vous inscrire sur louer ma salle. </strong>",
            };

            await sgMail.send(msg);
            console.log("envoi réussi");
            return res.status(200).json({
                success: true,
                message: 'Connected !',
                token: token,
                firstName: user.firstName,
                imageUrl: user.imageUrl,
                userId: user._id,
            });
        }
    }catch (error) {

        return res.status(500).json({
            error : "Impossible de créer l'utilisateur"
        }) ;
    }

};
