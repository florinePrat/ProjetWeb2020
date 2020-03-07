import {Component, useEffect} from "react";
import React from "react";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import Card from "react-bootstrap/Card";
import auth from "../../utils/auth";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import apiRoom from '../../utils/room';
import api from '../../utils/booking';
import {Button} from "reactstrap";
import moment from "moment";


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
    const [review, setReview] = React.useState([]);
    const now = moment();


    useEffect(()=> {
        if (state === "accepted") {

            auth.getUser(userId)
                .then(res => {
                    setUser(res.data);
                    console.log('my user :', user);
                    setPhoneNumber(res.data.phoneNumber);
                    console.log('phoneNumber : ',phoneNumber);
                }, function (data) {
                    console.log('je suis dans data erreur', data);
                });

        }
    },[]);

    const createReview = event => {
        if (myState !== "accepted") {

            apiRoom.createReview(review, _id)
                .then(res => {
                    console.log('')
                }, function (data) {
                    console.log('je suis dans data erreur', data);
                });
        }
    };


    const deleteBooking = event => {
        if (myState !== "refused") {

            api.deleteBooking(_id)
                .then(res => {
                    onDeleted();
                    console.log('objet supprimer !')
                }, function (data) {
                    console.log('je suis dans data erreur', data);
                });
        }
    };

        return (

                <Card style={{width: '18rem'}} >
                    <CardBody>
                        <CardTitle>Etat : {myState}</CardTitle>
                        <CardSubtitle>Date :  {moment(date[0].start).format("DD MM YYYY HH:mm")} </CardSubtitle>
                        <br/>
                        {state === "accepted"
                            ? <CardTitle>Contact du propriétaire de la salle : 0{phoneNumber} </CardTitle>
                            : null
                        }
                        {now > moment(date[0].start)
                            ? <Button
                                type="button"
                                color="info"
                                onClick={createReview}
                            >
                                Laisser un avis à la salle
                            </Button>
                        : <Button
                                type="button"
                                onClick={deleteBooking}
                            >
                                Annuler réservation
                            </Button>
                        }

                    </CardBody>
                </Card>
        )

}

export default BookingCard;
