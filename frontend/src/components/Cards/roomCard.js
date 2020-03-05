import React from "react";
import {Button} from "reactstrap";

import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import Card from "react-bootstrap/Card";
import CardText from "reactstrap/es/CardText";
import api from "../../utils/room";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import CardImg from "react-bootstrap/CardImg";
import UpdateRoom from "../Modals/modalUpdateRoom";
import DeleteRoom from "../Modals/modalDeleteRoom";


// this class send a answer to back for verify the answer and done the card of the day

function RoomCard({imageUrl, title, category, price, address, city, postalCode, _id, bail, state, description}) {
    const [isDeployed, setIsDeployed] = React.useState(false);
    const [setError] = React.useState(false);
    

    const publish = event => {
        api.publishRoom({
            state: "published",
            _id: _id,
        }).then(res => {
            window.location = "./profile-page";
            {
                alert('Votre salle à bien été publié ! :)')
            }
        }, error => {
            console.log(error.response.data.error);
            setError(error.response.data.error);
        })
    };

    const unPublish = event => {
        api.unPublishRoom({
            state: "publishable",
            _id: _id,
        }).then(res => {
            window.location = "./profile-page";
            {
                alert('Votre salle à bien été dépublié ! :)')
            }
        }, error => {
            console.log(error.response.data.error);
            setError(error.response.data.error);
        })
    };



        return (
            isDeployed
                ?
                <Card style={{width: '18rem'}}>
                    <CardImg top width="100%" src={imageUrl} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{title}</CardTitle>
                        <CardText>Catégorie : {category}</CardText>
                        <CardText> Prix : {price} / jours</CardText>
                        <CardText> Adresse : {address}</CardText>
                        <p>Ville : {city} ({postalCode}) </p>

                        {/* ------------------------------------------------------------------------------------ modalUpdate*/}


                        <UpdateRoom
                            _id = {_id}
                            title = {title}
                            address = {address}
                            city = {city}
                            postalCode = {postalCode}
                            price = {price}
                            bail = {bail}
                            category = {category}
                            description = {description}
                            imageUrl = {imageUrl}

                        />



                        {/* ------------------------------------------------------------------------------------ modalDelete*/}

                        <DeleteRoom
                            _id = {_id}
                        />



                        <Button
                            className="btn-round"
                            onClick={() => {
                                setIsDeployed(false);

                            }}
                            bssize="large"
                        >
                            retour
                        </Button>
                    </CardBody>
                </Card>
                :
                        <Card style={{width: '18rem'}} >
                            <CardImg top width="100%" src={imageUrl} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>{title}</CardTitle>
                                <CardSubtitle>Prix : {price} €/jour </CardSubtitle>
                            </CardBody>
                            <CardBody>
                                <Button
                                    className="btn-round"
                                    color="info"
                                    onClick={() => {
                                        setIsDeployed(true)
                                    }}
                                    bssize="large"
                                >
                                    Voir
                                </Button>
                                {state === "publishable"
                                    ? <Button
                                        className="btn-round"
                                        color="success"
                                        onClick={publish}
                                        bssize="large"
                                    >
                                        Publier
                                    </Button>

                                    : state === "published" ?

                                        <Button
                                            className="btn-round"
                                            onClick={unPublish}
                                            bssize="large"
                                        >
                                            Unpublish
                                        </Button> : null
                                }
                            </CardBody>
                        </Card>
        )
}

export default RoomCard;
