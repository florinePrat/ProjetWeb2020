import React from "react";
// reactstrap components
import {
    Alert,
    Button,
    Modal,
    ModalBody,
} from "reactstrap";

import api from '../../utils/room';
import {FormControl,FormGroup, Form} from "react-bootstrap"
import DateRangePicker from 'react-daterange-picker';
import moment from 'moment';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import 'react-daterange-picker/dist/css/react-calendar.css'

// core components

const stateDefinitions = {
    available: {
        color: null,
        label: 'Available',
    },
   /* unavailable: {
        selectable: false,
        color: '#78818b',
        label: 'Unavailable',
    },*/
};

/*
const dateRanges = [
    {
        state: 'unavailable',
        range: moment.range(
            moment().add(3, 'weeks'),
            moment().add(3, 'weeks').add(5, 'days')
        ),
    },
];
*/


class availabilityModal extends React.Component {

    constructor(props) {
        super(props);
        let now = new Date();
        let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
        let end = moment(start).add(1, "days").subtract(1, "seconds");
        this.state = {
            start : start,
            end : end,
            modal: false,
            userId: localStorage.getItem("userId"),
            error: false,
            dispo:[],
            availability :[],
            _id: this.props._id,
            value : null
        };
        this.send.bind(this);
        this.applyCallback = this.applyCallback.bind(this);
    };

    applyCallback(startDate, endDate){
        this.setState({
                start: startDate,
                end : endDate
            }
        )
    }

    send = event => {
        if (this.state.dispo.length === 0) {
            this.setState({error: "disponibilités vide"});
        } else {
            api.updateRoomAvailabilities(this.state.availability, this.state._id).then(res => {
                console.log(res.data);
                console.log('je suis dans créer room');
            }, error => {
                console.log(error.response.data.error);
                this.setState({error:error.response.data.errors});
            })

        }
    };

    /*handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };*/

   /* onSelect = dispo => {
        this.setState({dispo: dispo});
        console.log("selected date : ", this.state.dispo);
        this.setState({availability : {start : this.state.dispo.start._i, end : this.state.dispo.end._i}});
        console.log("selected range : start : ",this.state.dispo.start._i, "end : ", this.state.dispo.end._i);
        console.log("envoie : ", this.state.availability)
    };*/



    render() {

        let now = new Date();
        let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
        let end = moment(start).add(1, "days").subtract(1, "seconds");
        let ranges = {
            "Today Only": [moment(start), moment(end)],
            "3 Days": [moment(start), moment(end).add(3, "days")]
        };
        let local = {
            "format":"DD-MM-YYYY HH:mm",
            "sundayFirst" : false
        };
        let minDate = moment(start);
        let maxDate = moment(start).add(2, "year");

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

                                         <DateTimeRangeContainer
                                             ranges={ranges}
                                             start={this.state.start}
                                             end={this.state.end}
                                             local={local}
                                             minDate = {minDate}
                                             maxDate={maxDate}
                                             applyCallback={this.applyCallback}
                                         >
                                             <FormControl
                                                 id="formControlsTextB"
                                                 type="text"
                                                 label="Text"
                                                 placeholder="Enter text"
                                             />
                                         </DateTimeRangeContainer>
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
