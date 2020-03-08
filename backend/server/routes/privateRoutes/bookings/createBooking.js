require('dotenv').config();
//const sgMail = require('@sendgrid/mail');
const bookingController = require('../../../controllers/bookingController');
//const userController = require('../../../controllers/userController');

module.exports = async (req, res, next) => {

    try{
        const bookingObject = req.body;
        const booking = await bookingController.createBooking(bookingObject);
        if(!booking){
            //if data is empty we return 400 status
            return res.status(400).json({error: "Aucune booking"});
        }else{
            //const user = await userController.getUserById(booking.userId);
            //const owner = await userController.getUserById(booking.ownerId);
            //console.log('testgetmail', booking);
            /*sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: user.email.toString(),
                from: 'louer-ma-salle@gmail.com',
                subject: 'Vous venez de réserver une salle',
                text: 'Félicitations',
                html: "<strong>Félicitations, vous venez de réserver une salle sur louer ma salle. vous pouvez dès maintenant contacter le propriétaire de la salle pour convenir avec lui des modalités de locations et de rendez-vous :) Voici son numéro : </strong>"
            };
            await sgMail.send(msg);
            console.log("envoi user réussi");

            console.log('testgetmailowner', owner.email);
            const msgOwner = {
                to: owner.email.toString(),
                from: 'louer-ma-salle@gmail.com',
                subject: 'Votre salle viens d être réservé' ,
                text: 'Félicitations',
                html: "<strong>Félicitations, Votre salle viens d être réservé le locataire devrait vous contacter sous peux.</strong>"
            };
            await sgMail.send(msgOwner);
            console.log("envoi owner réussi");*/

            return res.status(201).json({
                booking
            });
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            error : "Impossible de créer cette reservation"
        }) ;
    }
};
