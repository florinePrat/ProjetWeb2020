import React, {useEffect} from "react";
// reactstrap components
import {
    Button,
    Modal,
    ModalBody,
} from "reactstrap";

import api from '../../utils/booking';
import auth from '../../utils/auth';
import room from '../../utils/room';
import {FormControl, FormGroup, Form, Col} from "react-bootstrap"
import UncontrolledAlert from "reactstrap/es/UncontrolledAlert";
import moment from "moment";
import RoomCard from "../Cards/roomCardForLanding";

// core components

function AvailabilityModal({_id, ownerId}) {


    const [modal, setModal] = React.useState(false);
    const [userId] = React.useState(localStorage.getItem("userId"));
    const [error,setError] = React.useState(false);
    const [availability,setAvailability] = React.useState([]);
    const [dispo,setDispo] = React.useState("");
    const [state,setState] = React.useState('');
    const [isAuth] = React.useState( auth.isAuth());


    useEffect(()=>{
        room.getOpenedDates(_id).then(res =>{
            console.log("availability for this room : ", res.data.availability);
            setAvailability (res.data.availability);

        }, error => {
            console.log(error);
            setError(error.response.error);
        })
    },[]);


    const send = event => {
        if (ownerId !== userId){
            api.createBooking(dispo, state, ownerId, userId, _id).then(res => {
                console.log(res.data);
                console.log('je suis dans créer room');
                window.location = "profile-page"
            }, error => {
                console.log(error);
                setError(error.response.error);
            });
        } else {
            setError("Désolé vous ne pouvez pas réserver votre propre salle... :)")
        }

    };


    //console.log(availability[2].openedDates[0]);

   /* let availabilities = availability.map(avail => {
        let myAvail = {};
        myAvail[avail] = avail
    });

    console.log(availabilities);*/



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
                                onChange={e => setDispo(e.target.value)}
                                type="text"
                            >
                                <option>Choisir une date</option>
                                {/*options*/}
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
