import React from "react";
// reactstrap components
import {
    Alert,
    Button,
    Modal,
    ModalBody,
} from "reactstrap";

import api from '../../utils/room';
import {FormControl, FormGroup, Form} from "react-bootstrap"
import MultipleDatePicker from 'react-multiple-datepicker';

// core components

class availabilityModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            userId: localStorage.getItem("userId"),
            error: false,
            dispo:[],
            _id: this.props._id,
        };
        this.send.bind(this);
        this.handleChange.bind(this);
    };


    send = event => {
        if (this.state.dispo.length === 0) {
            this.setState({error: "disponibilités vide"});
        } else {
            api.updateRoomAvailabilities(this.state.dispo, this.state._id).then(res => {
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
                    color="success"
                    type="button"
                    onClick={() => this.setState({modal: true})}
                >
                    <i className="now-ui-icons arrows-1_cloud-upload-94"/>
                    Ajouter des disponibilités
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
                        <h4 className="title title-up">J'ajoute mes disponibilités</h4>
                        {this.state.error ?
                            <Alert color="danger">
                                {this.state.error}
                            </Alert> : false
                        }
                    </div>
                    <ModalBody>
                        <Form>
                            <FormGroup controlId="dispo">
                                <i className="now-ui-icons location_bookmark"/> disponibilités :
                                <FormControl
                                    placeholder="Categorie *"
                                    as="select"
                                    value={this.state.dispo}
                                    onChange={this.handleChange}
                                    type="text"
                                >
                                    <option>Tous les jours</option>
                                    <option>Certains jours</option>
                                </FormControl>
                                {this.state.dispo === "Certains jours"
                                    ? <div>
                                        <i className="now-ui-icons location_bookmark"/> choisir les jours disponibles :
                                        <MultipleDatePicker
                                            onSubmit={dates => this.setState({dispo : dates})}
                                        />
                                    </div>
                                : null
                                }

                            </FormGroup>


                        </Form>
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
export default availabilityModal;
