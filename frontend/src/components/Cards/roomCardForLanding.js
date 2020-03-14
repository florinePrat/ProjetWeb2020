import React from "react";
import {Button} from "react-bootstrap";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import {Card} from "react-bootstrap";
import CardText from "reactstrap/es/CardText";
import CardImg from "react-bootstrap/CardImg";
import AvailabilityModal from "../../components/Modals/modalChooseAvailability";
import auth from "../../utils/auth";

// this class send a answer to back for verify the answer and done the card of the day

function RoomCard({imageUrl, title, category, price, address, city, postalCode, _id, userId, description, reviews}) {

        const [isDeployed, setIsDeployed] = React.useState(false);
        const [isAuth] = React.useState(auth.isAuth());

        //console.log("reviews : ", reviews);
        let sum = 0;
        for (let i = 0; i < reviews.length; i++){
            sum += parseInt(reviews[i].stars,10);
        }
        var avgStars = sum/reviews.length;
        //console.log("moy : ",avgStars);


        return (
            isDeployed
                ?
                    <Card style={{width: '18rem'}}>
                        <CardImg top width="100%" src={imageUrl} alt="Photo de la salle" />
                        <CardBody>
                            {reviews.length

                                ?<div>
                                    <CardTitle>{title} : {avgStars.toFixed(1)}/5 <i className="fas fa-star"/></CardTitle>
                                    <CardText>{category}</CardText>
                                    <CardText> {price}€/jour</CardText>
                                    <CardText> Adresse : {address}</CardText>
                                    <p>Ville : {city} ({postalCode}) </p>
                                    Commentaires : <br/>
                                    {reviews.map(review =>(
                                        <div>
                                            {review.stars}/5 <i className="fas fa-star"/><br/> "{review.review}" <br/> <center>par : {review.author}</center> <br/>
                                        </div>
                                    ))}
                                </div>
                            : <div>
                                    <CardTitle>{title} </CardTitle>
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
                            {reviews.length
                                ?<div>
                                    <CardTitle>{title} : {avgStars.toFixed(1)}/5 <i className="fas fa-star"/></CardTitle>
                                    <CardText>{category}</CardText>
                                    <CardText> {price}€/jour</CardText>
                                    <CardText>{description}</CardText>
                                </div>
                            : <div>
                                    <CardTitle>{title}</CardTitle>
                                    <CardText>{category}</CardText>
                                    <CardText>{price}€/jour</CardText>
                                    <CardText>{description}</CardText>
                                </div>
                            }
                        </CardBody>
                        <CardBody>
                            <Button
                                className="btn-info"
                                onClick={() => { isAuth
                                    ? setIsDeployed(true)
                                    : window.location = "login-page"
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
