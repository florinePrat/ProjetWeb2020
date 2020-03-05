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

function BookingCard({ _id, date, roomId, ownerId, customerId, state}) {
    const [edit, setEdit] = React.useState(false);
    const [userId] = React.useState(localStorage.getItem("userId"));
    const [error, setError] = React.useState(false);
    const [rooms, setRooms] = React.useState([]);
    const [user, setUser] = React.useState([]);
    const [myState, setMyState] = React.useState([state]);


    useEffect (() => {
        room.getOneRoom(roomId)
            .then(res => {
                setRooms(res.data.room);
                console.log(_id);
                console.log('room', rooms)
            }, function (data) {
                console.log(data);
            });
    },[]);

    const requestBooking = status => {
        api.requestBooking({
            _id: _id,
            myState: status,
        }).then(res => {

            {
                alert('La requête à bien été prise en compte, nous en informons le client.')
            }
            setMyState(status);
        })
    };

    useEffect(()=>{
        console.log('booking status ', myState);
        if (state === "accepted"){
            console.log("je suis dans le if", rooms.availability);
            console.log("nouvelles dispo : ", rooms.availability.filter(dispo => dispo !== date));
            room.updateRoomAvailabilities(
                rooms.availability.filter(dispo => dispo !== date),
                roomId
            ).then(res =>{
                window.location = "./profile-page";
            }, error => {
                console.log(error.response.data.error);
                setError(error.response.data.error);
            });

        } else {
            window.location = "./profile-page";
        }
    }, [myState]);



        return (

                <Card style={{width: '18rem'}} >
                    <CardBody>
                        <CardTitle>Réservation pour : {rooms.title}</CardTitle>
                        <CardSubtitle>Pour le : {date} </CardSubtitle>
                            <Button
                                color="danger"
                                type="button"
                                onClick={()=>requestBooking("refused")}
                            >
                                Refuser
                            </Button>
                            <Button
                                color="success"
                                type="button"
                                id="published"
                                    onClick={()=>requestBooking("accepted")}
                            >
                                Accepter
                            </Button>
                    </CardBody>
                </Card>
        )
}

export default BookingCard;
