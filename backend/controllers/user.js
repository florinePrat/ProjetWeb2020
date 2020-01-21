const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

exports.signup = (req, res, next) => {
    if (!email){
        return res.status(400).json({error : "Aucun email saisi"});
    }else if (!email.toLowerCase().match(regEmail)){
        return res.status(400).json({error : "Format de l'email incorrect"});
    }else if (!firstName){
        return res.status(400).json({error : "Aucun prénom saisi"});
    }else if (!password){
        return res.status(400).json({error : "Aucun mot de passe saisi"});
    }
    console.log("je suis rentrée dans signup");
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                firstName: req.body.firstName,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({
                    firstName: user.firstName,
                    token: jwt.sign(
                        {userId: user._id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                    ),
                    message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    if(req.body.email === undefined) {
        //if data is empty we return 400 status
        return res.status(400).json({error : "Aucun email saisi"});
    }else if(req.body.password === undefined){
        return res.status(400).json({error : "Aucun mot de passe saisi"});
    }else if(!req.body.email.toLowerCase().match(regEmail)){
        return res.status(400).json({error : "Format de l'email incorrect"});
    } else {
        User.findOne({email: req.body.email.toLowerCase()})
            .then(user => {
                if (!user) {
                    return res.status(401).json({message: 'Utilisateur non trouvé !'})
                }
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({message: 'Mot de passe incorrect !'})
                        }
                        res.status(200).json({
                            userId: user._id,
                            firstName: user.firstName,
                            token: jwt.sign(
                                {userId: user._id},
                                'RANDOM_TOKEN_SECRET',
                                {expiresIn: '24h'}
                            )

                        });
                        console.log("utilisateur connceté ! ")
                    })
                    .catch(error => res.status(500).json({error}))
            })
            .catch(error => res.status(500).json({error}));
    }
};


