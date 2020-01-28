import React from "react";
// reactstrap components
import {
    Alert,
    Button,
    Modal,
    ModalBody,
} from "reactstrap";

import api from '../../utils/room';
import {FormGroup,FormControl} from "react-bootstrap";

// core components

class createRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            userId: localStorage.getItem("userId"),
            title:"",
            description:"",
            price:"",
            address:"",
            city:"",
            region:"",
            postalCode:"",
            category:"",
            bail:"",
            imageUrl:" ",
            error: false
        };
        this.send.bind(this);
        this.handleChange.bind(this);
    };


    send = event => {
        if (this.state.title.length === 0) {
            this.setState({error: "titre vide"});
        } else if (this.state.price.length === 0) {
            this.setState({error: "prix vide"});
        } else if (this.state.bail.length === 0) {
            this.setState({error: "caution vide"});
        } else if (this.state.description.length === 0) {
            this.setState({error: "description vide"});
        } else if (this.state.address.length === 0) {
            this.setState({error: "adresse vide"});
        } else if (this.state.city.length === 0) {
            this.setState({error: "ville vide"});
        } else if (this.state.region.length === 0) {
            this.setState({error: "region vide"});
        } else if (this.state.postalCode.length === 0) {
            this.setState({error: "code postal vide"});
        } else if (this.state.category.length === 0) {
            this.setState({error: "categorie vide"});
        } else {
            api.createRoom(this.state.title,this.state.description,this.state.price,this.state.address,this.state.city,this.state.region,this.state.postalCode,this.state.category,this.state.bail,this.state.imageUrl,this.state.userId).then(res => {
                console.log(res.data);
                window.location = "./profile-page"
            }, error => {
                console.log(error.response.data.error);
                this.setState({error:error.response.data.error});
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
            <>

                <Button
                    className="btn-round"
                    color="info"
                    size="lg"
                    onClick={() => this.setState({modal: true})}
                >
                    Proposer une salle
                </Button>


                <Modal isOpen={this.state.modal} toggle={() => this.setState({modal: false})}>
                    <div className="modal-header justify-content-center">
                        <button
                            className="close"
                            type="button"
                            onClick={() => this.setState({modal: false})}
                        >
                            <i className="now-ui-icons ui-1_simple-remove"/>
                        </button>
                        <h4 className="title title-up">Je loue une salle</h4>
                        {this.state.error ?
                            <Alert color="danger">
                                {this.state.error}
                            </Alert> : false
                        }
                    </div>
                    <ModalBody>
                        <form>
                            <div className="form-row">
                                <div className="col">
                                    <FormGroup controlId="title">
                                        <i className="now-ui-icons shopping_tag-content"/> Titre de l'annonce :
                                        <FormControl
                                            placeholder= "Super salle à Palavas"
                                            value={this.state.title}
                                            onChange={this.handleChange}
                                            type="text"
                                        >
                                        </FormControl>
                                    </FormGroup>
                                </div>
                                <div className="form-group col-md-4">
                                    <FormGroup  controlId="category">
                                        <i className="now-ui-icons objects_diamond"/> Catégorie :
                                        <FormControl
                                            placeholder= "Catégorie"
                                            as="select"
                                            value={this.state.category}
                                            onChange={this.handleChange}
                                        >
                                            <option>Fêtes</option>
                                            <option>Mariage</option>
                                            <option>Réunion</option>
                                            <option>Coworking</option>
                                            <option>...</option>
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="form-group">
                                <FormGroup  controlId="description">
                                    <i className="now-ui-icons objects_spaceship"/> Description :
                                    <FormControl
                                        placeholder="Description de la salle et de l'annonce"
                                        rows="3"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                    >
                                    </FormControl>
                                </FormGroup>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <FormGroup controlId="price">
                                        <i className="now-ui-icons ui-1_zoom-bold"/> Prix :
                                        <FormControl
                                            placeholder= "Prix / jour en euros"
                                            value={this.state.price}
                                            onChange={this.handleChange}
                                            type="number"
                                        >
                                        </FormControl>
                                    </FormGroup>
                                </div>
                                <div className="col">
                                    <FormGroup controlId="bail">
                                        <i className="now-ui-icons ui-1_send"/> Caution :
                                        <FormControl
                                            placeholder= "Montant en euros"
                                            value={this.state.bail}
                                            onChange={this.handleChange}
                                            type="number"
                                        >
                                        </FormControl>
                                    </FormGroup>
                                </div>

                            </div>

                            <div className="form-group">
                                <FormGroup controlId="address">
                                    <i className="now-ui-icons location_pin"/> Adresse :
                                    <FormControl
                                        placeholder= "81 rue du poirier"
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
                                            placeholder= "Palavas"
                                            value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                        >
                                        </FormControl>
                                    </FormGroup>
                                </div>
                                <div className="form-group col-md-4">
                                    <FormGroup  controlId="region">
                                        <i className="now-ui-icons location_world"/> Région :
                                        <FormControl
                                            placeholder= "Région"
                                            as="select"
                                            value={this.state.region}
                                            onChange={this.handleChange}
                                        >
                                            <option>Auvergne-Rhône-Alpes</option>
                                            <option>Bourgogne-Franche-Comté</option>
                                            <option>Bretagne</option>
                                            <option>Centre-Val de Loire</option>
                                            <option>Corse</option>
                                            <option>Grand Est</option>
                                            <option>Guadeloupe</option>
                                            <option>Guyane</option>
                                            <option>Hauts-de-France</option>
                                            <option>Île-de-France</option>
                                            <option>Normandie</option>
                                            <option>Nouvelle-Aquitaine</option>
                                            <option>Occitanie</option>
                                            <option>Pays de la Loire</option>
                                            <option>Provence-Alpes-Côte d'Azur</option>
                                            <option>La Réunion</option>
                                        </FormControl>
                                    </FormGroup>

                                </div>
                                <div className="form-group col-md-2">
                                    <FormGroup controlId="postalCode">
                                        <i className="now-ui-icons location_bookmark"/> CP :
                                        <FormControl
                                            placeholder= "34860"
                                            value={this.state.postalCode}
                                            onChange={this.handleChange}
                                            type="number"
                                        >
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <div className="modal-footer">

                        <Button
                            color="danger"
                            type="button"
                            onClick={() => this.setState({modal: true})}
                        >
                            Annuler
                        </Button>
                        <Button
                            color="info"
                            type="button"
                            onClick={this.send}
                        >
                            Valider
                        </Button>
                    </div>
                </Modal>


            </>
        );
    }
}
export default createRoom;
