import {Alert, Button, Modal, ModalBody, UncontrolledTooltip} from "reactstrap";
import React from "react";
import api from "../../utils/room";

class deleteRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalDelete: false,
            userId: localStorage.getItem("userId"),
            error: false,
        };
        this.deleteRoom.bind(this);
    };

    deleteRoom = event => {
        api.deleteRoom(this.props._id)
            .then(res => {
                window.location = "/profile-page";
                console.log('objet supprimer !')
            })
    };


    render() {
        return (
            <>
                <Button
                    className="btn-round"
                    color="danger"
                    onClick={() => this.setState({modalDelete: true})}
                    bssize="large"
                >
                    supprimer
                </Button>


                <Modal isOpen={this.state.modalDelete} toggle={() => this.setState({modalDelete: false})}>
                    <div className="modal-header justify-content-center">
                        <button
                            className="close"
                            type="button"
                            onClick={() => this.setState({modalDelete: false})}
                        >
                            <i className="now-ui-icons ui-1_simple-remove"/>
                        </button>
                        <h4 className="title title-up">Je supprime ma salle</h4>
                        {this.state.error ?
                            <Alert color="danger">
                                {this.state.error}
                            </Alert> : false
                        }
                    </div>
                    <ModalBody>
                        <p>Etes-vous sûr de vouloir supprimer votre salle ?</p>
                    </ModalBody>
                    <div className="modal-footer">


                        <Button
                            color="danger"
                            type="button"
                            onClick={() => this.setState({modalDelete: false})}
                        >
                            Non
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            placement="bottom"
                            target="delete"
                        >
                            Supprime définitivement votre annonce
                        </UncontrolledTooltip>
                        <Button
                            color="info"
                            type="button"
                            id="delete"
                            onClick={this.deleteRoom}
                        >
                            Oui
                        </Button>
                    </div>
                </Modal>


            </>
        );
    }
}
export default deleteRoom;
