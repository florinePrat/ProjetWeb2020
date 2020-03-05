import {Alert, Button, Modal, ModalBody, UncontrolledTooltip} from "reactstrap";
import React from "react";
import api from "../../utils/room";

function DeleteRoom({_id}) {
    const [modalDelete, setModalDelete] = React.useState(false);
    const [error] = React.useState(false);

    const deleteRoom = event => {
        api.deleteRoom(_id)
            .then(res => {
                window.location = "/profile-page";
                console.log('objet supprimer !')
            })
    };


        return (
            <>
                <Button
                    className="btn-round"
                    color="danger"
                    onClick={() => setModalDelete( true)}
                    bssize="large"
                >
                    supprimer
                </Button>

                <Modal isOpen={modalDelete} toggle={() => setModalDelete( false)}>
                    <div className="modal-header justify-content-center">
                        <button
                            className="close"
                            type="button"
                            onClick={() => setModalDelete( false)}
                        >
                            <i className="now-ui-icons ui-1_simple-remove"/>
                        </button>
                        <h4 className="title title-up">Je supprime ma salle</h4>
                        {error ?
                            <Alert color="danger">
                                {error}
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
                            onClick={() => setModalDelete( false)}
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
                            onClick={deleteRoom}
                        >
                            Oui
                        </Button>
                    </div>
                </Modal>


            </>
        );
}
export default DeleteRoom;
