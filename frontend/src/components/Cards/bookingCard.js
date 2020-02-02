import {Component} from "react";
import React from "react";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import Card from "react-bootstrap/Card";
import api from "../../utils/room";
import CardSubtitle from "reactstrap/es/CardSubtitle";


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
            error: false,
            rooms: [],
            state: this.props.state,
        };
    }

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
                        <CardTitle>Etat : {this.props.state}</CardTitle>
                        <CardSubtitle>Date : {this.props.date} </CardSubtitle>
                    </CardBody>
                </Card>
        )

    }
}

export default bookingCard;
