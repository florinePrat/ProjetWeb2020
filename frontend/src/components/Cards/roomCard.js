import {Component} from "react";
import React from "react";
import {
    Button, Alert,
    Modal,
    ModalBody,
    UncontrolledTooltip
} from "reactstrap";

import {FormGroup, FormControl} from "react-bootstrap";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import Card from "react-bootstrap/Card";
import CardText from "reactstrap/es/CardText";
import api from "../../utils/room";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import CardImg from "react-bootstrap/CardImg";
import Javascript from "../Modals/modalCreateAvailability";

const burl = "http://localhost:3000/images";

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
            imageUrl: localStorage.getItem("roomUrl"),
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

    update = event => {
        if (this.state.title.length === 0) {
            this.setState({error: "nom du lieu vide"});
        } else if (this.state.address.length === 0) {
            this.setState({error: "adresse vide"});
        } else if (this.state.city.length === 0) {
            this.setState({error: "ville vide"});
        } else if (this.state.postalCode.length === 0) {
            this.setState({error: "code postal vide"});
        } else if (this.state.category.length === 0) {
            this.setState({error: "categorie vide"});
        } else if (this.state.bail.length === 0) {
            this.setState({error: "caution vide"});
        } else if (this.state.price.length === 0) {
            this.setState({error: "prix vide"});
        } else if (this.state.description.length === 0) {
            this.setState({error: "description vide"});
        } else {
            console.log('roomid : ', this.state._id);

            api.updateRoom({
                title: this.state.title,
                description: this.state.description,
                address: this.state.address,
                city: this.state.city,
                postalCode: this.state.postalCode,
                category: this.state.category,
                bail: this.state.bail,
                _id: this.state._id,
                price: this.state.price,
                state: "publishable",
            }).then(res => {
                console.log(res.data);
                console.log('je suis dans créer room');
                window.location = "./profile-page"
            }, error => {
                console.log(error.response.data.error);
                this.setState({error: error.response.data.error});
            })
        }
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
                    <CardImg top width="100%" src={burl + '/' + this.state.imageUrl} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{this.props.title}</CardTitle>
                        <CardText>Catégorie : {this.props.category}</CardText>
                        <CardText> Prix : {this.props.price} / jours</CardText>
                        <CardText> Adresse : {this.props.address}</CardText>
                        <p>Ville : {this.props.city} ({this.props.postalCode}) </p>

                        <Button
                            className="btn-round"
                            color="info"
                            type="button"
                            onClick={() => this.setState({modalUpdate: true})}
                        >
                            <i className="now-ui-icons arrows-1_cloud-upload-94"/>
                            Modifier salle
                        </Button>
                        {/* ------------------------------------------------------------------------------------ modalUpdate*/}

                        <Modal isOpen={this.state.modalUpdate} toggle={() => this.setState({modalUpdate: false})}>
                            <div className="modal-header justify-content-center">
                                <button
                                    className="close"
                                    type="button"
                                    onClick={() => this.setState({modalUpdate: false})}
                                >
                                    <i className="now-ui-icons ui-1_simple-remove"/>
                                </button>
                                <h4 className="title title-up">Je modifie ma salle</h4>

                            </div>
                            {this.state.error ?
                                <Alert color="danger">
                                    {this.state.error}
                                </Alert> : false
                            }
                            <ModalBody>
                                <form>
                                    <div className="form-row">
                                        <div className="col">
                                            <FormGroup controlId="title">
                                                <i className="now-ui-icons shopping_tag-content"/> Nom du lieu :
                                                <FormControl
                                                    placeholder="Nom du lieu *"
                                                    value={this.state.title}
                                                    onChange={this.handleChange}
                                                    type="text"
                                                >
                                                </FormControl>
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <FormGroup controlId="address">
                                            <i className="now-ui-icons location_pin"/> Adresse :
                                            <FormControl
                                                placeholder="Adresse *"
                                                value={this.state.address}
                                                onChange={this.handleChange}
                                                type="text"
                                            >
                                            </FormControl>
                                        </FormGroup>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <FormGroup controlId="city">
                                                <i className="now-ui-icons location_map-big"/> Ville :
                                                <FormControl
                                                    placeholder="ville *"
                                                    value={this.state.city}
                                                    onChange={this.handleChange}
                                                    type="text"
                                                >
                                                </FormControl>
                                            </FormGroup>
                                        </div>

                                        <div className="form-group col-md-6">
                                            <FormGroup controlId="postalCode">
                                                <i className="now-ui-icons location_bookmark"/> CP :
                                                <FormControl
                                                    placeholder="Code postal *"
                                                    value={this.state.postalCode}
                                                    onChange={this.handleChange}
                                                    type="text"
                                                >
                                                </FormControl>
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row">
                                            <FormGroup controlId="price">
                                                <i className="now-ui-icons location_bookmark"/> Prix à la journée :
                                                <FormControl
                                                    placeholder="Prix *"
                                                    value={this.state.price}
                                                    onChange={this.handleChange}
                                                    type="number"
                                                >
                                                </FormControl>
                                            </FormGroup>
                                            <FormGroup controlId="bail">
                                                <i className="now-ui-icons location_bookmark"/> Montant de la caution à
                                                la journée :
                                                <FormControl
                                                    placeholder="Caution *"
                                                    value={this.state.bail}
                                                    onChange={this.handleChange}
                                                    type="number"
                                                >
                                                </FormControl>
                                            </FormGroup>
                                        </div>
                                        <FormGroup controlId="category">
                                            <i className="now-ui-icons location_bookmark"/> Catégorie :
                                            <FormControl
                                                placeholder="Categorie *"
                                                as="select"
                                                value={this.state.category}
                                                onChange={this.handleChange}
                                                type="text"
                                            >
                                                <option>{this.state.category}</option>
                                                <option>Salle de fêtes (mariages, soirée, anniverssaire..)</option>
                                                <option>Salle de réunions pro</option>
                                                <option>Salle de coworking</option>
                                                <option>Salle de restaurant</option>
                                                <option>Garage</option>
                                                <option>Hangar</option>
                                            </FormControl>
                                        </FormGroup>
                                        <FormGroup controlId="description">
                                            <i className="now-ui-icons location_bookmark"/> Description :
                                            <FormControl
                                                placeholder="Description *"
                                                value={this.state.description}
                                                onChange={this.handleChange}
                                                type="text"
                                            >
                                            </FormControl>
                                        </FormGroup>
                                    </div>


                                    <Javascript
                                        _id={this.state._id}
                                    />

                                </form>
                            </ModalBody>
                            <div className="modal-footer">


                                <Button
                                    color="danger"
                                    type="button"
                                    onClick={() => this.setState({modalUpdate: false})}
                                >
                                    Annuler
                                </Button>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="bottom"
                                    target="published"
                                >
                                    Ceci ne publie pas l'annonce
                                </UncontrolledTooltip>
                                <Button
                                    color="info"
                                    type="button"
                                    id="published"
                                    onClick={this.update}
                                >
                                    Enregistrer
                                </Button>
                            </div>
                        </Modal>

                        {/* ------------------------------------------------------------------------------------ endModal */}
                        <Button
                            className="btn-round"
                            color="danger"
                            onClick={() => this.setState({modalDelete: true})}
                            bssize="large"
                        >
                            supprimer
                        </Button>


                        {/* ------------------------------------------------------------------------------------ modalDelete*/}

                        <Modal isOpen={this.state.modalDelete} toggle={() => this.setState({modalDelete: false})}>
                            <div className="modal-header justify-content-center">
                                <button
                                    className="close"
                                    type="button"
                                    onClick={() => this.setState({modalDelete: false})}
                                >
                                    <i className="now-ui-icons ui-1_simple-remove"/>
                                </button>
                                <h4 className="title title-up">Je supprime ma salle</h4>
                                {this.state.error ?
                                    <Alert color="danger">
                                        {this.state.error}
                                    </Alert> : false
                                }
                            </div>
                            <ModalBody>
                                <p>Etes-vous sûr de vouloir supprimer votre salle ?</p>
                            </ModalBody>
                            <div className="modal-footer">


                                <Button
                                    color="danger"
                                    type="button"
                                    onClick={() => this.setState({modalDelete: false})}
                                >
                                    Non
                                </Button>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="bottom"
                                    target="delete"
                                >
                                    Supprime définitivement votre annonce
                                </UncontrolledTooltip>
                                <Button
                                    color="info"
                                    type="button"
                                    id="delete"
                                    onClick={this.deleteRoom}
                                >
                                    Oui
                                </Button>
                            </div>
                        </Modal>

                        {/* ------------------------------------------------------------------------------------ endModal */}


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
                            <CardImg top width="100%" src={burl + '/' + this.state.imageUrl} alt="Card image cap" />
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
