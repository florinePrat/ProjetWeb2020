import {Component, useEffect} from "react";
import React from "react";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import Card from "react-bootstrap/Card";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import api from "../../utils/booking";
import {Button} from "reactstrap";
import room from "../../utils/room";


// this class send a answer to back for verify the answer and done the card of the day

function BookingCard({ _id, date, roomId, ownerId, customerId, state, onResponse}) {
    const [edit, setEdit] = React.useState(false);
    const [userId] = React.useState(localStorage.getItem("userId"));
    const [error, setError] = React.useState(false);
    const [rooms, setRooms] = React.useState([]);
    const [user, setUser] = React.useState([]);


    useEffect (() => {
        room.getOneRoom(roomId)
            .then(res => {
                setRooms(res.data);
                console.log(_id);
                console.log('room', rooms)
            }, function (data) {
                console.log(data);
            });
    },[]);

    const requestBooking = status => {
        console.log('statuuus  : ', status);
        api.requestBooking({
            _id: _id,
            myState: status,
        }).then(res => {
            console.log('sttttatus',status, res.data);

            if (status === "refused") {
                /*room.updateRoomAvailabilities(
                    rooms.availability.filter(dispo => dispo !== date),
                    roomId
                ).then(res => {

                }, error => {
                    console.log(error.response.data.error);
                    setError(error.response.data.error);
                });*/
            }
        })
    };



        return (

                <Card style={{width: '18rem'}} >
                    <CardBody>
                        <CardTitle>Réservation pour : {rooms.title}</CardTitle>
                        <CardSubtitle>Pour le : {date.start} </CardSubtitle>
                            <Button
                                color="danger"
                                type="button"
                                onClick={async()=> {
                                    await requestBooking("refused");
                                    onResponse("refused")
                                }}
                            >
                                Refuser
                            </Button>
                            <Button
                                color="success"
                                type="button"
                                id="published"
                                    onClick={async()=> {
                                        await requestBooking("accepted");
                                        onResponse("accepted")
                                    }}
                            >
                                Accepter
                            </Button>
                    </CardBody>
                </Card>
        )
}

export default BookingCard;
