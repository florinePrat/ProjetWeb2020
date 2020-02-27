import React from "react";
// reactstrap components
import {
    Alert,
    Button,
    Modal,
    ModalBody,
} from "reactstrap";

import auth from '../../utils/auth';
import {FormGroup,FormControl} from "react-bootstrap";

// core components

class CreatePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            statePassword: "",
            _id:localStorage.getItem('userId'),
            error: false,
        };
        this.send.bind(this);
        this.handleChange.bind(this);
    };


    send = event => {
        if (this.state.password.length === 0) {
            this.setState({error: "mot de passe vide"});
        } else {
            auth.createPassword(this.state.password,this.state.statePassword, this.state._id).then(res => {
                console.log(res.data);
                console.log('je suis dans créer room');
                localStorage.setItem('statePassword', res.data.statePassword);
                window.location = "./profile-page"
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



    render() {
        console.log('id :' ,this.state._id)
        return (
            <>

                <Alert
                    color="danger"
                    onClick={() => this.setState({modal: true})}
                >
                    <i className="now-ui-icons loader_gear"/>
                    Merci de créer un mot de passe :)
                </Alert>


                <Modal isOpen={this.state.modal} toggle={() => this.setState({modal: false})}>
                    <div className="modal-header justify-content-center">
                        <button
                            className="close"
                            type="button"
                            onClick={() => this.setState({modal: false})}
                        >
                            <i className="now-ui-icons ui-1_simple-remove"/>
                        </button>
                        <h4 className="title title-up">Je crée mon mot de passe</h4>
                        {this.state.error ?
                            <Alert color="danger">
                                {this.state.error}
                            </Alert> : false
                        }
                    </div>
                    <ModalBody>
                        <form>
                            <div className="form-row">
                                <div className="col">
                                    <FormGroup controlId="password">
                                        <i className="now-ui-icons objects_key-25"/> Mot de passe :
                                        <FormControl
                                            placeholder= "Mot de passe *"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            type="password"
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
export default CreatePassword;
