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
import OpenedWeekDaysPicker from "../AvailabilityForm/OpenedWeekDaysPicker";





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
        this.applyCallback = this.applyCallback.bind(this);
        this.handleChange.bind(this);
    };

    applyCallback(startDate, endDate){
        console.log('iciiii',startDate, endDate);
        this.setState({openedDates : {start : startDate, end : endDate}}, () => console.log('openedDays',this.state.openedDates));
    }

    getWeekDays(){
        return {openedWeekDays : [{day: this.state.day, startHours : this.state.startHours._d, endHours : this.state.endHours._d}]}
    }

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


    handleChange = event => {
        //ajouter la valeur start hours à l'élément [id] du tableau
        // id input est modifié => tableaudeshoraires[id]={startHours,endHours}
        const splitValue = event.target.value;
        const hours = splitValue[0];
        const minutes = splitValue[1];
        console.log('target : ', event.target.id ,  hours, minutes);
        const startHoursToSend = moment(this.state.startHours).set("hours", hours).set("minutes", minutes);
        this.setState({
            [event.target.id]: this.state.startHours
        });
    };

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
        };
        let local = {
            "format":"DD-MM-YYYY HH:mm",
            "sundayFirst" : false
        };
        let minDate = moment(start);
        let disabled = false;
        let value = `${this.state.start.format(
            "DD-MM-YYYY HH:mm"
        )} - ${this.state.end.format("DD-MM-YYYY HH:mm")}`;

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

                                <OpenedWeekDaysPicker/>

                                <i className="now-ui-icons location_bookmark"/> J'ajoute des disponibilités exeptionelles
                                <OpenedDatesPickerContainer/>
                                <i className="now-ui-icons location_bookmark"/> J'ajoute des fermetures exeptionelles
                                <ClosedDatesPickerContainer/>

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
