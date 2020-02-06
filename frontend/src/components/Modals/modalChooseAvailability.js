import React from "react";
// reactstrap components
import {
    Alert,
    Button,
    Modal,
    ModalBody,
} from "reactstrap";

import api from '../../utils/booking';
import auth from '../../utils/auth';
import {FormControl, FormGroup, Form} from "react-bootstrap"
import UncontrolledAlert from "reactstrap/es/UncontrolledAlert";

// core components

class availabilityModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            availability: this.props.availability,
            modal: false,
            userId: localStorage.getItem("userId"),
            error: false,
            dispo:"",
            _id: this.props._id,
            isAuth: auth.isAuth(),
            state:'',
            ownerId:this.props.ownerId
        };
        this.send.bind(this);
        this.handleChange.bind(this);
    };


    send = event => {
        if (this.state.ownerId !== this.state.userId){
            api.createBooking(this.state.dispo, this.state.state, this.state.ownerId, this.state.userId, this.state._id).then(res => {
                console.log(res.data);
                console.log('je suis dans créer room');
                window.location = "profile-page"
            }, error => {
                console.log(error.response.data.error);
                this.setState({error:error.response.data.errors});
            });
        } else {
            this.setState({error:"Désolé vous ne pouvez pas réserver votre propre salle... :)"})
        }

    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };



    render() {

        let availability = this.state.availability;
        let options = availability.map((data)=>
            <option
            key={data}>
                {data}
            </option>
        );

        return (
            <>
                {this.state.isAuth !== false
                    ? <Button
                        className="btn-round"
                        color="success"
                        type="button"
                        onClick={() => this.setState({modal: true})}
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


                <Modal isOpen={this.state.modal} toggle={() => this.setState({modal: false})}>
                    <div className="modal-header justify-content-center">
                        <button
                            className="close"
                            type="button"
                            onClick={() => this.setState({modal: false})}
                        >
                            <i className="now-ui-icons ui-1_simple-remove"/>
                        </button>
                        <h4 className="title title-up">Je choisi une date pour la réservation</h4>
                        {this.state.error ?
                            <UncontrolledAlert color="danger">
                                {this.state.error}
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
                                    value={this.state.dispo}
                                    onChange={this.handleChange}
                                    type="text"
                                >
                                    {options}
                                </FormControl>

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
                            Je reserve
                        </Button>
                    </div>
                </Modal>


            </>
        );
    }
}
export default availabilityModal;
