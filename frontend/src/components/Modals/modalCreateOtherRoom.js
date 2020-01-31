import React from "react";
// reactstrap components
import {
    Alert,
    Button,
    Modal,
    ModalBody,
} from "reactstrap";

import auth from '../../utils/auth';
import api from '../../utils/room';
import {FormGroup,FormControl} from "react-bootstrap";

// core components

class createRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            phoneNumber: "",
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
        } else {
            api.createOtherRoom(this.state.title,this.state.address,this.state.city,this.state.postalCode,this.state.userId).then(res => {
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
                    color="neutral"
                    type="button"
                    onClick={() => this.setState({modal: true})}
                >
                    <i className="now-ui-icons arrows-1_cloud-upload-94"/>
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
                        </form>
                    </ModalBody>
                    <div className="modal-footer">

                        <Button
                            color="danger"
                            type="button"
                            onClick={() => this.setState({modal: false})}
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
