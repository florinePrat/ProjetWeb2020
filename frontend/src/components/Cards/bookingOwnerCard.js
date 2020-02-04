import {Component} from "react";
import React from "react";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import Card from "react-bootstrap/Card";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import axios from "axios";
import {tokenHeaders} from "../../utils/headers";
import api from "../../utils/booking";
import {Button} from "reactstrap";
import room from "../../utils/room";


const burlRoom = "http://localhost:3000/api/room";



// this class send a answer to back for verify the answer and done the card of the day
class bookingCard extends Component {


    constructor(props) {
        super(props);
        console.log("propriete" + props._id);
        this.state = {
            edit: false,
            userId: localStorage.getItem("userId"),
            date: this.props.date,
            _id: this.props._id,
            roomId: this.props.roomId,
            ownerId: this.props.ownerId,
            customerId: this.props.customerId,
            error: false,
            rooms: [],
            user:[],
            state: this.props.state,
        };
    }

    componentWillMount () {
        axios.get(burlRoom + '/' + this.state.roomId, {
            headers: tokenHeaders
        })
            .then(res => {
                const room = res.data;
                this.setState({rooms: room});
                console.log(this.state._id);
                console.log('room', room)
            }, function (data) {
                console.log(data);
            });


    }

    requestBooking = status => {
        api.requestBooking({
            _id: this.state._id,
            state: status,
        }).then(res => {

            {
                alert('La requête à bien été prise en compte, nous en informons le client.')
            }
            this.setState({state : status});
            console.log('booking status ', this.state.state);


            if (this.state.state === "accepted"){
                console.log("je suis dans le if");
                console.log("nouvelles dispo : ", this.state.rooms.availability.filter(dispo => dispo !== this.state.date));
                room.updateRoomAvailabilities(
                    this.state.rooms.availability.filter(dispo => dispo !== this.state.date),
                    this.state.roomId
                ).then(res =>{
                    window.location = "./profile-page";
                }, error => {
                    console.log(error.response.data.error);
                    this.setState({error: error.response.data.error});
                });


             } else {
                window.location = "./profile-page";
            }

        }, error => {
            console.log(error.response.data.error);
            this.setState({error: error.response.data.error});
        });

    };



deleteRoom = event => {
        api.deleteRoom(this.props._id)
            .then(res => {
                window.location = "/profile-page";
                console.log('objet supprimer !')
            })
    };


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    render() {

        return (

                <Card style={{width: '18rem'}} >
                    <CardBody>
                        <CardTitle>Réservation pour : {this.state.rooms.title}</CardTitle>
                        <CardSubtitle>Pour le : {this.props.date} </CardSubtitle>
                            <Button
                                color="danger"
                                type="button"
                                onClick={()=>this.requestBooking("refused")}
                            >
                                Refuser
                            </Button>
                            <Button
                                color="success"
                                type="button"
                                id="published"
                                    onClick={()=>this.requestBooking("accepted")}
                            >
                                Accepter
                            </Button>
                    </CardBody>
                </Card>
        )

    }
}

export default bookingCard;
