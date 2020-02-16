import {Component} from "react";
import React from "react";
import {Button} from "reactstrap";

import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import Card from "react-bootstrap/Card";
import CardText from "reactstrap/es/CardText";
import api from "../../utils/room";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import CardImg from "react-bootstrap/CardImg";
import Javascript from "../Modals/modalUpdateRoom";
import Javascript2 from "../Modals/modalDeleteRoom";


// this class send a answer to back for verify the answer and done the card of the day
class roomCard extends Component {


    constructor(props) {
        super(props);
        console.log("propriete" + props._id);
        this.state = {
            isDeployed: false,
            edit: false,
            modalUpdate: false,
            modalDelete: false,
            userId: localStorage.getItem("userId"),
            title: this.props.title,
            description: this.props.description,
            price: this.props.price,
            address: this.props.address,
            city: this.props.city,
            postalCode: this.props.postalCode,
            category: this.props.category,
            bail: this.props.bail,
            imageUrl: this.props.imageUrl,
            _id: this.props._id,
            error: false,
            rooms: [],
            state: this.props.state,
        };
        this.publish = this.publish.bind(this);
        this.unPublish = this.unPublish.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    publish = event => {
        api.publishRoom({
            state: "published",
            _id: this.state._id,
        }).then(res => {
            window.location = "./profile-page";
            {
                alert('Votre salle à bien été publié ! :)')
            }
        }, error => {
            console.log(error.response.data.error);
            this.setState({error: error.response.data.error});
        })
    };

    unPublish = event => {
        api.unPublishRoom({
            state: "publishable",
            _id: this.state._id,
        }).then(res => {
            window.location = "./profile-page";
            {
                alert('Votre salle à bien été dépublié ! :)')
            }
        }, error => {
            console.log(error.response.data.error);
            this.setState({error: error.response.data.error});
        })
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    render() {

        return (
            this.state.isDeployed
                ?
                <Card style={{width: '18rem'}}>
                    <CardImg top width="100%" src={this.state.imageUrl} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{this.props.title}</CardTitle>
                        <CardText>Catégorie : {this.props.category}</CardText>
                        <CardText> Prix : {this.props.price} / jours</CardText>
                        <CardText> Adresse : {this.props.address}</CardText>
                        <p>Ville : {this.props.city} ({this.props.postalCode}) </p>

                        {/* ------------------------------------------------------------------------------------ modalUpdate*/}


                        <Javascript
                            _id = {this.state._id}
                            title = {this.state.title}
                            address = {this.state.address}
                            city = {this.state.city}
                            postalCode = {this.state.postalCode}
                            price = {this.state.price}
                            bail = {this.state.bail}
                            category = {this.state.category}
                            description = {this.state.description}
                            imageUrl = {this.state.imageUrl}

                        />



                        {/* ------------------------------------------------------------------------------------ modalDelete*/}

                        <Javascript2
                            _id = {this.state._id}
                        />



                        <Button
                            className="btn-round"
                            onClick={() => {
                                this.setState({isDeployed: false});

                            }}
                            bssize="large"
                        >
                            retour
                        </Button>
                    </CardBody>
                </Card>
                :
                        <Card style={{width: '18rem'}} >
                            <CardImg top width="100%" src={this.state.imageUrl} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>{this.props.title}</CardTitle>
                                <CardSubtitle>Prix : {this.props.price} €/jour </CardSubtitle>
                            </CardBody>
                            <CardBody>
                                <Button
                                    className="btn-round"
                                    color="info"
                                    onClick={() => {
                                        this.setState({isDeployed: true})
                                    }}
                                    bssize="large"
                                >
                                    Voir
                                </Button>
                                {this.state.state === "publishable"
                                    ? <Button
                                        className="btn-round"
                                        color="success"
                                        onClick={this.publish}
                                        bssize="large"
                                    >
                                        Publier
                                    </Button>

                                    : this.state.state === "published" ?

                                        <Button
                                            className="btn-round"
                                            onClick={this.unPublish}
                                            bssize="large"
                                        >
                                            Unpublish
                                        </Button> : null
                                }
                            </CardBody>
                        </Card>
        )


    }
}

export default roomCard;
