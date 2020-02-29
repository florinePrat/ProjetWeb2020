import React from "react";
// reactstrap components
import {
    Alert,
    Button, Container,
    Modal,
    ModalBody,
} from "reactstrap";

import api from '../../utils/room';
import {FormGroup, Form} from "react-bootstrap";
import moment from 'moment';
import 'react-daterange-picker/dist/css/react-calendar.css';
import OpenedDatesPickerContainer from "../AvailabilityForm/Container/OpenedDatesPickerContainer";
import ClosedDatesPickerContainer from "../AvailabilityForm/Container/ClosedDatesPickerContainer";
import OpenedWeekDaysPicker from "../AvailabilityForm/Container/OpenedWeekDaysContainer";





class AvailabilityModal extends React.Component {

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
            openedDates:[],
            availability :[],
            _id: this.props._id,
            value : null,
            day: 0,
            openedWeekDays : [],
            startHours :  [moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0))],
            endHours :  [moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0))],

            availabilityId : null,

        };
        this.send.bind(this);
        this.sendOpenedWeek.bind(this);
    };


    sendOpenedWeek = (weekDays) => {
        console.log("openedWeekDays : ", weekDays);
        api.createOpenedWeekDays(weekDays, this.state._id).then(res => {
            console.log(res.data);
            console.log("openedWeekDays : ", weekDays);
            console.log('je suis dans créer room');
            this.setState({availabilityId : res.data.availabilityId})
        }, error => {
            console.log(error.response.data.error);
            this.setState({error:error.response.data.errors});
        })
    };


    send = event => {
        if (this.state.start.length === 0) {
            this.setState({error: "disponibilités vide"});
        } else if (this.state.availabilityId !== null){

                console.log('openedDays',this.state.openedDates);
                api.addOpenedDates(this.state.openedDates, this.state.availabilityId).then(res => {
                    console.log(res.data);
                    console.log('je suis dans créer room');
                }, error => {
                    console.log(error.response.data.error);
                    this.setState({error:error.response.data.errors});
                })
        } else {

                console.log('openedDays',this.state.openedDates);
                api.createOpenedDates(this.state.openedDates, this.state._id).then(res => {
                    console.log(res.data);
                    console.log('je suis dans créer room');
                }, error => {
                    console.log(error.response.data.error);
                    this.setState({error:error.response.data.errors});
                })
            }
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


                <Modal size={"lg"} style={{maxWidth: '1600px', width: '80%'}} isOpen={this.state.modal} toggle={() => this.setState({modal: false})}>
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

                                <i className="now-ui-icons location_bookmark"/> Mes disponibilités sont réccurentes chaque semaine ?

                                <OpenedWeekDaysPicker
                                    roomId = {this.state._id}
                                />

                                <i className="now-ui-icons location_bookmark"/> J'ajoute des disponibilités exeptionelles
                                <OpenedDatesPickerContainer
                                    roomId = {this.state._id}
                                />
                                <i className="now-ui-icons location_bookmark"/> J'ajoute des fermetures exeptionelles
                                <ClosedDatesPickerContainer
                                    roomId = {this.state._id}
                                />

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
export default AvailabilityModal;
