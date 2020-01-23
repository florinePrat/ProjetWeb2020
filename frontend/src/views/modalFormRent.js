import React from "react";
// react plugins that creates an input with a date picker
import Datetime from "react-datetime";
// reactstrap components
import {
    Button,
    FormGroup,
    Container,
    Modal,
    ModalBody,
    Row,
    Col,
    UncontrolledTooltip,
    PopoverBody,
    PopoverHeader,
    UncontrolledPopover
} from "reactstrap";
import Label from "reactstrap/es/Label";
import CustomInput from "reactstrap/es/CustomInput";

// core components

function Javascript() {
    const [modal1, setModal1] = React.useState(false);
    return (
        <>

                            <Button
                                className="btn-round"
                                color="info"
                                size="lg"
                                onClick={() => setModal1(true)}
                            >
                                Proposer une salle
                            </Button>
                            <Modal isOpen={modal1} toggle={() => setModal1(false)}>
                                <div className="modal-header justify-content-center">
                                    <button
                                        className="close"
                                        type="button"
                                        onClick={() => setModal1(false)}
                                    >
                                        <i className="now-ui-icons ui-1_simple-remove"/>
                                    </button>
                                    <h4 className="title title-up">Je loue une salle</h4>
                                </div>
                                <ModalBody>
                                    <form>
                                        <div className="form-row">
                                            <div className="col">
                                                <label htmlFor="inputAddress">Titre de l'annonce</label>
                                                <input type="name" className="form-control" id="inputEmail4"
                                                       placeholder="Nom de la salle"/>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="inputAddress">Caution</label>
                                                <input type="text" className="form-control" placeholder="Montant de la caution en euros "/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlTextarea1">Description</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Description de la salle et de l'annonce"/>
                                        </div>
                                        <div className="form-row">
                                            <div className="col">
                                                <label htmlFor="inputAddress">Prix</label>
                                                <input type="text" className="form-control" placeholder="Prix / jour en euros "/>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputState">Catégorie</label>
                                                <select id="inputState" className="form-control">
                                                    <option selected>Choose...</option>
                                                    <option>...</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="inputAddress">Addresse </label>
                                            <input type="text" className="form-control" id="inputAddress"
                                                   placeholder="1234 rue de paris"/>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputCity">Ville</label>
                                                <input type="text" className="form-control" id="inputCity"/>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputState">Région</label>
                                                <select id="inputState" className="form-control">
                                                    <option selected>Choose...</option>
                                                    <option>...</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label htmlFor="inputZip">CP</label>
                                                <input type="text" className="form-control" id="inputZip"/>
                                            </div>
                                        </div>
                                        <FormGroup>
                                            <Label for="exampleCustomFileBrowser">Choisir une image</Label>
                                            <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" label="Selectionner une image" />
                                        </FormGroup>
                                        <div className="form-row">
                                            <FormGroup>
                                                <Datetime
                                                    timeFormat={true}
                                                    inputProps={{ placeholder: "Date et heure de début" }}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Datetime
                                                    timeFormat={true}
                                                    inputProps={{ placeholder: "Date et heure de fin" }}
                                                />
                                            </FormGroup>
                                        </div>
                                    </form>
                                </ModalBody>
                                <div className="modal-footer">

                                    <Button
                                        color="danger"
                                        type="button"
                                        onClick={() => setModal1(false)}
                                    >
                                        Annuler
                                    </Button>
                                    <Button color="info" type="button">
                                        Valider
                                    </Button>
                                </div>
                            </Modal>


        </>
    );
}

export default Javascript;
