import {Alert, Button, Modal, ModalBody, UncontrolledTooltip} from "reactstrap";
import React, {useEffect} from "react";
import api from "../../utils/room";

function CreateReviewRoom({roomId,_id, onAddReview}) {
    const [modalReview, setModalReview] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [reviews, setReviews] = React.useState(false);
    const [review, setReview] = React.useState('');
    const [stars, setStars] = React.useState(1);
    const [authorName] = React.useState(localStorage.getItem("firstName"));



    const createReview = event => {
        setReviews({stars : Number(stars), review : review, author : authorName});
    };

    useEffect(()=>{
        console.log('test reviews',reviews);
        if(reviews){
            console.log('test reviews',reviews);
            console.log(_id);
            if (stars < 1 || stars > 5){
                setError("Attention la valeur que vous voulez envoyer n'est pas correcte.")
            }else{
                setError(false);
                api.createReview(reviews, roomId, _id)
                    .then(res => {
                        console.log(res.data);
                        setModalReview(false);
                        onAddReview();
                    }, function (data) {
                        console.log('je suis dans data erreur', data);
                    });
            }
        }
    },[reviews]);


    return (
        <>
            <Button
                className="btn-round"
                color="info"
                onClick={() => setModalReview( true)}
                bssize="large"
            >
                Let a review for this room
            </Button>

            <Modal isOpen={modalReview} toggle={() => setModalReview( false)}>
                <div className="modal-header justify-content-center">
                    <button
                        className="close"
                        type="button"
                        onClick={() => setModalReview( false)}
                    >
                        <i className="now-ui-icons ui-1_simple-remove"/>
                    </button>
                    <h4 className="title title-up">Let a review</h4>
                </div>
                {error ?
                    <Alert color="danger">
                        {error}
                    </Alert> : false
                }
                <ModalBody>
                    <div>
                        <p>Let a note between 1 and 5 : </p>
                        <input type={'number'} value={stars} onChange={e => setStars(e.target.value)} min="1" max="5"/> <i className="fas fa-star"/>


                        <p>Let a comment : </p>
                        <textarea value={review} onChange={e => setReview(e.target.value)}/>
                    </div>

                    <Button
                        className="btn-round"
                        color="success"
                        onClick={createReview}
                        bssize="large"
                    >
                        Validate my review
                    </Button>
                </ModalBody>

            </Modal>

        </>
    );
}
export default CreateReviewRoom;
