import React, {useEffect, useState} from "react";
// reactstrap components
import {
    Button,
    Modal,
    ModalBody,
} from "reactstrap";

import api from '../../utils/booking';
import auth from '../../utils/auth';
import apiRoom from '../../utils/room';
import {FormControl, FormGroup, Form, Col} from "react-bootstrap"
import UncontrolledAlert from "reactstrap/es/UncontrolledAlert";
import moment, {defaultFormat, now} from "moment";

// core components

function AvailabilityModal({_id, ownerId}) {


    const [modal, setModal] = React.useState(false);
    const [userId] = React.useState(localStorage.getItem("userId"));
    const [error, setError] = React.useState(false);
    const [availability, setAvailability] = React.useState([]);
    const [bookingDates, setBookingDates] = React.useState([]);
    const [dispo ,setDispo] = React.useState("");
    const [dates ,setDates] = useState({
        start: false,
        end: false
    });
    const [state, setState] = React.useState('');
    const [isAuth] = React.useState( auth.isAuth());
    //const now = moment();

    useEffect(()=>{
        apiRoom.getOpenedDates(_id).then(res =>{
            console.log("availability for this room : ", res.data.availability);
            setAvailability (res.data.availability);

        }, error => {
            console.log(error);
            setError(error.response.error);
        });
        console.log('id:', _id);

        api.getByRoom(_id).then(res=>{
            console.log("booking for this room : ", res);
            setBookingDates(res);
        }, error => {
            console.log(error);
            setError(error.response.error);
        });
    },[]);


    if (dispo !== "" && dispo !== "Choisir une date"){
        var dispo1 = dispo.split(" : ");
        var dispo2 = dispo1[1].split(" Fin");

        console.log(dispo2[0], dispo1[2]);

        console.log("dates", [{
            start : moment(dispo2[0], 'DD MM YYYY HH:mm').toISOString(),
            end : moment(dispo1[2],'DD MM YYYY HH:mm').toISOString(),
        }]);
    }


    const send = event => {
        setDates([{
            start : moment(dispo2[0], 'DD MM YYYY HH:mm').toISOString(),
            end :moment(dispo1[2],'DD MM YYYY HH:mm').toISOString(),
        }]);
    };

    useEffect(()=>{
        if (ownerId !== userId){
            if (dates){
                console.log('ma date de resa : ', dates);
                api.createBooking(dates, state, ownerId, userId, _id).then(res => {
                    console.log(res.data);
                    console.log('je suis dans créer room');
                    window.location = "profile-page"
                }, error => {
                    console.log(error);
                    setError(error.response.error);
                });
            }

        } else {
            setError("Désolé vous ne pouvez pas réserver votre propre salle... :)")
        }
    },[dates]);

    var bDateStart = [];
    var bDateEnd = [];
    bookingDates.map(bookingDate => {
        bookingDate.date.map(bDate => {
            bDateStart = bDate.start;
            bDateEnd = bDate.end;
        })
    });


    return (
        <>
            {isAuth !== false
                ? <Button
                    className="btn-round"
                    color="success"
                    type="button"
                    onClick={() => setModal(true)}
                >
                    <i className="now-ui-icons shopping_cart-simple"/>
                    Réserver cette salle
                </Button>
                : <Button
                    className="btn-round"
                    color="success"
                    type="button"
                    href="login-page"
                >
                    <i className="now-ui-icons shopping_cart-simple"/>
                    Identifiez-vous pour réserver cette salle
                </Button>
            }


            <Modal isOpen={modal} toggle={() => setModal(false)}>
                <div className="modal-header justify-content-center">
                    <button
                        className="close"
                        type="button"
                        onClick={() => setModal(false)}
                    >
                        <i className="now-ui-icons ui-1_simple-remove"/>
                    </button>
                    <h4 className="title title-up">Je choisi une date pour la réservation</h4>
                    {error ?
                        <UncontrolledAlert color="danger">
                            {error}
                        </UncontrolledAlert> : false
                    }
                </div>
                <ModalBody>
                    <Form>
                        <FormGroup controlId="dispo">
                            <i className="now-ui-icons location_bookmark"/> disponibilités :
                            <FormControl
                                placeholder="Categorie *"
                                as="select"
                                value={dispo}
                                onChange={e => setDispo(e.target.value)||console.log(e.target.value)}
                                type="text"
                            >
                                <option>Choisir une date</option>
                                {availability.length ?
                                    availability.map(avail => (
                                        avail.openedDates.length ?
                                            bookingDates.length ?
                                                avail.openedDates.filter(date => {
                                                    console.log(date.start, bDateStart, date.start !== bDateStart && date.end !== bDateEnd /*&& date.start < now()*/);
                                                    return date.start !== bDateStart && date.end !== bDateEnd
                                                }).map(room => (
                                                    <option>Début : {moment(room.start).format("DD MM YYYY HH:mm")} Fin : {moment(room.end).format("DD MM YYYY HH:mm")}</option>
                                                    //console.log(room)
                                                ))
                                                : avail.openedDates.map(roomDate => (
                                                    <option>Début : {moment(roomDate.start).format("DD MM YYYY HH:mm")} Fin : {moment(roomDate.end).format("DD MM YYYY HH:mm")}</option>)
                                                )

                                            : null
                                    ))
                                    : null}

                            </FormControl>

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
                        Je reserve
                    </Button>
                </div>
            </Modal>


        </>
    );
}
export default AvailabilityModal;
