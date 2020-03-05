import React from "react";
import {Button} from "react-bootstrap";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import {Card} from "react-bootstrap";
import CardText from "reactstrap/es/CardText";
import CardImg from "react-bootstrap/CardImg";
import AvailabilityModal from "../../components/Modals/modalChooseAvailability";

// this class send a answer to back for verify the answer and done the card of the day

function RoomCard({imageUrl, title, category, price, address, city, postalCode, _id, userId, description}) {

        const [isDeployed, setIsDeployed] = React.useState(false);


        return (
            isDeployed
                ?
                            <Card style={{width: '18rem'}}>
                                <CardImg top width="100%" src={imageUrl} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>{title}</CardTitle>
                                    <CardText>{category}</CardText>
                                    <CardText> {price}€/jour</CardText>
                                    <CardText> Adresse : {address}</CardText>
                                    <p>Ville : {city} ({postalCode}) </p>

                                    <AvailabilityModal
                                        _id={_id}
                                        ownerId={userId}
                                    />


                                    <Button
                                        className="btn-info"
                                        onClick={() => {
                                            setIsDeployed(false);
                                        }}
                                        bssize="large"
                                    >
                                        Retour
                                    </Button>
                                </CardBody>
                            </Card>
                :
                        <Card style={{width: '18rem'}}>
                            <CardImg top width="100%" src={imageUrl} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>{title}</CardTitle>
                                <CardText>{category}</CardText>
                                <CardText>{price}€/jour</CardText>
                                <CardText>{description}</CardText>
                            </CardBody>
                            <CardBody>
                                <Button
                                    className="btn-info"
                                    onClick={() => {
                                        setIsDeployed(true);
                                    }}
                                    bssize="large"
                                >
                                    Voir
                                </Button>
                            </CardBody>
                        </Card>

        )
}

export default RoomCard;
