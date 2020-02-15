import {Component} from "react";
import React from "react";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import Card from "react-bootstrap/Card";
import api from "../../utils/booking";
import apiRoom from "../../utils/room";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import axios from "axios";
import {tokenHeaders} from "../../utils/headers";
import {Button} from "reactstrap";

const burl = process.env.REACT_APP_API_URL;


// this class send a answer to back for verify the answer and done the card of the day
class bookingCard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            userId: localStorage.getItem("userId"),
            date: this.props.date.substring(0, 10),
            _id: this.props._id,
            error: false,
            rooms: [],
            state: this.props.state,
            customerId: this.props.customerId,
            phoneNumber: '',
            roomId: this.props.roomId,
            availability:[],
        };
        this.deleteBooking = this.deleteBooking.bind(this);
    }

    componentDidMount() {
        if (this.state.state === "accepted") {

            axios.get(burl + '/api/auth/getUser/' + this.state.userId, {
                headers: tokenHeaders
            })
                .then(res => {
                    const user = res.data;
                    this.setState({user: user});
                    console.log('my user :', user);
                    this.setState({phoneNumber: user.phoneNumber});
                    console.log('phoneNumber : ', this.state.phoneNumber);
                }, function (data) {
                    console.log('je suis dans data erreur', data);
                });
        }
    }

    deleteBooking = event => {
        if (this.state.state !== "refused") {
            axios.get(burl + '/api/room/' + this.state.roomId, {
                headers: tokenHeaders
            })
                .then(res => {
                        const room = res.data.room;
                        this.setState({availability: room.availability});
                        console.log('availability', this.state.availability);

                        apiRoom.updateRoomAvailabilities(this.state.availability.concat([this.state.date.substring(0, 10)]), this.state.roomId)
                            .then(res => {
                                console.log('date a ajoter : ', this.state.date.substring(0, 10));
                                console.log('new availability', this.state.availability.concat([this.state.date.substring(0, 10)]));

                                api.deleteBooking(this.state._id)
                                    .then(res => {
                                        window.location = "profile-page";
                                        console.log('objet supprimer !')
                                    })
                            });

                    }
                    , function (data) {
                        console.log('je suis dans data erreur', data);
                    });
        }

    };



    render() {

        return (

                <Card style={{width: '18rem'}} >
                    <CardBody>
                        <CardTitle>Etat : {this.state.state}</CardTitle>
                        <CardSubtitle>Date : {this.state.date.substring(0, 10)} </CardSubtitle>
                        <br/>
                        {this.state.state === "accepted"
                            ? <CardTitle>Contact propriétaire de la salle : 0{this.state.phoneNumber} </CardTitle>
                            : null
                        }
                        <Button
                            type="button"
                            onClick={this.deleteBooking}
                        >
                            Annuler réservation
                        </Button>
                    </CardBody>
                </Card>
        )

    }
}

export default bookingCard;
