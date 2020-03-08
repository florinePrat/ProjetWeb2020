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
import OpenedDatesPickerContainer from "../AvailabilityForm/Container/OpenedDatesPickerContainer";
import ClosedDatesPickerContainer from "../AvailabilityForm/Container/ClosedDatesPickerContainer";
import OpenedWeekDaysPicker from "../AvailabilityForm/Container/OpenedWeekDaysContainer";



function AvailabilityModal({_id}) {
    let now = new Date();

    const [start] = React.useState( moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0)));
    const [end] = React.useState(moment(start).add(1, "days").subtract(1, "seconds"));
    const [modal, setModal] = React.useState(false);
    const [userId] = React.useState(localStorage.getItem("userId"));
    const [error,setError] = React.useState(false);
    const [openedDates,setOpenedDates] = React.useState([]);
    const [availability,setAvailability] = React.useState([]);
    const [openedWeekDays,setOpenedWeekDays] = React.useState([]);
    const [value,setValue] = React.useState(null);
    const [startHours,setStartHours] = React.useState( [moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0))]);
    const [endHours,setEndHours] = React.useState( [moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0))]);
    const [day,setDay] = React.useState(0);
    const [availabilityId,setAvailabilityId] = React.useState(null);



    const sendOpenedWeek = (weekDays) => {
        console.log("openedWeekDays : ", weekDays);
        api.createOpenedWeekDays(weekDays, _id).then(res => {
            console.log(res.data);
            console.log("openedWeekDays : ", weekDays);
            console.log('je suis dans créer room');
            setAvailabilityId (res.data.availabilityId)
        }, error => {
            console.log(error.response.data.error);
            setError(error.response.data.errors);
        })
    };


    const send = event => {
        if (start.length === 0) {
            setError("disponibilités vide");
        } else if (availabilityId !== null){

                console.log('openedDays',openedDates);
                api.addOpenedDates(openedDates, availabilityId).then(res => {
                    console.log(res.data);
                    console.log('je suis dans créer room');
                }, error => {
                    console.log(error.response.data.error);
                    setError(error.response.data.errors);
                })
        } else {

                console.log('openedDays',openedDates);
                api.createOpenedDates(openedDates, _id).then(res => {
                    console.log(res.data);
                    console.log('je suis dans créer room');
                }, error => {
                    console.log(error.response.data.error);
                    setError(error.response.data.errors);
                })
            }
    };


        return (
            <>

                <Button
                    className="btn-round"
                    color="success"
                    type="button"
                    onClick={() => setModal(true)}
                >
                    <i className="now-ui-icons arrows-1_cloud-upload-94"/>
                    Ajouter des disponibilités
                </Button>


                <Modal size={"lg"} style={{maxWidth: '1600px', width: '80%'}} isOpen={modal} toggle={() => setModal(false)}>
                    <div className="modal-header justify-content-center">
                        <button
                            className="close"
                            type="button"
                            onClick={() =>setModal(false)}
                        >
                            <i className="now-ui-icons ui-1_simple-remove"/>
                        </button>
                        <h4 className="title title-up">J'ajoute mes disponibilités</h4>
                        {error ?
                            <Alert color="danger">
                                {error}
                            </Alert> : false
                        }
                    </div>
                    <ModalBody>
                        <Form>
                            <FormGroup controlId="dispo">

                                {/*  <i className="now-ui-icons location_bookmark"/> Mes disponibilités sont réccurentes chaque semaine ?

                               <OpenedWeekDaysPicker
                                    roomId = {_id}
                                />*/}

                                <i className="now-ui-icons location_bookmark"/> J'ajoute des disponibilités exeptionelles
                                <OpenedDatesPickerContainer
                                    roomId = {_id}
                                />
                                {/*<i className="now-ui-icons location_bookmark"/> J'ajoute des fermetures exeptionelles
                                <ClosedDatesPickerContainer
                                    roomId = {_id}
                                />*/}

                            </FormGroup>

                        </Form>
                    </ModalBody>
                    <div className="modal-footer">

                        <Button
                            color="danger"
                            type="button"
                            onClick={() => setModal(false)}
                        >
                            Annuler
                        </Button>
                        <Button
                            color="info"
                            type="button"
                            onClick={send}
                        >
                            Valider
                        </Button>
                    </div>
                </Modal>

            </>
        );
}
export default AvailabilityModal;
