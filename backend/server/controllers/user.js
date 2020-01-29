const User = require('../models/user');
const jwt = require('jsonwebtoken');
const userController = require('./userController');
const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

exports.signup = async (req, res, next) => {
    try {
        console.log("signup : req.body : ",req.body);
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
        console.log('userExist : ',userExist);
        if (userExist){
            return res.status(400).json({error : "Cet email est déjà utilisé"});
        }
        else {
            //creation of user in database
            const user = await userController.createUser(email.toLowerCase(), firstName, phoneNumber);
            //if success token creation of 1day
            const tokenUser = {
                id: user._id,
                email: user.email,
                firstName: user.firstName
            };
            const token = jwt.sign(tokenUser, 'RANDOM_TOKEN_SECRET', {expiresIn: '24h'});
            return res.status(200).json({
                success: true,
                message: 'Connected !',
                token: token,
                firstName: user.firstName,
                imageUrl: user.imageUrl,
                userId: user._id
            });
        }
        }catch (error) {

            return res.status(500).json({
                error : "Impossible de créer l'utilisateur"
            }) ;
        }

};

exports.login = async (req, res, next) => {
    try{
        if(req.body.email === undefined) {
            //if data is empty we return 400 status
            return res.status(400).json({error : "Aucun email saisi"});
        }else if(req.body.password === undefined){
            return res.status(400).json({error : "Aucun mot de passe saisi"});
        }else if(!req.body.email.toLowerCase().match(regEmail)){
            return res.status(400).json({error : "Format de l'email incorrect"});
        } else {
            const email = req.body.email.toLowerCase();
            const password = req.body.password;
            const user = await userController.getUserByEmail(email);
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
                const token = jwt.sign(tokenUser, 'RANDOM_TOKEN_SECRET', {expiresIn: '24h'});
                //return satuts OK with token
                return  res.status(200).json({
                    success: true,
                    message: 'Connected !',
                    token: token,
                    firstName: user.firstName,
                    imageUrl: user.imageUrl,
                    userId: user._id
                });
            }
            else{
                console.log('mot de passe incorrect');
                return  res.status(401).json({
                    error: 'mot de passe incorrect'
                });
            }
        }
    } catch(error) {
        return  res.status(401).json({
            error: "Cet email n'est pas dans notre base de données, essayez de vous inscrire."
        });
    }
};


exports.addPicture = async (req, res, next) => {
    console.log(req.file);
    const userObject = req.file ?
        {
            ...JSON.parse(req.body.user),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {... req.body};

    User.updateOne({_id: req.params.id}, { ...userObject, _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Image ajouté !'}))
        .catch(error => res.status(400).json({ error }));
};


