import {Component} from "react";
import React from "react";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import Card from "react-bootstrap/Card";
import api from "../../utils/room";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import axios from "axios";
import {tokenHeaders} from "../../utils/headers";

const burlUser = "http://localhost:3000/api/auth";



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
            customerId:this.props.customerId,
            phoneNumber:'',
        };
    }

    componentDidMount() {
        if (this.state.state === "accepted") {

            axios.get(burlUser + '/getUser/' + this.state.userId, {
                headers: tokenHeaders
            })
                .then(res => {
                    const user = res.data;
                    this.setState({user: user});
                    console.log('my user :', user);
                    this.setState({phoneNumber:user.phoneNumber});
                    console.log('phoneNumber : ', this.state.phoneNumber);
                }, function (data) {
                    console.log('je suis dans data erreur',data);
                });
        }
    }

    deleteRoom = event => {
        api.deleteRoom(this.props._id)
            .then(res => {
                window.location = "/profile-page";
                console.log('objet supprimer !')
            })
    };




    render() {

        return (

                <Card style={{width: '18rem'}} >
                    <CardBody>
                        <CardTitle>Etat : {this.state.state}</CardTitle>
                        <CardSubtitle>Date : {this.state.date.substring(0, 10)} </CardSubtitle>
                        <br/>
                        {this.state.state === "accepted"
                            ?<CardTitle>Contact propriétaire de la salle : 0{this.state.phoneNumber} </CardTitle>
                            : null
                        }
                    </CardBody>
                </Card>
        )

    }
}

export default bookingCard;
