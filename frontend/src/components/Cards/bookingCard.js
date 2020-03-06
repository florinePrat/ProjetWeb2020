import {Component, useEffect} from "react";
import React from "react";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import Card from "react-bootstrap/Card";
import api from "../../utils/booking";
import apiRoom from "../../utils/room";
import auth from "../../utils/auth";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import {Button} from "reactstrap";


// this class send a answer to back for verify the answer and done the card of the day
function BookingCard({ _id, date, roomId, ownerId, customerId, state, onDeleted}) {
    const [edit, setEdit] = React.useState(false);
    const [userId] = React.useState(localStorage.getItem("userId"));
    const [error, setError] = React.useState(false);
    const [rooms, setRooms] = React.useState([]);
    const [user, setUser] = React.useState([]);
    const [availability, setAvailability] = React.useState([]);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [myState, setMyState] = React.useState([state]);


    useEffect(()=> {
        if (myState === "accepted") {

            auth.getUser(userId)
                .then(res => {
                    const user = res.data;
                    setUser(user);
                    console.log('my user :', user);
                    setPhoneNumber(user.phoneNumber);
                    console.log('phoneNumber : ',phoneNumber);
                }, function (data) {
                    console.log('je suis dans data erreur', data);
                });

        }
    },[]);

    const deleteBooking = event => {
        if (myState !== "refused") {
            apiRoom.getOneRoom(roomId)
                .then(res => {
                        const room = res.data.room;
                        setAvailability(room.availability);
                        console.log('availability', availability);

                        apiRoom.updateRoomAvailabilities(availability.concat([date]), roomId)
                            .then(res => {
                                console.log('date a ajoter : ', date);
                                console.log('new availability', availability.concat([date]));

                                api.deleteBooking(_id)
                                    .then(res => {
                                        onDeleted();
                                        console.log('objet supprimer !')
                                    })
                            });

                    }
                    , function (data) {
                        console.log('je suis dans data erreur', data);
                    });
        }

    };

        return (

                <Card style={{width: '18rem'}} >
                    <CardBody>
                        <CardTitle>Etat : {myState}</CardTitle>
                        <CardSubtitle>Date : {date.start} </CardSubtitle>
                        <br/>
                        {myState === "accepted"
                            ? <CardTitle>Contact propriétaire de la salle : 0{phoneNumber} </CardTitle>
                            : null
                        }
                        <Button
                            type="button"
                            onClick={deleteBooking}
                        >
                            Annuler réservation
                        </Button>
                    </CardBody>
                </Card>
        )

}

export default BookingCard;
