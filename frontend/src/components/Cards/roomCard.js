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

function RoomCard({imageUrl, title, category, price, address, city, postalCode, _id, bail, state, description, onPublishStateUpdate, onUpdated, onDeleted}) {
    const [isDeployed, setIsDeployed] = React.useState(false);
    const [setError] = React.useState(false);
    

    const publish = state => {
        api.publishRoom({
            state,
            _id: _id,
        }).then(res => {
            onPublishStateUpdate(state);
        }, error => {
            console.log(error.response.data.error);
            setError(error.response.data.error);
        })
    };


    return (
        isDeployed
            ?
            <Card style={{width: '18rem'}}>
                <CardImg top width="100%" src={imageUrl} alt="Photo de la salle"/>
                <CardBody>
                    <CardTitle>{title}</CardTitle>
                    <CardText>Category : {category}</CardText>
                    <CardText> Price : {price} / jours</CardText>
                    <CardText> Address : {address}</CardText>
                    <p>City : {city} ({postalCode}) </p>

                    {/* ------------------------------------------------------------------------------------ modalUpdate*/}


                    <UpdateRoom
                        _id={_id}
                        title={title}
                        address={address}
                        city={city}
                        postalCode={postalCode}
                        price={price}
                        bail={bail}
                        category={category}
                        description={description}
                        imageUrl={imageUrl}
                        onUpdated={onUpdated}
                    />


                    {/* ------------------------------------------------------------------------------------ modalDelete*/}

                    <DeleteRoom
                        _id={_id}
                        onDeleted={onDeleted}
                    />


                    <Button
                        className="btn-round"
                        onClick={() => {
                            setIsDeployed(false);

                        }}
                        bssize="large"
                    >
                        return
                    </Button>
                </CardBody>
            </Card>
            :
            <Card style={{width: '18rem'}}>
                <CardImg top width="100%" src={imageUrl} alt="Photo de la salle"/>
                <CardBody>
                    <CardTitle>{title}</CardTitle>
                    <CardSubtitle>Price : {price} €/day </CardSubtitle>
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
                        View
                    </Button>
                    {state === "publishable"
                        ? <Button
                            className="btn-round"
                            color="success"
                            onClick={() => publish("published")
                            }
                            bssize="large"
                        >
                            Publish
                        </Button>

                        : state === "published" ?

                            <Button
                                className="btn-round"
                                onClick={() => publish("publishable")
                                }
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
