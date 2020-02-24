import React from "react";
// reactstrap components
import {
    Alert,
    Button,
    Modal,
    ModalBody,
} from "reactstrap";

import api from '../../utils/room';
import {FormControl,FormGroup, Form, FormLabel} from "react-bootstrap";
import moment from 'moment';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';


// core components


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
            openedDates:[],
            availability :[],
            _id: this.props._id,
            value : null,
            day: 0,
            startHours : now,
            endHours : now

        };
        this.send.bind(this);
        this.sendOpenedWeek.bind(this);
        this.applyCallback = this.applyCallback.bind(this);
        this.handleChange.bind(this);
    };

    applyCallback(startDate, endDate){
        console.log('iciiii',startDate, endDate);
        this.state ={
                starter: startDate,
                ender : endDate
            }
        ;
        this.setState({openedDates : {start : this.state.starter._d, end : this.state.ender._d}});
        console.log('openedDays',this.state.openedDates);
    }

    setWeekDays(){
        this.state={openedWeekDays : {day: this.state.day, startHours : this.state.startHours, endHours : this.state.endHours}, _id:this.props._id};
        console.log("openedWeekDays : ", this.state.openedWeekDays);
        console.log('id : ', this.state._id)
    }

    sendOpenedWeek = event => {

        console.log("openedWeekDays : ", this.state.openedWeekDays);
        api.createOpenedWeekDays(this.state.openedWeekDays, this.state._id).then(res => {
            console.log(res.data);
            console.log("openedWeekDays : ", this.state.openedWeekDays);
            console.log('je suis dans créer room');
        }, error => {
            console.log(error.response.data.error);
            this.setState({error:error.response.data.errors});
        })

    };

    send = event => {
        if (this.state.start.length === 0) {
            this.setState({error: "disponibilités vide"});
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
        this.setState({
            [event.target.id]: event.target.value
        });
        console.log('target : ', event.target.id , event.target.value);
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
            "3 Days": [moment(start), moment(end).add(3, "days")]
        };
        let local = {
            "format":"DD-MM-YYYY HH:mm",
            "sundayFirst" : false
        };
        let minDate = moment(start);
        //let maxDate = moment(start).add(2, "year");
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

                                <i className="now-ui-icons location_bookmark"/> Mes disponibilités sont réccurentes chaque semaine ?

                                <div className={"row"}>
                                    <FormGroup controlId="day">
                                        <FormLabel>Jour de la semaine</FormLabel>
                                        <FormControl as="select" onChange={this.handleChange}>
                                            <option value={0}>Lundi</option>
                                            <option value={1}>Mardi</option>
                                            <option value={2}>Mercredi</option>
                                            <option value={3}>Jeudi</option>
                                            <option value={4}>Vendredi</option>
                                            <option value={5}>Samedi</option>
                                            <option value={6}>Dimanche</option>
                                        </FormControl>
                                            <FormLabel>De</FormLabel>
                                            <input type={"date-time"} id={"startHours"} value={this.state.startHours}
                                                   onChange={this.handleChange}/>
                                            <FormLabel>à</FormLabel>
                                            <input type={"date-time"} id={"endHours"} value={this.state.endHours}
                                                   onChange={this.handleChange}/>
                                        <Button
                                            color="info"
                                            type="button"
                                            onClick={() => {this.setWeekDays(); this.sendOpenedWeek()}}
                                        >
                                            Valider
                                        </Button>
                                    </FormGroup>


                                </div>




                                 <div>
                                        <i className="now-ui-icons location_bookmark"/> choisir les jours disponibles en plus dans l'année :

                                         <DateTimeRangeContainer
                                             ranges={ranges}
                                             start={this.state.start}
                                             end={this.state.end}
                                             local={local}
                                             minDate = {minDate}
                                             applyCallback={this.applyCallback}
                                             smartMode
                                         >
                                             <FormControl
                                                 id="formControlsTextB"
                                                 type="text"
                                                 label="Text"
                                                 placeholder="Enter text"
                                                 style={{ cursor: "pointer" }}
                                                 disabled={disabled}
                                                 value={value}
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
