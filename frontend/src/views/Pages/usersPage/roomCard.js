import {Component} from "react";
import React from "react";
import {Button} from "react-bootstrap";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CardText from "reactstrap/es/CardText";


// this class send a answer to back for verify the answer and done the card of the day
class roomCard extends Component{


    constructor(props) {
        super(props);
        this.state = {
            isDeployed: false,
        };
    }

    render(){
        console.log("my props : ",this.props);
        return(
                this.state.isDeployed
                    ? <div>
                        <Container>

                            <Col>
                    <Card style={{ width: '18rem' }} >
                        <CardBody>
                            <CardTitle>{this.props.title}</CardTitle>
                            <CardText>Catégorie : {this.props.category}</CardText>
                            <CardText> Prix : {this.props.price} / jours</CardText>
                            <CardText> Adresse : {this.props.address}</CardText>
                            <p>Ville : {this.props.city} ({this.props.postalCode}) </p>

                        <Button
                            className="btn-info"
                            onClick={()=>{
                                this.setState({isDeployed:false});
                            }}
                            bssize="large"
                        >
                            Réserver
                        </Button>
                        <Button
                            className="btn-info"
                            onClick={()=>{
                                this.setState({isDeployed:false});
                            }}
                            bssize="large"
                        >
                            Retour
                        </Button>
                        </CardBody>
                    </Card>
                            </Col>
                        </Container>
                        </div>
                    : <div>
                        <Container>


                            <Card style={{ width: '18rem' }} >
                                <CardBody >
                                    <CardTitle>{this.props.title}</CardTitle>
                                    <CardText>Catégorie : {this.props.category}</CardText>
                                    <CardText> Prix : {this.props.price}</CardText>
                                    <CardText>{this.props.description}</CardText>
                                </CardBody>
                                <CardBody>
                                <Button
                                    className="btn-info"
                                    onClick={()=>{
                                        this.setState({isDeployed:true})
                                    }}
                                    bssize="large"
                                >
                                    Voir
                                </Button>
                                </CardBody>
                            </Card>
                        </Container>
                    </div>

        )
    }
}
export default roomCard;
