import {Component, useEffect} from "react";
import React from "react";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import Card from "react-bootstrap/Card";
import auth from "../../utils/auth";
import room from "../../utils/room";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import CreateReviewRoom from '../Modals/modalCreateReview';
import api from '../../utils/booking';
import {Button} from "reactstrap";
import moment from "moment";


// this class send a answer to back for verify the answer and done the card of the day
function BookingCard({ _id, date, roomId, ownerId, customerId, state, onDeleted,onAddReview}) {
    const [user, setUser] = React.useState([]);
    const [rooms, setRooms] = React.useState([]);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [myState] = React.useState([state]);
    const now = moment();


    useEffect(()=> {
        room.getOneRoom(roomId).then(res=>{
            setRooms(res.data);
            console.log("rooms : ",res.data)
        }, function (data) {
            console.log('je suis dans data erreur', data);
        });

        if (state === "accepted") {
            auth.getUser(ownerId)
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
                    <CardTitle>State : {myState}</CardTitle>
                    <CardSubtitle>Room : {rooms.title} </CardSubtitle>
                    <CardSubtitle>Date :  {moment(date[0].start).format("DD MM YYYY HH:mm")} </CardSubtitle>
                    <br/>
                    {state === "accepted"
                        ? <CardTitle>Owner contact : 0{phoneNumber} </CardTitle>
                        : null
                    }
                    {now > moment(date[0].start) && state === "accepted"
                        ? <CreateReviewRoom
                            _id = {_id}
                            roomId = {roomId}
                            onAddReview={onAddReview}
                        />
                    : <Button
                            type="button"
                            onClick={deleteBooking}
                        >
                            cancel booking
                        </Button>
                    }

                </CardBody>
            </Card>
    )

}

export default BookingCard;
