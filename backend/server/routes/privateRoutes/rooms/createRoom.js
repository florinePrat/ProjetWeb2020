require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const roomController = require('../../../controllers/roomController');
const userController = require('../../../controllers/userController');
module.exports = async (req, res, next) => {

    try{
        const roomObject = req.body;
        const room = await roomController.createRoom(roomObject);
        const user = await userController.getUserById(room.userId);
        if (!room){
            //if data is empty we return 400 status
            return res.status(400).json({error: "Aucune room"});
        }else if(!user){
            //if data is empty we return 400 status
            return res.status(400).json({error: "Aucun user"});
        }else{
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: user.email.toString(),
                from: 'louer-ma-salle@gmail.com',
                subject: 'Vous avez bien créer votre salle',
                text: 'Félicitations',
                html: "<strong>Félicitations, vous venez de créer une salle sur louer ma salle. Il ne vous reste plus qu'à lui ajouter des disponiblités et des photos pour la publier ;) </strong>",
            };
            await sgMail.send(msg);
            console.log("envoi réussi");
            return res.status(201).json(
                room
            );
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            error : "Impossible de créer cette salle"
        }) ;
    }
};
