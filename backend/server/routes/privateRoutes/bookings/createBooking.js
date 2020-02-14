require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const bookingController = require('../../../controllers/bookingController');
const userController = require('../../../controllers/userController');

module.exports = async (req, res, next) => {

    try{
        const bookingObject = req.body;
        const booking = await bookingController.createBooking(bookingObject);
        const user = await userController.getUserById(booking.userId);
        const owner = await userController.getUserById(booking.ownerId);
        console.log('testgetmail', user.email);
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: user.email.toString(),
            from: 'louer-ma-salle@gmail.com',
            subject: 'Vous venez de réserver une salle',
            text: 'Félicitations',
            html: "<strong>Félicitations, vous venez de réserver une salle sur louer ma salle. vous pouvez dès maintenant contacter le propriétaire de la salle pour convenir avec lui des modalités de locations et de rendez-vous :) Voici son numéro : </strong>"
        };
        await sgMail.send(msg);
        console.log("envoi user réussi");

        return res.status(201).json({
            success: true,
            message: 'Objet enregistré !',
            bookingId: booking._id,
        });
    }catch{
        return res.status(500).json({
            error : "Impossible de créer cette reservation"
        }) ;
    }
};
