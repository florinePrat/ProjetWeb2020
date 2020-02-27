import {Alert, Button, Modal, ModalBody, UncontrolledTooltip} from "reactstrap";
import {FormControl, FormGroup} from "react-bootstrap";
import AvailabilityModal from "./modalCreateAvailability";
import React from "react";
import categories from "../../utils/categories";
import api from "../../utils/room";
import imageUpload from "../../utils/image-upload";

class UpdateRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalUpdate: false,
            userId: localStorage.getItem("userId"),
            error: false,
            categories:[],
            _id : this.props._id
        };
        this.update.bind(this);
        this.upload.bind(this);
        this.handlePictureChange.bind(this);
        this.handleChange.bind(this);
    };

    componentWillMount(){
        categories.getAllCategories()
            .then(res => {
                const categories = res.data.category;
                console.log('my category 1', categories);
                this.setState({categories:categories});
            }, function (data) {
                console.log(data);
            })
    }

    update = event => {
        if (this.state.title.length === 0) {
            this.setState({error: "nom du lieu vide"});
        } else if (this.state.address.length === 0) {
            this.setState({error: "adresse vide"});
        } else if (this.state.city.length === 0) {
            this.setState({error: "ville vide"});
        } else if (this.state.postalCode.length === 0) {
            this.setState({error: "code postal vide"});
        } else if (this.state.category.length === 0) {
            this.setState({error: "categorie vide"});
        } else if (this.state.bail.length === 0) {
            this.setState({error: "caution vide"});
        } else if (this.state.price.length === 0) {
            this.setState({error: "prix vide"});
        } else if (this.state.description.length === 0) {
            this.setState({error: "description vide"});
        } else {
            console.log('roomid : ', this.state._id);

            api.updateRoom({
                title: this.props.title,
                description: this.props.description,
                address: this.props.address,
                city: this.props.city,
                postalCode: this.props.postalCode,
                category: this.props.category,
                bail: this.props.bail,
                _id: this.props._id,
                price: this.props.price,
                state: "publishable",
            }).then(res => {
                console.log(res.data);
                console.log('je suis dans créer room');
            }, error => {
                console.log(error.response.data.error);
                this.setState({error: error.response.data.error});
            })
        }
    };

    upload(){
        document.getElementById("selectImageRoom").click();
    };

    handlePictureChange = (e) => {
        console.log("image look", e.target.files[0]);
        console.log("image",e.target.files[0]);
        console.log("test de roomId : ", this.state._id);
        imageUpload.upload(e.target.files[0]).then(res => {
            console.log('test',res.data.imageUrl);
            api.addPictureRoom({imageUrl :res.data.imageUrl, _id : this.state._id}).then(res =>{
                console.log(res.data);
                window.location = "profile-page";
            }, error => {
                console.log(error)
            })
        }, error => {
            console.log(error)
        })
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };


    render() {
        let options = this.state.categories.map((data)=>
            <option
                key={data.name}>
                {data.name}
            </option>
        );

        return (
            <>

                <Button
                    className="btn-round"
                    color="info"
                    type="button"
                    onClick={() => this.setState({modalUpdate: true})}
                >
                    <i className="now-ui-icons arrows-1_cloud-upload-94"/>
                    Modifier salle
                </Button>


                <Modal isOpen={this.state.modalUpdate} toggle={() => this.setState({modalUpdate: false})}>
                    <div className="modal-header justify-content-center">
                        <button
                            className="close"
                            type="button"
                            onClick={() => this.setState({modalUpdate: false})}
                        >
                            <i className="now-ui-icons ui-1_simple-remove"/>
                        </button>
                        <h4 className="title title-up">Je modifie ma salle</h4>

                    </div>
                    {this.state.error ?
                        <Alert color="danger">
                            {this.state.error}
                        </Alert> : false
                    }
                    <ModalBody>
                        <form>
                            <div className="form-row">
                                <div className="col">
                                    <FormGroup controlId="title">
                                        <i className="now-ui-icons shopping_tag-content"/> Nom du lieu :
                                        <FormControl
                                            placeholder="Nom du lieu *"
                                            value={this.props.title}
                                            onChange={this.handleChange}
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
                                        placeholder="Adresse *"
                                        value={this.props.address}
                                        onChange={this.handleChange}
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
                                            placeholder="ville *"
                                            value={this.props.city}
                                            onChange={this.handleChange}
                                            type="text"
                                        >
                                        </FormControl>
                                    </FormGroup>
                                </div>

                                <div className="form-group col-md-6">
                                    <FormGroup controlId="postalCode">
                                        <i className="now-ui-icons location_bookmark"/> CP :
                                        <FormControl
                                            placeholder="Code postal *"
                                            value={this.props.postalCode}
                                            onChange={this.handleChange}
                                            type="text"
                                        >
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row">
                                    <FormGroup controlId="price">
                                        <i className="now-ui-icons location_bookmark"/> Prix à la journée :
                                        <FormControl
                                            placeholder="Prix *"
                                            value={this.props.price}
                                            onChange={this.handleChange}
                                            type="number"
                                        >
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup controlId="bail">
                                        <i className="now-ui-icons location_bookmark"/> Montant de la caution à
                                        la journée :
                                        <FormControl
                                            placeholder="Caution *"
                                            value={this.props.bail}
                                            onChange={this.handleChange}
                                            type="number"
                                        >
                                        </FormControl>
                                    </FormGroup>
                                </div>
                                <FormGroup controlId="category">
                                    <i className="now-ui-icons location_bookmark"/> Catégorie :
                                    <FormControl
                                        placeholder="Categorie *"
                                        as="select"
                                        value={this.props.category}
                                        onChange={this.handleChange}
                                        type="text"
                                    >
                                        {options}
                                    </FormControl>
                                </FormGroup>
                                <FormGroup controlId="description">
                                    <i className="now-ui-icons location_bookmark"/> Description :
                                    <FormControl
                                        placeholder="Description *"
                                        value={this.props.description}
                                        onChange={this.handleChange}
                                        type="text"
                                    >
                                    </FormControl>
                                </FormGroup>
                            </div>

                            <AvailabilityModal
                                _id={this.props._id}
                            />

                            <div>
                                <input type="file" name="avatar" id="selectImageRoom" hidden={true} value={this.props.picture} onChangeCapture={this.handlePictureChange}/>
                                <Button
                                    className="btn-round"
                                    color="info"
                                    type="button"
                                    onClick={this.upload}
                                >
                                    <i className="now-ui-icons arrows-1_cloud-upload-94"/>
                                    Ajouter une image
                                </Button>
                            </div>
                        </form>
                    </ModalBody>
                    <div className="modal-footer">


                        <Button
                            color="danger"
                            type="button"
                            onClick={() => this.setState({modalUpdate: false})}
                        >
                            Annuler
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            placement="bottom"
                            target="published"
                        >
                            Ceci ne publie pas l'annonce
                        </UncontrolledTooltip>
                        <Button
                            color="info"
                            type="button"
                            id="published"
                            onClick={this.update}
                        >
                            Enregistrer
                        </Button>
                    </div>
                </Modal>


            </>
        );
    }
}
export default UpdateRoom;
