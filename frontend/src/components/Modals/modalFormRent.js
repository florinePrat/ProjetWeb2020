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

function CreateRoom() {
    const [modal, setModal] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [city, setCity] = React.useState("");
    const [postalCode, setPostalCode] = React.useState("");
    const [userId, setUserId] = React.useState(localStorage.getItem("userId"));

    const send = event => {
        if (title.length === 0) {
            setError("titre vide");
        } else if (address.length === 0) {
            setError("adresse vide");
        } else if (city.length === 0) {
            setError("ville vide");
        } else if (postalCode.length === 0) {
            setError("code postal vide");
        } else if (email.length === 0) {
            setError("email vide");
        } else if (phoneNumber.length === 0) {
            setError("numéro de téléphone vide");
        } else {

            auth.signup(email, firstName, phoneNumber).then(res => {
                console.log('je suis dans créer user');
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('firstName', res.data.firstName);
                localStorage.setItem('imageUrl', res.data.imageUrl);
                localStorage.setItem('userId', res.data.userId);
                localStorage.setItem('statePassword', res.data.statePassword);
                setUserId(res.data.userId);
                console.log("signup",localStorage);

                setTimeout(() => console.log('setTimeoutOK'), 3000);
                api.createRoom(title,address,city,postalCode,res.data.userId, res.data.token).then(res => {
                    console.log(res.data);
                    console.log('je suis dans créer room');
                    window.location = "./profile-page"
                }, error => {
                    console.log(error.response.data.error);
                    setError(error.response.data.errors);
                })

            }, error => {
                console.log(error.response.data.error);
                setError(error.response.data.errors);
            });

        }
    };


        return (
            <>

                <Button
                    className="btn-round"
                    color="neutral"
                    outline
                    type="button"
                    onClick={() =>setModal( true)}
                >
                    <i className="now-ui-icons arrows-1_cloud-upload-94"/>
                    Proposer une salle
                </Button>


                <Modal isOpen={modal} toggle={() => setModal( false)}>
                    <div className="modal-header justify-content-center">
                        <button
                            className="close"
                            type="button"
                            onClick={() => setModal( false)}
                        >
                            <i className="now-ui-icons ui-1_simple-remove"/>
                        </button>
                        <h4 className="title title-up">Je loue une salle</h4>
                        {error ?
                            <Alert color="danger">
                                {error}
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
                                            value={title}
                                            onChange={e=> setTitle(e.target.value)}
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
                                        value={address}
                                        onChange={e=>setAddress(e.target.value)}
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
                                            value={city}
                                            onChange={e=>setCity(e.target.value)}
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
                                            value={postalCode}
                                            onChange={e=>setPostalCode(e.target.value)}
                                            type="text"
                                        >
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="col">
                                <FormGroup controlId="email">
                                    <i className="now-ui-icons ui-1_email-85"/> E-mail :
                                    <FormControl
                                        placeholder= "E-mail *"
                                        value={email}
                                        onChange={e=> setEmail(e.target.value)}
                                        type="text"
                                    >
                                    </FormControl>
                                </FormGroup>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <FormGroup controlId="firstName">
                                        <i className="now-ui-icons users_single-02"/> Prénom :
                                        <FormControl
                                            placeholder= "Prénom *"
                                            value={firstName}
                                            onChange={e=>setFirstName(e.target.value)}
                                            type="text"
                                        >
                                        </FormControl>
                                    </FormGroup>
                                </div>
                                <div className="col">
                                    <FormGroup controlId="phoneNumber">
                                        <i className="now-ui-icons tech_mobile"/> Numéro de téléphone :
                                        <FormControl
                                            placeholder= "Poratble *"
                                            value={phoneNumber}
                                            onChange={e=>setPhoneNumber(e.target.value)}
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
                            onClick={() =>setModal( false)}
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
export default CreateRoom;
