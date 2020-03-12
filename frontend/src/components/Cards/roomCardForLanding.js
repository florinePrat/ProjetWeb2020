import React from "react";
import {Button} from "react-bootstrap";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import {Card} from "react-bootstrap";
import CardText from "reactstrap/es/CardText";
import CardImg from "react-bootstrap/CardImg";
import AvailabilityModal from "../../components/Modals/modalChooseAvailability";

// this class send a answer to back for verify the answer and done the card of the day

function RoomCard({imageUrl, title, category, price, address, city, postalCode, _id, userId, description, reviews}) {

        const [isDeployed, setIsDeployed] = React.useState(false);

        if (isDeployed){
            console.log("reviews : ", reviews);
            let sum = 0;
            for (let i = 0; i < reviews.length; i++){
                sum += parseInt(reviews[i].stars,10);
            }
            var avgStars = sum/reviews.length;
            console.log("moy : ",avgStars);
        }


        return (
            isDeployed
                ?
                    <Card style={{width: '18rem'}}>
                        <CardImg top width="100%" src={imageUrl} alt="Photo de la salle" />
                        <CardBody>
                            {reviews.length
                                ? reviews.map(review =>(
                                    <div>
                                        <CardTitle>{title} {avgStars}/5 <i className="fas fa-star"/></CardTitle>
                                        <CardText>{category}</CardText>
                                        <CardText> {price}€/jour</CardText>
                                        <CardText> Adresse : {address}</CardText>
                                        <p>Ville : {city} ({postalCode}) </p>
                                        <p>Commentaires : </p><br/>
                                        {review.stars}/5 <i className="fas fa-star"/><br/> {review.review} <br/><br/>
                                    </div>
                                ))
                            : <div>
                                    <CardTitle>{title}</CardTitle>
                                    <CardText>{category}</CardText>
                                    <CardText> {price}€/jour</CardText>
                                    <CardText> Adresse : {address}</CardText>
                                    <p>Ville : {city} ({postalCode}) </p>
                                </div>
                            }


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
                        <CardImg top width="100%" src={imageUrl} alt="Photo de la salle" />
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
