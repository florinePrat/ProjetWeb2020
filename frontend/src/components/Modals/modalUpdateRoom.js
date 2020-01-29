import React from "react";
// reactstrap components
import {
    Alert,
    Button,
    Modal,
    ModalBody, UncontrolledTooltip,
} from "reactstrap";

import api from '../../utils/room';
import {FormGroup,FormControl} from "react-bootstrap";

// core components

class updateRoom extends React.Component {
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
            error: false,
            rooms:[],
        };
        this.send.bind(this);
        this.handleChange.bind(this);
    };


    send = event => {
        if (this.state.title.length === 0) {
            this.setState({error: "titre vide"});
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
        } else {

                api.updateRoom(this.state.title,this.state.address,this.state.city,this.state.postalCode,).then(res => {
                    console.log(res.data);
                    console.log('je suis dans créer room');
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
                    type="button"
                    onClick={() => this.setState({modal: true})}
                >
                    <i className="now-ui-icons arrows-1_cloud-upload-94"/>
                    Modifier salle
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
                                        <i className="now-ui-icons shopping_tag-content"/> Nom du lieu :
                                        <FormControl
                                            placeholder= "Nom du lieu *"
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
                                        placeholder= "Adresse *"
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
                                            placeholder= "ville *"
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
                                            placeholder= "Code postal *"
                                            value={this.state.postalCode}
                                            onChange={this.handleChange}
                                            type="text"
                                        >
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="col">
                                <FormGroup controlId="email">
                                    <i className="now-ui-icons ui-1_email-85"/> E-mail :
                                    <FormControl
                                        placeholder= "E-mail *"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        type="text"
                                    >
                                    </FormControl>
                                </FormGroup>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <FormGroup controlId="firstName">
                                        <i className="now-ui-icons users_single-02"/> Prénom :
                                        <FormControl
                                            placeholder= "Prénom *"
                                            value={this.state.firstName}
                                            onChange={this.handleChange}
                                            type="text"
                                        >
                                        </FormControl>
                                    </FormGroup>
                                </div>
                                <div className="col">
                                    <FormGroup controlId="phoneNumber">
                                        <i className="now-ui-icons tech_mobile"/> Numéro de téléphone :
                                        <FormControl
                                            placeholder= "Poratble *"
                                            value={this.state.phoneNumber}
                                            onChange={this.handleChange}
                                            type="text"
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
                            id = "published"
                            onClick={this.send}
                        >
                            Enregistrer
                        </Button>
                    </div>
                </Modal>


            </>
        );
    }
}
export default updateRoom;
