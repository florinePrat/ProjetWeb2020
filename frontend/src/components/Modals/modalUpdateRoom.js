import {Alert, Button, Modal, ModalBody, UncontrolledTooltip} from "reactstrap";
import {FormControl, FormGroup} from "react-bootstrap";
import AvailabilityModal from "./modalCreateAvailability";
import React, {useEffect} from "react";
import myCategories from "../../utils/categories";
import api from "../../utils/room";
import imageUpload from "../../utils/image-upload";



function UpdateRoom(props) {
    const {_id,title,address,city,postalCode,category,bail,price,description,picture, onUpdated} = props;
    const [modalUpdate, setModalUpdate] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [categories, setCategories] = React.useState([]);

    const [data, setData] = React.useState(props);
    console.log(data);

    useEffect(()=>{
        setData(props);
        myCategories.getAllCategories()
            .then(res => {
                const categories = res.data.category;
                console.log('my category 1', categories);
                setCategories(categories);
            }, function (data) {
                console.log(data);
            })
    },[]);

    const update = event => {
        if (data.title.length === 0) {
            setError("titre vide");
        } else if (data.address.length === 0) {
            setError("adresse vide");
        } else if (data.city.length === 0) {
            setError("ville vide");
        } else if (data.postalCode.length === 0) {
            setError("code postal vide");
        } else if (data.category.length === 0) {
            setError("catégorie vide");
        } else if (data.bail.length === 0) {
            setError("caution vide");
        } else if (data.price.length === 0) {
            setError("prix vide");
        } else if (data.description.length === 0) {
            setError("description vide");
        } else {
            console.log('roomid : ', _id);

            api.updateRoom({
                title: data.title,
                description: data.description,
                address: data.address,
                city: data.city,
                postalCode: data.postalCode,
                category: data.category,
                bail: data.bail,
                _id: data._id,
                price: data.price,
                state: "publishable",
            }).then(res => {
                console.log(res.data);
                console.log('je suis dans créer room');
                setModalUpdate(false);
                onUpdated(res.data);
            }, error => {
                console.log(error.response.data.error);
                setError(error.response.data.errors);
            })
        }
    };

    const upload = () => {
        document.getElementById("selectImageRoom").click();
    };

    const handlePictureChange = (e) => {
        console.log("image look", e.target.files[0]);
        console.log("image",e.target.files[0]);
        console.log("test de roomId : ", _id);
        imageUpload.upload(e.target.files[0]).then(res => {
            console.log('test',res.data.imageUrl);
            api.addPictureRoom({imageUrl :res.data.imageUrl, _id : _id}).then(res =>{
                console.log(res.data);
                onUpdated(res.data);
            }, error => {
                console.log(error)
            })
        }, error => {
            console.log(error)
        })
    };

    if (categories){
        var options = categories.map((data)=>
            <option
                key={data.name}>
                {data.name}
            </option>
        );
    }

    return (
        <>

            <Button
                className="btn-round"
                color="info"
                type="button"
                onClick={() => setModalUpdate( true)}
            >
                <i className="now-ui-icons arrows-1_cloud-upload-94"/>
                Update room
            </Button>


            <Modal isOpen={modalUpdate} toggle={() => setModalUpdate( false)}>
                <div className="modal-header justify-content-center">
                    <button
                        className="close"
                        type="button"
                        onClick={() => setModalUpdate( false)}
                    >
                        <i className="now-ui-icons ui-1_simple-remove"/>
                    </button>
                    <h4 className="title title-up">I update my room</h4>

                </div>
                {error ?
                    <Alert color="danger">
                        {error}
                    </Alert> : false
                }
                <ModalBody>
                    <form>
                        <div className="form-row">
                            <div className="col">
                                <FormGroup controlId="title">
                                    <i className="now-ui-icons shopping_tag-content"/> Name :
                                    <FormControl
                                        placeholder="Nom du lieu *"
                                        value={data.title}
                                        onChange={e=> setData({...data, title : e.target.value})}
                                        type="text"
                                    >
                                    </FormControl>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="form-group">
                            <FormGroup controlId="address">
                                <i className="now-ui-icons location_pin"/> Address :
                                <FormControl
                                    placeholder="Adresse *"
                                    value={data.address}
                                    onChange={e=> setData({...data, address : e.target.value})}
                                    type="text"
                                >
                                </FormControl>
                            </FormGroup>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <FormGroup controlId="city">
                                    <i className="now-ui-icons location_map-big"/> City :
                                    <FormControl
                                        placeholder="ville *"
                                        value={data.city}
                                        onChange={e=> setData({...data, city : e.target.value})}
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
                                        value={data.postalCode}
                                        onChange={e=> setData({...data, postalCode : e.target.value})}
                                        type="text"
                                    >
                                    </FormControl>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <FormGroup controlId="price">
                                    <i className="now-ui-icons location_bookmark"/> Price for a day :
                                    <FormControl
                                        placeholder="Prix *"
                                        value={data.price}
                                        onChange={e=> setData({...data, price : e.target.value})}
                                        type="number"
                                    >
                                    </FormControl>
                                </FormGroup>
                                <FormGroup controlId="bail">
                                    <i className="now-ui-icons location_bookmark"/> Bail for a day :
                                    <FormControl
                                        placeholder="Caution *"
                                        value={data.bail}
                                        onChange={e=> setData({...data, bail : e.target.value})}
                                        type="number"
                                    >
                                    </FormControl>
                                </FormGroup>
                            </div>
                            <FormGroup controlId="category">
                                <i className="now-ui-icons location_bookmark"/> Category :
                                <FormControl
                                    placeholder="Categorie *"
                                    as="select"
                                    value={data.category}
                                    onChange={e=> setData({...data, category : e.target.value})}
                                    type="text"
                                >
                                    <option>Choose a category</option>
                                    {options}
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId="description">
                                <i className="now-ui-icons location_bookmark"/> Description :
                                <FormControl
                                    placeholder="Description *"
                                    value={data.description}
                                    onChange={e=> setData({...data, description : e.target.value})}
                                    type="text"
                                >
                                </FormControl>
                            </FormGroup>
                        </div>

                        <AvailabilityModal
                            _id={_id}
                        />

                        <div>
                            <input type="file" name="avatar" id="selectImageRoom" hidden={true} value={picture} onChangeCapture={handlePictureChange}/>
                            <Button
                                className="btn-round"
                                color="info"
                                type="button"
                                onClick={upload}
                            >
                                <i className="now-ui-icons arrows-1_cloud-upload-94"/>
                                Add a picture
                            </Button>
                        </div>
                    </form>
                </ModalBody>
                <div className="modal-footer">


                    <Button
                        color="danger"
                        type="button"
                        onClick={() => setModalUpdate( false)}
                    >
                        Cancel
                    </Button>
                    <UncontrolledTooltip
                        delay={0}
                        placement="bottom"
                        target="published"
                    >
                        That doesn't publish the ad
                    </UncontrolledTooltip>
                    <Button
                        color="info"
                        type="button"
                        id="published"
                        onClick={update}
                    >
                        Save
                    </Button>
                </div>
            </Modal>


        </>
    );
}
export default UpdateRoom;
