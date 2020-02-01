import {Component} from "react";
import React from "react";
import {Button} from "react-bootstrap";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import {Card, Col, Container, Row} from "react-bootstrap";
import CardText from "reactstrap/es/CardText";
import CardImg from "react-bootstrap/CardImg";
import Javascript from "../../components/Modals/modalChooseAvailability";
const burl = "http://localhost:3000/images";

// this class send a answer to back for verify the answer and done the card of the day
class roomCard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isDeployed: false,
            imageUrl: localStorage.getItem("roomUrl"),
            availability: this.props.availability,
        };
    }

    render() {
        console.log("my props : ", this.props);
        return (
            this.state.isDeployed
                ?
                            <Card style={{width: '18rem'}}>
                                <CardImg top width="100%" src={burl + '/' + this.state.imageUrl} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>{this.props.title}</CardTitle>
                                    <CardText>{this.props.category}</CardText>
                                    <CardText> {this.props.price}€/jour</CardText>
                                    <CardText> Adresse : {this.props.address}</CardText>
                                    <p>Ville : {this.props.city} ({this.props.postalCode}) </p>

                                    <Javascript
                                        ownerId={this.props.userId}
                                        availability={this.state.availability}
                                    />


                                    <Button
                                        className="btn-info"
                                        onClick={() => {
                                            this.setState({isDeployed: false});
                                        }}
                                        bssize="large"
                                    >
                                        Retour
                                    </Button>
                                </CardBody>
                            </Card>
                :
                        <Card style={{width: '18rem'}}>
                            <CardImg top width="100%" src={burl + '/' + this.state.imageUrl} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>{this.props.title}</CardTitle>
                                <CardText>{this.props.category}</CardText>
                                <CardText>{this.props.price}€/jour</CardText>
                                <CardText>{this.props.description}</CardText>
                            </CardBody>
                            <CardBody>
                                <Button
                                    className="btn-info"
                                    onClick={() => {
                                        this.setState({isDeployed: true})
                                    }}
                                    bssize="large"
                                >
                                    Voir
                                </Button>
                            </CardBody>
                        </Card>

        )
    }
}

export default roomCard;
