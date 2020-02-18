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
import DateRangePicker from 'react-daterange-picker';
import moment from 'moment';
import 'react-daterange-picker/dist/css/react-calendar.css'

// core components

const stateDefinitions = {
    available: {
        color: null,
        label: 'Available',
    },
    unavailable: {
        selectable: false,
        color: '#78818b',
        label: 'Unavailable',
    },
};

const dateRanges = [
    {
        state: 'unavailable',
        range: moment.range(
            moment().add(3, 'weeks'),
            moment().add(3, 'weeks').add(5, 'days')
        ),
    },
];


class availabilityModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            userId: localStorage.getItem("userId"),
            error: false,
            dispo:[],
            _id: this.props._id,
            value : null
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
            }, error => {
                console.log(error.response.data.error);
                this.setState({error:error.response.data.errors});
            })

        }
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    onSelect = dispo => this.setState({dispo});



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

                                 <div>
                                        <i className="now-ui-icons location_bookmark"/> choisir les jours disponibles :
                                        <DateRangePicker
                                            firstOfWeek={1}
                                            numberOfCalendars={1}
                                            selectionType='range'
                                            minimumDate={new Date()}
                                            stateDefinitions={stateDefinitions}
                                            dateStates={dateRanges}
                                            defaultState="available"
                                            showLegend={true}
                                            value={this.state.dispo}
                                            onSelect={this.onSelect}
                                        />
                                    </div>

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
